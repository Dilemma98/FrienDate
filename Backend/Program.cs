using System;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

// Manually load environment variables from .env file before building the app
static void LoadEnvFile(string path = ".env")
{
    if (!File.Exists(path)) return;

    foreach (var line in File.ReadAllLines(path))
    {
        if (string.IsNullOrWhiteSpace(line) || line.StartsWith("#")) continue;

        var parts = line.Split('=', 2, StringSplitOptions.RemoveEmptyEntries);
        if (parts.Length == 2)
        {
            Environment.SetEnvironmentVariable(parts[0].Trim(), parts[1].Trim());
        }
    }
}

LoadEnvFile(); // Load .env before creating the builder

var builder = WebApplication.CreateBuilder(args);

// Register HttpClient for dependency injection
builder.Services.AddHttpClient();

// Register WeatherService with injected HttpClient
builder.Services.AddHttpClient<WeatherService>();

// Add CORS policy to allow frontend access
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5175", "http://152.42.135.43:5231/api/google/login") // Replace with your frontend URLs
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials()
                  .SetPreflightMaxAge(TimeSpan.FromMinutes(10));
        });
});

// Add environment variables to configuration
builder.Configuration.AddEnvironmentVariables();

// Add controllers
builder.Services.AddControllers();

var app = builder.Build();

// Set COOP/COEP headers before applying CORS (for cross-origin isolation, if needed)
app.Use(async (context, next) =>
{
    context.Response.Headers["Cross-Origin-Opener-Policy"] = "same-origin";
    context.Response.Headers["Cross-Origin-Embedder-Policy"] = "require-corp";
    await next.Invoke();
});

// Use the defined CORS policy
app.UseCors("AllowFrontend");

app.UseHttpsRedirection();
app.MapControllers();

app.Run();
