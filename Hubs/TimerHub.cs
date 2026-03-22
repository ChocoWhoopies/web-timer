using Microsoft.AspNetCore.SignalR;
using WebTimer.Services;

namespace WebTimer.Hubs
{
    public class TimerHub : Hub
    {
        private readonly SessionManager _sessionManager;
        private const int MaxUsers = 10;

        public TimerHub(SessionManager sessionManager) => _sessionManager = sessionManager;

        public async Task JoinSession(string sessionId)
        {
            if (!_sessionManager.TryGetOrCreateSession(sessionId, out var session) || session is null)
            {
                throw new HubException($"Maximum room limit reached ({SessionManager.MaxRooms}).");
            }

            if (session.UserCount >= MaxUsers)
                throw new HubException("This session is full.");

            session.UserCount++;
            await Groups.AddToGroupAsync(Context.ConnectionId, sessionId);
            
            // Store the session ID in the connection metadata so we know what to decrement on disconnect
            Context.Items["SessionId"] = sessionId;
            
            await Clients.Caller.SendAsync("Message", $"Joined session: {sessionId}");
            // Send the current time to the new user immediately
            await Clients.Caller.SendAsync("ReceiveTime", session.TimeLeftInSeconds);
            await BroadcastRoomUserCount(sessionId, session.UserCount);
        }

        public async Task StartTimer(string sessionId, int minutes, int seconds)
        {
            if (!_sessionManager.TryGetSession(sessionId, out var session) || session is null)
                throw new HubException("Session not found.");

            session.TimeLeftInSeconds = (minutes * 60) + seconds;
            session.IsRunning = true;
            session.IsPaused = false;
        }

        public void TogglePause(string sessionId)
        {
            if (!_sessionManager.TryGetSession(sessionId, out var session) || session is null)
                throw new HubException("Session not found.");

            session.IsPaused = !session.IsPaused;
        }

        public async Task ResetTimer(string sessionId)
        {
            if (!_sessionManager.TryGetSession(sessionId, out var session) || session is null)
                throw new HubException("Session not found.");

            session.IsRunning = false;
            session.IsPaused = false;
            session.TimeLeftInSeconds = 0;
            await Clients.Group(sessionId).SendAsync("ReceiveTime", 0);
            await Clients.Group(sessionId).SendAsync("Message", "Timer Reset");
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            if (Context.Items.TryGetValue("SessionId", out var sessionIdObj) && sessionIdObj is string sessionId)
            {
                if (_sessionManager.Sessions.TryGetValue(sessionId, out var session))
                {
                    session.UserCount = Math.Max(0, session.UserCount - 1);
                    await BroadcastRoomUserCount(sessionId, session.UserCount);
                }
            }
            await base.OnDisconnectedAsync(exception);
        }

        private Task BroadcastRoomUserCount(string sessionId, int userCount)
        {
            return Clients.Group(sessionId).SendAsync("RoomUserCount", Math.Max(0, userCount));
        }
    }
}