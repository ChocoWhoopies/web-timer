namespace WebTimer.Services;

public class RoomDashboardOptions
{
    public const string SectionName = "RoomDashboard";

    public bool Enabled { get; set; }

    public string? AccessToken { get; set; }

    public bool IsConfigured => Enabled && !string.IsNullOrWhiteSpace(AccessToken);
}