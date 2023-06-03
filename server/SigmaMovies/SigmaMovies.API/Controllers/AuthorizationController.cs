using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SigmaMovies.API.Infrastructure.Auth.JWT;
using SigmaMovies.Application.Users;
using SigmaMovies.Application.Users.Requests;

namespace SigmaMovies.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizationController : ControllerBase
    {
        private readonly IUserService _userService;

        private readonly IOptions<JWTConfiguration> _options;

        public AuthorizationController(IUserService userService,IOptions<JWTConfiguration> options)
        {
            _userService = userService;
            _options = options;
        }

        [Route("Register")]
        [HttpPost]
        public async Task<ActionResult<string>>
        Register(CancellationToken cancellation, UserRequestModel user)
        {
            var newUser = new UserRequestModel();
            newUser.Username = user.Username;
            newUser.Password = user.Password;
            _ = await _userService.CreateAsync(cancellation, user);
            return await LogIn(cancellation, newUser);
        }

        [Route("LogIn")]
        [HttpPost]
        public async Task<ActionResult<string>>
        LogIn(CancellationToken cancellation, UserRequestModel request)
        {
            var user =
                await _userService
                    .GetUserByUsername(cancellation, request.Username);
            var username =
                await _userService
                    .AuthenticateAsync(cancellation,
                    request.Username,
                    request.Password);
            var role = user.UserRole;

            try
            {
                var token =
                    JWTHelper
                        .GenerateSecurityToken(username,
                        user.Id,
                        role,
                        _options);
                return Ok(token.ToString());
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error generating JWT: " + ex.Message);

                // Handle the exception and return an appropriate response
                return BadRequest("Failed to generate JWT.");
            }
        }
    }
}
