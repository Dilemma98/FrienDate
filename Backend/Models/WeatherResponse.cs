namespace FrienDateBackend.Models
{
    public class WeatherResponse
    {
        public List<WeatherInfo> Weather { get; set; }

        public class WeatherInfo
        {
            public string Main { get; set; }
        }
    }
}
