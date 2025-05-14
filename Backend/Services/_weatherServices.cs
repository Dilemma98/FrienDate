using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

public class WeatherService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;

    public WeatherService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _apiKey = configuration["WeatherApi:ApiKey"];
    }

    public async Task<string> GetWeatherCategoryAsync(string city)
    {
        var url = $"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={_apiKey}&units=metric";

        var response = await _httpClient.GetAsync(url);
        if (!response.IsSuccessStatusCode)
            return "unknown";

        var json = await response.Content.ReadAsStringAsync();
        var doc = JsonDocument.Parse(json);

        var weatherMain = doc.RootElement
            .GetProperty("weather")[0]
            .GetProperty("main")
            .GetString()
            ?.ToLower();

        return weatherMain switch
        {
            "clear" => "soligt ☀️",
            "clouds" => "soligt ☀️",
            "rain" => "regnigt ☔",
            "drizzle" => "regnigt ☔",
            "thunderstorm" => "regnigt ☔",
            "snow" => "snöigt ❄️",
            _ => "unknown"
        };
    }
}
