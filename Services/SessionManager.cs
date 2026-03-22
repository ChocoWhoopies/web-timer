using System.Collections.Concurrent;
using System.Text.RegularExpressions;

namespace WebTimer.Services;

public class SessionManager
{
    public const int MaxRooms = 15;
    public const int MaxSessionIdLength = 64;
    private static readonly Regex SessionIdRegex = new("^[a-zA-Z0-9_-]{1,64}$", RegexOptions.Compiled);

    // A thread-safe dictionary to hold multiple sessions by ID
    public ConcurrentDictionary<string, TimerSession> Sessions { get; } = new();
    private readonly object _sessionCreationLock = new();

    public bool TryGetOrCreateSession(string sessionId, out TimerSession? session)
    {
        if (!IsValidSessionId(sessionId))
        {
            session = null;
            return false;
        }

        if (Sessions.TryGetValue(sessionId, out var existingSession))
        {
            session = existingSession;
            return true;
        }

        lock (_sessionCreationLock)
        {
            if (Sessions.TryGetValue(sessionId, out existingSession))
            {
                session = existingSession;
                return true;
            }

            if (Sessions.Count >= MaxRooms)
            {
                session = null;
                return false;
            }

            session = Sessions.GetOrAdd(sessionId, _ => new TimerSession { Id = sessionId });
            return true;
        }
    }

    public bool TryGetSession(string sessionId, out TimerSession? session)
    {
        if (!IsValidSessionId(sessionId))
        {
            session = null;
            return false;
        }

        return Sessions.TryGetValue(sessionId, out session);
    }

    public bool RemoveSession(string sessionId)
    {
        if (!IsValidSessionId(sessionId))
        {
            return false;
        }

        return Sessions.TryRemove(sessionId, out _);
    }

    public int RemoveAllSessions()
    {
        var count = Sessions.Count;
        Sessions.Clear();
        return count;
    }

    public static bool IsValidSessionId(string? sessionId)
    {
        if (string.IsNullOrWhiteSpace(sessionId))
            return false;

        return SessionIdRegex.IsMatch(sessionId);
    }
}