using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace _.Controllers
{
[ApiController]
[Route("api/[controller]")]
public class ActivityController : ControllerBase
{
    private readonly WeatherService _weatherService;

    public ActivityController(WeatherService weatherService)
    {
        _weatherService = weatherService;
    }

    private static readonly List<string> SunnyActivities = new()
    {
        "🥾 Promenad i skogen",
        "☕ Kaffepaus på en uteservering",
        "🧺 Picknick vid vattnet",
        "🏋️‍♂️ Utegym eller träning i solen",
        "⛳ Spela minigolf",
        "🚣 Hyra trampbåt",
        "🔥 Grillkväll i trädgården",
        "🍦 Promenad med glass"
    };

    private static readonly List<string> RainyActivities = new()
    {
        "🎬 Inomhusbio",
        "🎲 Brädspelskväll",
        "🧁 Fika på mysigt kafé",
        "🎱 Spela biljard",
        "🖼️ Besöka museum eller galleri",
        "💆‍♀️ Gå på spa",
        "👩‍🍳 Baka något tillsammans",
        "🗝️ Escape room"
    };

    private static readonly List<string> SnowyActivities = new()
    {
        "⛄ Bygga snögubbe",
        "🔥 Grilla marshmallows ute",
        "🛷 Pulkarace i närmaste backe",
        "⛸️ Skridskoåkning",
        "🃏 Spela sällskapsspel inne",
        "🎥 Vinterfilmkväll",
        "🍫 Dricka varm choklad på kafé",
        "🧖‍♀️ Bastu och isvak"
    };

    [HttpGet("suggested-activities")]
    public async Task<IActionResult> GetSuggestedActivities([FromQuery] string city)
    {
        var weatherData = await _weatherService.GetWeatherDataAsync(city);

        var activities = weatherData.Category switch
        {
            "soligt ☀️" => SunnyActivities,
            "molnigt ☁️" => SunnyActivities, 
            "regnigt ☔" => RainyActivities,
            "snöigt ❄️" => SnowyActivities,
            _ => new List<string> { "Planera något spontant!", "Ring en vän och hitta på något kul!" }
        };

        return Ok(new
        {
            weather = weatherData.Category,
            temperature = weatherData.Temperature,
            activities
        });
    }
}

}
