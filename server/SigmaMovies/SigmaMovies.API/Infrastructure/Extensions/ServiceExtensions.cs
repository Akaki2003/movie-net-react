using SigmaMovies.Application;
using SigmaMovies.Application.Actors;
using SigmaMovies.Application.Actors.Repositories;
using SigmaMovies.Application.Movies;
using SigmaMovies.Application.Movies.Repositories;
using SigmaMovies.Application.Users;
using SigmaMovies.Application.Users.Repositories;
using SigmaMovies.Infrastructure.Actors;
using SigmaMovies.Infrastructure.Movies;
using SigmaMovies.Infrastructure.UOW;
using SigmaMovies.Infrastructure.Users;
using SigmaMovies.Persistence;

namespace SigmaMovies.API.Infrastructure.Extensions
{
    public static class ServiceExtensions
    {
        public static void AddServices(this IServiceCollection services)
        {
            services.AddTransient<IHttpContextAccessor, HttpContextAccessor>();

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IMovieService, MovieService>();
            services.AddScoped<IActorService, ActorService>();
            services.AddScoped<ConnectionStrings>();

            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IMovieRepository, MovieRepository>();
            services.AddScoped<IActorRepository, ActorRepository>();

        }
    }
}
