using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using WebTimer.Services;

namespace WebTimer.Pages;

[IgnoreAntiforgeryToken]
public class IndexModel : PageModel
{
    public string? SessionId { get; set; }
    private readonly ILogger<IndexModel> _logger;

    public IndexModel(ILogger<IndexModel> logger)
    {
        _logger = logger;
    }

    public void OnGet(string? id)
    {
        SessionId = SessionManager.IsValidSessionId(id) ? id : null;
    }
}
