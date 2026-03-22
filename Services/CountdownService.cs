using Microsoft.AspNetCore.SignalR;
using WebTimer.Hubs;

namespace WebTimer.Services
{
    public class CountdownService : BackgroundService
    {
        private readonly IHubContext<TimerHub> _hubContext;
        private int _timeLeftInSeconds = 0;
        private bool _isRunning = false;
        private bool _isPaused = false; // New state
        private readonly object _lock = new object();
        private int _connectedClients = 0;
        private const int MaxUsers = 10;

        private readonly SessionManager _sessionManager;

        public CountdownService(IHubContext<TimerHub> hubContext, SessionManager sessionManager)
        {
            _hubContext = hubContext;
            _sessionManager = sessionManager;
        }

        public void StartTimer(int minutes, int seconds)
        {
            _timeLeftInSeconds = (minutes * 60) + seconds;
            _isRunning = true;
            _isPaused = false;
        }

        public void TogglePause()
        {
            if (_isRunning) _isPaused = !_isPaused;
        }

        public void ResetTimer()
        {
            _isRunning = false;
            _isPaused = false;
            _timeLeftInSeconds = 0;
        }

        // UPDATED: Returns true if user can join, false if full
        public bool TryAddUser()
        {
            lock (_lock)
            {
                if (_connectedClients >= MaxUsers)
                {
                    return false; // Room is full
                }
                
                _connectedClients++;
                return true;
            }
        }

        // UPDATED: Decrement safely
        public void UserDisconnected()
        {
            lock (_lock)
            {
                if (_connectedClients > 0)
                {
                    _connectedClients--;
                }
            }
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                foreach (var session in _sessionManager.Sessions.Values)
                {
                    if (stoppingToken.IsCancellationRequested)
                    {
                        break;
                    }

                    // Only tick if running, not paused, and has users
                    if (session.IsRunning && !session.IsPaused && session.UserCount > 0)
                    {
                        if (session.TimeLeftInSeconds > 0)
                        {
                            session.TimeLeftInSeconds--;
                            // Broadcast ONLY to the specific group
                            await _hubContext.Clients.Group(session.Id).SendAsync("ReceiveTime", session.TimeLeftInSeconds, stoppingToken);
                        }
                        else
                        {
                            session.IsRunning = false;
                            await _hubContext.Clients.Group(session.Id).SendAsync("TimerFinished", cancellationToken: stoppingToken);
                        }
                    }
                    
                    // If a room is empty, you could remove it here to save memory
                    if (session.UserCount <= 0) 
                    {
                        _sessionManager.Sessions.TryRemove(session.Id, out _);
                    }
                }
                await Task.Delay(1000, stoppingToken);
            }
        }
    }
}