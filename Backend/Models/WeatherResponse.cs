namespace FrienDateBackend.Models
{
    // This class represents the response from the weather API
    public class WeatherResponse
    {
        // List of weather conditions returned by the API (required during deserialization)
        public required List<WeatherInfo> Weather { get; set; }
    }

    // Nested class representing individual weather information
    public class WeatherInfo
    {
        // Main weather condition (e.g., "Clear", "Rain", "Snow")
        public required string Main { get; set; }
    }
}
