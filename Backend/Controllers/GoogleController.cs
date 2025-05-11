using Google.Apis.Auth.OAuth2.Requests;
using Microsoft.AspNetCore.Mvc;
using Google.Apis.Auth;
using System.Threading.Tasks;

namespace _.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoogleController : ControllerBase
    {
        // HttpPost Login  
        private readonly string _client = "655768995238-5m1d0d3arskq73qms4pl96ff6dlde0l9.apps.googleusercontent.com";


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] TokenRequest request)
        {
          var token = request.Token;
          try
          {
              var payload = await GoogleJsonWebSignature.ValidateAsync(token);
              
               var userId = payload.Subject;
                var email = payload.Email;

              return Ok(payload);
          }
          catch (InvalidJwtException ex)
          {
              return BadRequest(ex.Message);
          }
        } 
    }

    public class TokenRequest
    {
        public string Token { get; set; }
    }
}
