using Microsoft.AspNetCore.Authentication.Cookies;
using WebTimer.Hubs;
using WebTimer.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.Configure<RoomDashboardOptions>(builder.Configuration.GetSection(RoomDashboardOptions.SectionName));
builder.Services.AddAuthentication("RoomDashboard")
    .AddCookie("RoomDashboard", options =>
    {
        options.Cookie.Name = "__Host-WebTimer.RoomDashboard";
        options.Cookie.HttpOnly = true;
        options.Cookie.SameSite = SameSiteMode.Strict;
        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        options.SlidingExpiration = false;
        options.ExpireTimeSpan = TimeSpan.FromHours(8);
        options.Events = new CookieAuthenticationEvents
        {
            OnRedirectToLogin = context =>
            {
                context.Response.StatusCode = StatusCodes.Status404NotFound;
                return Task.CompletedTask;
            },
            OnRedirectToAccessDenied = context =>
            {
                context.Response.StatusCode = StatusCodes.Status404NotFound;
                return Task.CompletedTask;
            }
        };
    });

// 1. Add SignalR
builder.Services.AddSignalR();

// 2. Register our Background Timer Service as a Singleton
builder.Services.AddSingleton<SessionManager>();
builder.Services.AddSingleton<CountdownService>();
builder.Services.AddHostedService<CountdownService>(provider => provider.GetRequiredService<CountdownService>());

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapStaticAssets();
app.MapRazorPages()
   .WithStaticAssets();

// 3. Map the Hub to a URL endpoint
app.MapHub<TimerHub>("/timerHub");

app.Run();
