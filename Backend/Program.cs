var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5175")  // Din frontend URL här
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
