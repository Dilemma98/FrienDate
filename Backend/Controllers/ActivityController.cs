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
        "🍦 Promenad med glass",
        "🧘‍♀️ Morgonyoga i parken",
"🚴‍♀️ Cykeltur i naturen",
"🏖️ Häng på stranden eller klippor",
"🎾 Spela tennis eller padel utomhus",
"📸 Fotopromenad i stan eller naturen",
"🧃 Ta med bok och lemonad till en park",
"🪁 Flyga drake",
"🪴 Plantera växter tillsammans",
"🌇 Se solnedgången från ett fint ställe",
"🛍️ Besöka en lokal utomhusmarknad"
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
        "🗝️ Escape room",
        "🍿 Film-maraton med favoritsnacks",
        "📚 Besöka biblioteket och läsa tillsammans",
        "🎨 Prova på en målar- eller pysselkväll",
        "🎮 Spelkväll med TV-spel eller retrospel",
        "☕ Göra kaffeprovning hemma",
        "🧘 Prova guidad meditation eller stretchpass inne",
        "👨‍🍳 Testa ett nytt recept ihop",
        "💬 Ha en djuppratskväll med tända ljus",
        "🎤 Karaoke hemma",
        "📖 Lyssna på ljudbok ihop och prata om den"
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
        "🧖‍♀️ Bastu och isvak",
        "🍿 Film-maraton med favoritsnacks",
        "🎿 Gå längdskidor eller åka snowboard",
        "🏰 Bygga snölyktor eller ett snöfort",
        "📸 Ta vinterporträtt ute",
        "🥶 Varm sopplunch efter snölek",
        "🎄 Gå på julmarknad (om säsong)",
        "🧤 Göra DIY-vantar eller julpyssel",
        "🏒 Spela bandy eller ishockey",
        "🕯️ Skapa en riktig 'hygge'-kväll med filtar, ljus och samtal"    };

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
