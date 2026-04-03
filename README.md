# WebTimer

WebTimer is a small shared countdown app built with ASP.NET Core Razor Pages and SignalR. Open a room URL, share it with other people, and everyone in that room sees the same timer state in real time.

It is designed for quick group use cases such as study sessions, workouts, meetings, game rounds, or any situation where multiple people need to see and control the same countdown.

## What it does

- Creates a shared timer room from the URL path, for example `/focus-room`
- Syncs start, pause/resume, and reset actions to everyone in the same room with SignalR
- Supports a browser-local personal alarm threshold so each user can be notified before the timer ends
- Lets each user upload a personal alarm sound stored only in their own browser
- Includes a lightweight admin dashboard for seeing active rooms and deleting rooms when needed

## How rooms work

- Visiting `/` shows a short intro page
- Visiting `/{roomId}` opens or joins a shared timer room
- Everyone on the same room URL shares the same timer state
- Room IDs may only contain letters, numbers, `_`, and `-`
- Maximum room ID length is `64` characters
- The app allows up to `15` active rooms at once
- Each room allows up to `10` connected users at once

## Tech stack

- ASP.NET Core 9 Razor Pages
- SignalR for real-time updates
- In-memory session storage
- Docker-ready multi-stage build

## Local development

### Requirements

- .NET SDK 9.0

### Run locally

```bash
dotnet restore
dotnet run
```

By default the launch profiles use these local URLs:

- `http://localhost:5206`
- `https://localhost:7005`

For the admin dashboard, use the HTTPS URL. The admin auth cookie is configured as `Secure`, so it will not work correctly over plain HTTP.

## Configuration

The app can run with no extra configuration if you only want the shared timer pages.

The admin dashboard is optional and is controlled by environment variables.

### Environment variables

| Variable                     | Required       | Description                                                     |
| ---------------------------- | -------------- | --------------------------------------------------------------- |
| `RoomDashboard__Enabled`     | Only for admin | Set to `true` to enable the admin dashboard                     |
| `RoomDashboard__AccessToken` | Only for admin | Long random secret used to access `/admin`                      |
| `ASPNETCORE_ENVIRONMENT`     | No             | Usually `Development` locally and `Production` in deployment    |
| `ASPNETCORE_URLS`            | Optional       | Bind Kestrel to a specific address, for example `http://+:8080` |

### Example appsettings section

You can also configure the admin dashboard through configuration providers that map to the `RoomDashboard` section:

```json
{
  "RoomDashboard": {
    "Enabled": true,
    "AccessToken": "replace-with-a-long-random-secret"
  }
}
```

For production, prefer environment variables or a secrets manager instead of committing secrets.

## Admin dashboard

The admin dashboard lives at `/admin`.

It is intentionally simple:

- Lists active rooms
- Shows connection count per room
- Shows whether a timer is running or paused
- Shows remaining time in seconds
- Lets you delete one room or all rooms

### How admin authentication works

There is no username/password form.

Access works like this:

1. Set `RoomDashboard__Enabled=true`
2. Set `RoomDashboard__AccessToken` to a long random secret
3. Open `/admin?accessToken=YOUR_SECRET`
4. The app signs you in with a secure cookie and redirects you to `/admin`

Example:

```text
https://your-domain.example/admin?accessToken=replace-with-your-secret
```

Important notes:

- If the dashboard is not configured, `/admin` returns `404`
- If the token is missing or wrong, `/admin` returns `404`
- After successful access, the browser receives an auth cookie valid for up to `8` hours
- The auth cookie is `HttpOnly`, `SameSite=Strict`, and `Secure`
- Because the cookie is `Secure`, admin access should be used over HTTPS only

## Docker

The repository already includes a multi-stage Dockerfile.

### Build the image

```bash
docker build -t webtimer .
```

### Run without admin dashboard

```bash
docker run --rm -p 8080:8080 \
  -e ASPNETCORE_URLS=http://+:8080 \
  webtimer
```

Then open:

```text
http://localhost:8080
```

### Run with admin dashboard enabled

```bash
docker run --rm -p 8080:8080 \
  -e ASPNETCORE_URLS=http://+:8080 \
  -e RoomDashboard__Enabled=true \
  -e RoomDashboard__AccessToken=replace-with-a-long-random-secret \
  webtimer
```

### Docker Compose

You can also deploy WebTimer using `docker-compose`. This is the recommended way for production-like environments.

Create a `docker-compose.yml` file:

```yaml
services:
  webtimer:
    image: ghcr.io/chocowhoopies/web-timer:main
    container_name: webtimer
    ports:
      - "8080:8080"
    environment:
      - ASPNETCORE_URLS=http://+:8080
      - RoomDashboard__Enabled=true
      - RoomDashboard__AccessToken=your-secure-access-token
    restart: unless-stopped
```

Replace `ghcr.io/athened/web-timer:main` with the appropriate image tag if needed.

To start the service:

```bash
docker-compose up -d
```

### HTTPS note for Docker deployments

The admin cookie is secure-only. That means the shared timer pages will work over HTTP, but the admin dashboard authentication should be exposed through HTTPS.

For a real deployment, put the container behind a reverse proxy or platform that terminates TLS, then access the admin page through the HTTPS public URL.

Example admin URL after deployment:

```text
https://your-domain.example/admin?accessToken=replace-with-a-long-random-secret
```

## Deployment notes

- Timer state is stored in memory, not a database
- Restarting the app clears all rooms and timers
- Deleting a room from the admin dashboard removes that in-memory session immediately
- This app is best suited to lightweight, temporary shared timer use rather than durable scheduled jobs

## Repository structure

- `Pages/Index.cshtml`: main shared timer UI
- `Pages/Rooms.cshtml`: admin dashboard page at `/admin`
- `Hubs/TimerHub.cs`: SignalR hub for joining rooms and controlling timers
- `Services/SessionManager.cs`: in-memory room/session store and room limits
- `Services/CountdownService.cs`: background countdown processing
- `Program.cs`: app startup, auth, Razor Pages, and SignalR wiring

## Quick start

1. Start the app
2. Open `/my-room`
3. Share that same URL with other people
4. Control the timer from any browser in the room
5. If needed, enable the admin dashboard with `RoomDashboard__Enabled` and `RoomDashboard__AccessToken`
