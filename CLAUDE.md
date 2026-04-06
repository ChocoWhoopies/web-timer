# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Restore dependencies
dotnet restore

# Run locally (http://localhost:5206, https://localhost:7005)
dotnet run

# Build
dotnet build

# Docker
docker build -t webtimer .
docker run --rm -p 8080:8080 -e ASPNETCORE_URLS=http://+:8080 webtimer
```

There are no automated tests in this project.

## Architecture

**Stack:** ASP.NET Core 9 Razor Pages + SignalR. All timer state is in-memory (no database).

### Request flow

1. User visits `/{roomId}` → `Pages/Index.cshtml` renders the timer UI
2. Browser JS connects to the SignalR hub at `/timerHub` and calls `JoinSession(roomId)`
3. `TimerHub.cs` validates the room ID, creates or retrieves the session via `SessionManager`, and adds the connection to a SignalR group named after the room ID
4. Timer control actions (`StartTimer`, `TogglePause`, `ResetTimer`, `AdjustTime`) mutate the `TimerSession` object directly — no broadcast happens here
5. `CountdownService` (a `BackgroundService`) ticks every 1 second, decrements all running sessions, and broadcasts `ReceiveTime` to each room's SignalR group
6. On disconnect, `TimerHub.OnDisconnectedAsync` decrements `UserCount`; `CountdownService` removes rooms where `UserCount <= 0`

### Key types

| File | Role |
|---|---|
| `Services/TimerSession.cs` | Plain data object: `Id`, `TimeLeftInSeconds`, `IsRunning`, `IsPaused`, `UserCount` |
| `Services/SessionManager.cs` | Thread-safe `ConcurrentDictionary<string, TimerSession>` store; enforces max 15 rooms and valid room ID format (`^[a-zA-Z0-9_-]{1,64}$`) |
| `Services/CountdownService.cs` | `BackgroundService` that ticks all sessions and pushes updates via `IHubContext<TimerHub>` |
| `Services/RoomDashboardOptions.cs` | Config model bound from `RoomDashboard__*` env vars; exposes `IsConfigured` computed property |
| `Hubs/TimerHub.cs` | SignalR hub; handles join/leave/control; enforces max 10 users per room; broadcasts `RoomUserCount` on membership changes |
| `Pages/Index.cshtml` | Full timer UI including all SignalR client JS (~975 lines inline; `wwwroot/js/site.js` is intentionally empty) |
| `Pages/Rooms.cshtml` | Admin dashboard at `/admin` |

### Admin dashboard

- Disabled by default; enabled via `RoomDashboard__Enabled=true` + `RoomDashboard__AccessToken=<secret>`
- Auth is token-in-URL → secure `HttpOnly` cookie (`__Host-WebTimer.RoomDashboard`, 8-hour, `Secure` + `SameSite=Strict`); returns 404 on missing/wrong token
- Cookie is `Secure`-only — use HTTPS for admin access
- CSRF protection: 32-byte random token generated on auth, sent in `X-Room-Dashboard-Csrf` header for POST requests
- `OnGetStats` handler returns JSON of all active rooms (polled every 1 second by the dashboard UI)

### SignalR events (server → client)

| Event | Payload |
|---|---|
| `ReceiveTime` | `int` seconds remaining |
| `TimerFinished` | *(no payload)* |
| `RoomUserCount` | `int` user count |
| `Message` | `string` status message |

### Client-side features (Index.cshtml)

All JavaScript is inline in `Index.cshtml`; `wwwroot/js/site.js` is empty.

- **Personal alarm:** Per-room threshold stored in `localStorage`; triggers audio + browser Notification API when the timer crosses below the threshold. Alarm re-arms if time increases past the threshold again. Only fires when the timer has previously been above zero (prevents spurious triggers on join).
- **Custom alarm audio:** Users can upload any audio file; stored in `IndexedDB` keyed by room ID. Default sound: `/audio/notification-tone_short.mp3`. Audio is primed with a muted play on first `pointerdown`/`keydown` to bypass browser autoplay restrictions.
- **Timer preset rows:** Dynamic UI — users can add/remove rows each containing minutes/seconds inputs and a start button. At least one row is always visible.
- **SignalR connection indicator:** Colored dot (green/orange/red) reflecting connected/reconnecting/disconnected state; uses `withAutomaticReconnect()`.
- **Room share button:** Copies the room URL to clipboard (`navigator.clipboard` with `execCommand` fallback).

### Architecture notes

- **Single-instance only.** All session state lives in `SessionManager`'s `ConcurrentDictionary`. Horizontal scaling requires replacing this with a distributed store and switching SignalR to a backplane (e.g., Redis).
- **No persistence.** A process restart clears all rooms and timers.
