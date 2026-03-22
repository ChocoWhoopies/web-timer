using System.Security.Claims;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Options;
using WebTimer.Services;

namespace WebTimer.Pages;

public class RoomsModel : PageModel
{
    public const string AuthenticationScheme = "RoomDashboard";
    public const string AccessClaimType = "webtimer:room-dashboard";
    public const string AccessClaimValue = "granted";
    public const string CsrfClaimType = "webtimer:room-dashboard:csrf";
    public const string CsrfHeaderName = "X-Room-Dashboard-Csrf";

    private readonly SessionManager _sessionManager;
    private readonly RoomDashboardOptions _dashboardOptions;

    public RoomsModel(SessionManager sessionManager, IOptions<RoomDashboardOptions> dashboardOptions)
    {
        _sessionManager = sessionManager;
        _dashboardOptions = dashboardOptions.Value;
    }

    public string DashboardCsrfToken => User.FindFirst(CsrfClaimType)?.Value ?? string.Empty;

    public async Task<IActionResult> OnGetAsync(string? accessToken)
    {
        if (!_dashboardOptions.IsConfigured)
        {
            return NotFound();
        }

        if (HasDashboardAccess())
        {
            return Page();
        }

        if (!string.IsNullOrWhiteSpace(accessToken) &&
            string.Equals(accessToken, _dashboardOptions.AccessToken, StringComparison.Ordinal))
        {
            await SignInAsync();
            return RedirectToPage();
        }

        return NotFound();
    }

    public IActionResult OnGetStats()
    {
        if (!HasDashboardAccess())
        {
            return NotFound();
        }

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

    public IActionResult OnPostDeleteRoom([FromBody] DeleteRoomRequest? request)
    {
        if (!HasDashboardAccess(requireCsrfHeader: true))
        {
            return NotFound();
        }

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

    public IActionResult OnPostDeleteAll()
    {
        if (!HasDashboardAccess(requireCsrfHeader: true))
        {
            return NotFound();
        }

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

    private bool HasDashboardAccess(bool requireCsrfHeader = false)
    {
        if (!_dashboardOptions.IsConfigured)
        {
            return false;
        }

        if (User.Identity?.IsAuthenticated != true ||
            !User.HasClaim(AccessClaimType, AccessClaimValue))
        {
            return false;
        }

        if (!requireCsrfHeader)
        {
            return true;
        }

        var expectedToken = User.FindFirst(CsrfClaimType)?.Value;
        var providedToken = Request.Headers[CsrfHeaderName].ToString();

        return !string.IsNullOrWhiteSpace(expectedToken) &&
               string.Equals(expectedToken, providedToken, StringComparison.Ordinal);
    }

    private async Task SignInAsync()
    {
        var claims = new[]
        {
            new Claim(AccessClaimType, AccessClaimValue),
            new Claim(CsrfClaimType, Convert.ToBase64String(RandomNumberGenerator.GetBytes(32)))
        };

        var identity = new ClaimsIdentity(claims, AuthenticationScheme);
        var principal = new ClaimsPrincipal(identity);

        await HttpContext.SignInAsync(AuthenticationScheme, principal);
    }
}
