using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace _.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoogleController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public GoogleController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] GoogleUserInfo user)
        {
            if (string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.Token))
            {
                return BadRequest("Email eller Token saknas");
            }

            try
            {
                // Validera access-token med Google API
                var validatedUser = await ValidateGoogleAccessToken(user.Token);
                if (validatedUser == null)
                {
                    return Unauthorized("Ogiltig Google access-token");
                }
    

                // Här returnerar vi hela användarobjektet till frontend
                return Ok(new
                {
                    Message = "Inloggning lyckades",
                    user = new
                    {
                        validatedUser.Name,
                        validatedUser.Email,
                        validatedUser.Picture,
                        validatedUser.GivenName,
                        validatedUser.FamilyName,
                    }
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Fel vid tokenvalidering: {ex.Message}");
                return StatusCode(500, "Serverfel vid validering av token");
            }
        }

        [HttpGet("fetchCalendar")]
        public async Task<IActionResult> FetchCalendar()
        {
            var authHeader = Request.Headers["Authorization"].ToString();

            if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            {
                return BadRequest("Access-token saknas eller är felaktigt formaterad");
            }

            var accessToken = authHeader.Replace("Bearer ", "");

            try
            {
                var timeMin = "2023-01-01T00:00:00Z";
                var url = $"https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin={timeMin}&singleEvents=true&orderBy=startTime";

                var request = new HttpRequestMessage(HttpMethod.Get, url);
                request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);

                var response = await _httpClient.SendAsync(request);

                if (!response.IsSuccessStatusCode)
                {
                    Console.WriteLine($"Fel vid hämtning av kalender: {response.StatusCode}");
                    return StatusCode((int)response.StatusCode, "Fel vid hämtning av kalender");
                }

                var responseContent = await response.Content.ReadAsStringAsync();
                return Ok(responseContent); // JSON-sträng
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Fel vid hämtning av kalender: {ex.Message}");
                return StatusCode(500, "Serverfel vid hämtning av kalender");
            }
        }

        [HttpGet("fetchUserInfo")]
        public async Task<IActionResult> FetchUserInfo()
        {
            var authHeader = Request.Headers["Authorization"].ToString();

            if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            {
                return BadRequest("Access-token saknas eller är felaktigt formaterad");
            }

            var accessToken = authHeader.Replace("Bearer ", "");

            try
            {
                var url = "https://www.googleapis.com/oauth2/v3/userinfo";
                var request = new HttpRequestMessage(HttpMethod.Get, url);
                request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);

                var response = await _httpClient.SendAsync(request);

                if (!response.IsSuccessStatusCode)
                {
                    Console.WriteLine($"Fel vid hämtning av användarinformation: {response.StatusCode}");
                    return StatusCode((int)response.StatusCode, "Fel vid hämtning av användarinformation");
                }

                var responseContent = await response.Content.ReadAsStringAsync();

                // Deserialisera JSON-svaret till GoogleUserInfo-objektet
                var userInfo = JsonConvert.DeserializeObject<GoogleUserInfo>(responseContent);

                if (userInfo == null)
                {
                    return StatusCode(500, "Kunde inte deserialisera användardata");
                }

                // Returnera användardata som objekt
                Console.WriteLine("----------------------------");
                Console.WriteLine($"Google UserInfo: {JsonConvert.SerializeObject(userInfo)}");
                Console.WriteLine("----------------------------");
                return Ok(userInfo); // Returnera som GoogleUserInfo-objekt
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Fel vid hämtning av användarinformation: {ex.Message}");
                return StatusCode(500, "Serverfel vid hämtning av användarinformation");
            }
        }

        // Funktion för att validera Google access-token
        private async Task<GoogleUserInfo> ValidateGoogleAccessToken(string accessToken)
        {
            try
            {
                var url = "https://www.googleapis.com/oauth2/v3/userinfo";
                var request = new HttpRequestMessage(HttpMethod.Get, url);
                request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);

                var response = await _httpClient.SendAsync(request);

                if (!response.IsSuccessStatusCode)
                {
                    Console.WriteLine($"Fel vid validering av access-token: {response.StatusCode}");
                    return null;
                }

                var responseContent = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"Respons från Google API: {responseContent}");

                return JsonConvert.DeserializeObject<GoogleUserInfo>(responseContent);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Fel vid validering av access-token: {ex.Message}");
                return null;
            }
        }
    }
    public class GoogleUserInfo
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("picture")]
        public string Picture { get; set; }

        [JsonProperty("given_name")]
        public string GivenName { get; set; }

        [JsonProperty("family_name")]
        public string FamilyName { get; set; }

        public string Token { get; set; } // Från frontend

    }

    // Klass för att deserialisera svaret från Google's tokeninfo-API
    public class GoogleTokenInfo
    {
        public string Sub { get; set; } // Google user ID
        public string Name { get; set; }
        public string Email { get; set; }
        public string Picture { get; set; }
    }
}
