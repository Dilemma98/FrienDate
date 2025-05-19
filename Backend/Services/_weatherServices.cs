using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

public class WeatherData
{
    public string Category { get; set; } = "unknown";
    public double Temperature { get; set; }
}

public class WeatherService
{
    private readonly HttpClient _httpClient;
    private readonly string? _apiKey;

    public WeatherService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _apiKey = Environment.GetEnvironmentVariable("OPENWEATHER_API_KEY");
    }

    public async Task<WeatherData> GetWeatherDataAsync(string city)
    {
        var weatherData = new WeatherData();

        if (string.IsNullOrEmpty(_apiKey))
        {
            return weatherData;
        }

        var url = $"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={_apiKey}&units=metric";

        var response = await _httpClient.GetAsync(url);
        if (!response.IsSuccessStatusCode)
            return weatherData;

        var json = await response.Content.ReadAsStringAsync();

        try
        {
            using var doc = JsonDocument.Parse(json);

            // Hämta temperaturen
            if (doc.RootElement.TryGetProperty("main", out var mainElement) &&
                mainElement.TryGetProperty("temp", out var tempElement))
            {
                weatherData.Temperature = tempElement.GetDouble();
            }

            // Hämta väderkategori
            if (doc.RootElement.TryGetProperty("weather", out var weatherArray) &&
                weatherArray.GetArrayLength() > 0 &&
                weatherArray[0].TryGetProperty("main", out var weatherMainElement))
            {
                var weatherMain = weatherMainElement.GetString()?.ToLower();

                weatherData.Category = weatherMain switch
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

        return weatherData;
    }
}
