using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

public class WeatherService
{
    private readonly HttpClient _httpClient;
    private readonly string? _apiKey;

    // Constructor injects HttpClient and retrieves the weather API key from configuration
    public WeatherService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _apiKey = configuration["WeatherApi:ApiKey"];
    }

    // This method fetches the weather category (e.g., sunny, rainy, snowy) for a given city
    public async Task<string> GetWeatherCategoryAsync(string city)
    {
        if (string.IsNullOrEmpty(_apiKey))
        {
            return "unknown";
        }

        var url = $"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={_apiKey}&units=metric";

        var response = await _httpClient.GetAsync(url);
        if (!response.IsSuccessStatusCode)
            return "unknown";

        var json = await response.Content.ReadAsStringAsync();

        try
        {
            var doc = JsonDocument.Parse(json);

            // Try to extract the "main" weather condition, safely
            if (doc.RootElement.TryGetProperty("weather", out var weatherArray) &&
                weatherArray.GetArrayLength() > 0 &&
                weatherArray[0].TryGetProperty("main", out var mainElement))
            {
                var weatherMain = mainElement.GetString()?.ToLower();

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
        catch (JsonException ex)
        {
            Console.WriteLine($"JSON parsing error: {ex.Message}");
        }

        return "unknown";
    }
}
