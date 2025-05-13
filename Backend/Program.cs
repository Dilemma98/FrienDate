var builder = WebApplication.CreateBuilder(args);

// Lägg till HttpClient till DI-container
builder.Services.AddHttpClient();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5175", "http://152.42.135.43:5231/api/google/login") // Din frontend-URL
                  .AllowAnyHeader() // Tillåter alla headers, inklusive Authorization
                  .AllowAnyMethod() // Tillåter alla HTTP-metoder (POST, GET, etc.)
                  .AllowCredentials() // Tillåter cookies och credentials
                  .SetPreflightMaxAge(TimeSpan.FromMinutes(10)); // Tillåt cachning av preflight-svar
        });
});

builder.Services.AddControllers();

var app = builder.Build();

// Skicka COOP-headers före CORS
app.Use(async (context, next) =>
{
    context.Response.Headers["Cross-Origin-Opener-Policy"] = "same-origin";
    context.Response.Headers["Cross-Origin-Embedder-Policy"] = "require-corp";
    await next.Invoke();
});

// Använd CORS-policy
app.UseCors("AllowFrontend");

app.UseHttpsRedirection();
app.MapControllers();

app.Run();
