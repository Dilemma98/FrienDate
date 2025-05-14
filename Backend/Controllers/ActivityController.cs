using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace _.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivityController : ControllerBase
    {
        private readonly WeatherService _weatherService;

        // Injecting WeatherService via constructor
        public ActivityController(WeatherService weatherService)
        {
            _weatherService = weatherService;
        }

        // List of activity suggestions for sunny weather
        private static readonly List<string> SunnyActivities = new()
        {
            "Vandring i parken",
            "Kaffepaus på uteservering",
            "Picknick vid vattnet",
            "Utegym eller träning i solen",
            "Spela minigolf",
            "Hyra trampbåt",
            "Grillkväll i trädgården",
            "Promenad med glass"
        };

        // List of activity suggestions for rainy weather
        private static readonly List<string> RainyActivities = new()
        {
            "Inomhusbio",
            "Brädspelskväll",
            "Fika på mysigt kafé",
            "Spela biljard",
            "Besöka museum eller galleri",
            "Gå på spa",
            "Baka något tillsammans",
            "Escape room"
        };

        // List of activity suggestions for snowy weather
        private static readonly List<string> SnowyActivities = new()
        {
            "Bygga snögubbe",
            "Grilla marshmallows ute",
            "Pulkarace i närmaste backe",
            "Skridskoåkning",
            "Spela sällskapsspel inne",
            "Vinterfilmkväll",
            "Dricka varm choklad på kafé",
            "Bastu och isvak"
        };

        // Endpoint that suggests activities based on weather in a given city
        [HttpGet("suggested-activities")]
        public async Task<IActionResult> GetSuggestedActivities([FromQuery] string city)
        {
            // Get simplified weather category from the weather service
            var weather = await _weatherService.GetWeatherCategoryAsync(city);

            // Get simplified weather category from the weather service
            List<string> activities = weather switch
            {
                "soligt ☀️" => SunnyActivities,
                "regnigt ☔" => RainyActivities,
                "snöigt ❄️" => SnowyActivities,
                _ => new List<string>
            {
                "Planera något spontant!",
                "Ring en vän och hitta på något kul!"
            }
            };
            // Return the selected activities and weather type
            return Ok(new { weather, activities });
        }
    }
}