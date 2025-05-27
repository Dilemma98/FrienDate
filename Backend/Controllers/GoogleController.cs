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

        // POST: api/google/login
        // Handles login by validating the Google access token and returning basic user information
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] GoogleUserInfo user)
        {
            if (string.IsNullOrWhiteSpace(user?.Email) || string.IsNullOrWhiteSpace(user?.Token))
            {
                return BadRequest("Email or Token is missing");
            }

            try
            {
                // Validate access token with Google API
                var validatedUser = await ValidateGoogleAccessToken(user.Token);
                if (validatedUser == null)
                {
                    return Unauthorized("Invalid Google access token");
                }

                // Return validated user object to frontend
                return Ok(new
                {
                    Message = "Login successful",
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
                Console.WriteLine($"Error during token validation: {ex.Message}");
                return StatusCode(500, "Server error during token validation");
            }
        }

        // GET: api/google/fetchCalendar
        // Fetches the user's primary Google Calendar events
        [HttpGet("fetchCalendar")]
        public async Task<IActionResult> FetchCalendar()
        {
            var authHeader = Request.Headers["Authorization"].ToString();

            if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            {
                return BadRequest("Access token is missing or incorrectly formatted");
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
                    Console.WriteLine($"Error fetching calendar: {response.StatusCode}");
                    return StatusCode((int)response.StatusCode, "Failed to fetch calendar");
                }

                var responseContent = await response.Content.ReadAsStringAsync();
                return Ok(responseContent); // Raw JSON string
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching calendar: {ex.Message}");
                return StatusCode(500, "Server error while fetching calendar");
            }
        }

        [HttpPost("addEvent")]
        public async Task<IActionResult> AddEvent([FromBody] GoogleEvent eventData)
        {
            if (eventData == null || string.IsNullOrEmpty(eventData.summary)
                || eventData.start == null || string.IsNullOrEmpty(eventData.start.dateTime)
                || eventData.end == null || string.IsNullOrEmpty(eventData.end.dateTime))
            {
                return BadRequest("Ogiltig event-data");
            }
            // Extract the access token from the Authorization header
            var authHeader = Request.Headers["Authorization"].ToString();
            // Check if the Authorization header is present and formatted correctly
            if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            {
                return BadRequest("Access token is missing or incorrectly formatted");
            }

            // Remove "Bearer " prefix to get the access token
            // and validate it
            var accessToken = authHeader.Replace("Bearer ", "");

            var userInfo = await ValidateGoogleAccessToken(accessToken);
            if (userInfo == null)
            {
                return Unauthorized("Invalid or expired token");
            }

            try
            {
                // Google Calendar API endpoint to add an event
                var url = "https://www.googleapis.com/calendar/v3/calendars/primary/events";
                // Create the HTTP request to add an event
                var request = new HttpRequestMessage(HttpMethod.Post, url);
                // Add access token to the request header
                request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);

                var json = JsonConvert.SerializeObject(eventData);
                request.Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                // Send the request to the Google Calendar API
                var response = await _httpClient.SendAsync(request);
                // Check if the response indicates success
                if (!response.IsSuccessStatusCode)
                {
                    Console.WriteLine($"Error adding event: {response.StatusCode}");
                    return StatusCode((int)response.StatusCode, "Failed to add event");
                }
                //Return success message if the event was added successfully
                return Ok("Event added successfully");
            }
            catch (Exception ex)
            {
                // Log the exception and return a server error status
                Console.WriteLine($"Error adding event: {ex.Message}");
                return StatusCode(500, "Server error while adding event");
            }
        }

        // Helper method for validating a Google access token using the Google People API
        private async Task<GoogleUserInfo?> ValidateGoogleAccessToken(string accessToken)
        {
            try
            {
                var url = "https://www.googleapis.com/oauth2/v3/userinfo";
                var request = new HttpRequestMessage(HttpMethod.Get, url);
                request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);

                var response = await _httpClient.SendAsync(request);

                if (!response.IsSuccessStatusCode)
                {
                    Console.WriteLine($"Access token validation failed: {response.StatusCode}");
                    return null;
                }

                var responseContent = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"Google API response: {responseContent}");

                return JsonConvert.DeserializeObject<GoogleUserInfo>(responseContent);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception during access token validation: {ex.Message}");
                return null;
            }
        }
    }

    // Data model representing the Google user information returned by the API
    public class GoogleUserInfo
    {
        [JsonProperty("name")]
        public string? Name { get; set; }

        [JsonProperty("email")]
        public string? Email { get; set; }

        [JsonProperty("picture")]
        public string? Picture { get; set; }

        [JsonProperty("given_name")]
        public string? GivenName { get; set; }

        [JsonProperty("family_name")]
        public string? FamilyName { get; set; }

        // Token sent from the frontend to be validated
        public string? Token { get; set; }
    }

    // Model to deserialize optional token info if used elsewhere
    public class GoogleTokenInfo
    {
        public string? Sub { get; set; } // Google user ID
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Picture { get; set; }
    }

    public class EventDateTime
    {
        public string? dateTime { get; set; }
    }

    public class GoogleEvent
    {
        public string? summary { get; set; }
        public EventDateTime? start { get; set; }
        public EventDateTime? end { get; set; }
    }
}