var builder = WebApplication.CreateBuilder(args);

// Lägg till HttpClient till DI-container
builder.Services.AddHttpClient();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
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

app.UseCors("AllowFrontend"); // Använd CORS-policyn här

app.UseHttpsRedirection();
app.MapControllers();

app.Run();
