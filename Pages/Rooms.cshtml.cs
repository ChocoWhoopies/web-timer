using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using WebTimer.Services;

namespace WebTimer.Pages;

[IgnoreAntiforgeryToken]
public class RoomsModel : PageModel
{
    private readonly SessionManager _sessionManager;

    public RoomsModel(SessionManager sessionManager)
    {
        _sessionManager = sessionManager;
    }

    public void OnGet()
    {
    }

    public JsonResult OnGetStats()
    {
        var rooms = _sessionManager.Sessions.Values
            .Select(session => new
            {
                id = session.Id,
                connections = Math.Max(session.UserCount, 0),
                isRunning = session.IsRunning,
                isPaused = session.IsPaused,
                timeLeftInSeconds = session.TimeLeftInSeconds
            })
            .OrderBy(room => room.id)
            .ToList();

        return new JsonResult(new
        {
            totalRooms = rooms.Count,
            maxRooms = SessionManager.MaxRooms,
            rooms
        });
    }

    public JsonResult OnPostDeleteRoom([FromBody] DeleteRoomRequest? request)
    {
        if (request is null || string.IsNullOrWhiteSpace(request.RoomId))
        {
            return new JsonResult(new { success = false, message = "RoomId is required." });
        }

        if (!SessionManager.IsValidSessionId(request.RoomId))
        {
            return new JsonResult(new { success = false, message = "Invalid RoomId format." });
        }

        var removed = _sessionManager.RemoveSession(request.RoomId);
        return new JsonResult(new
        {
            success = removed,
            totalRooms = _sessionManager.Sessions.Count
        });
    }

    public JsonResult OnPostDeleteAll()
    {
        var removedCount = _sessionManager.RemoveAllSessions();
        return new JsonResult(new
        {
            success = true,
            removedCount,
            totalRooms = 0
        });
    }

    public class DeleteRoomRequest
    {
        public string RoomId { get; set; } = string.Empty;
    }
}
