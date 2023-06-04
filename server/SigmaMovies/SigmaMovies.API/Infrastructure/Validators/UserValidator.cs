using FluentValidation;
using SigmaMovies.Application.Users.Requests;

namespace SigmaMovies.API.Infrastructure.Validators
{
    public class UserValidator : AbstractValidator<UserRequestModel>
    {
        public UserValidator()
        {
            RuleFor(x => x.Username).NotEmpty().EmailAddress();
            RuleFor(x=>x.Password).NotEmpty().Matches(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$");
        }
    }
}
