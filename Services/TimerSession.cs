public class TimerSession
{
    public string Id { get; set; } = string.Empty;
    public int TimeLeftInSeconds { get; set; }
    public bool IsRunning { get; set; }
    public bool IsPaused { get; set; }
    public int UserCount { get; set; }
}