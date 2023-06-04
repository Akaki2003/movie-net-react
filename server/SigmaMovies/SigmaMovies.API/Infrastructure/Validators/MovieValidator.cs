using FluentValidation;
using SigmaMovies.Application.Actors.Requests;
using SigmaMovies.Application.Movies.Requests;

namespace SigmaMovies.API.Infrastructure.Validators
{
    public class MovieValidator : AbstractValidator<MovieRequestModel>
    {
        public MovieValidator()
        {
            RuleFor(x => x.Title)
                    .NotEmpty().WithMessage("Movie's title must not be empty")
                    .MaximumLength(300).WithMessage("title's length exceeded the limit");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Movie's Description must not be empty")
                .MaximumLength(1000).WithMessage("Title's length exceeded the limit");

            RuleFor(x => x.Color)
                .NotEmpty().MaximumLength(8);
            RuleFor(x => x.Color2)
                .NotEmpty().MaximumLength(8);
            RuleFor(x => x.Video)
                .NotEmpty();
            RuleFor(x => x.Img)
                .NotEmpty().MaximumLength(500);
            RuleFor(x => x.Rating.IMDb).InclusiveBetween(1, 10);
            RuleFor(x => x.Rating.RottenTomatoes).InclusiveBetween(0, 100);
        }
    }
    public class MoviePutValidator : AbstractValidator<MovieRequestPutModel>
    {
        public MoviePutValidator()
        {
            RuleFor(x => x.Title)
                    .NotEmpty().WithMessage("Movie's title must not be empty")
                    .MaximumLength(300).WithMessage("title's length exceeded the limit");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Movie's Description must not be empty")
                .MaximumLength(1000).WithMessage("Title's length exceeded the limit");

            RuleFor(x => x.Color)
                .NotEmpty().MaximumLength(8);
            RuleFor(x => x.Color2)
                .NotEmpty().MaximumLength(8);
            RuleFor(x => x.Video)
                .NotEmpty();
            RuleFor(x => x.Img)
                .NotEmpty().MaximumLength(500);
            RuleFor(x => x.Rating.IMDb).InclusiveBetween(1, 10);
            RuleFor(x => x.Rating.RottenTomatoes).InclusiveBetween(0, 100);
        }
    }
}
