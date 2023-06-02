using SigmaMovies.Application.Pagination;
using SigmaMovies.Domain.Actors;
using SigmaMovies.Domain.Movies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SigmaMovies.Application.Movies.Repositories
{
    public interface IMovieRepository
    {
        Task<Movie> AddActorsToMovie(Movie movie, List<string> actorNames, CancellationToken cancellationToken);
        Task<int> Create(Movie movie, CancellationToken cancellationToken);
        Task Delete(int id, CancellationToken cancellationToken);
        void Detach(Actor actor);
        Task<bool> Exists(int id, CancellationToken cancellationToken);
        Task<PagedList<Movie>> GetAllMovies(CancellationToken cancellationToken, PaginationFilter paginationFilter, string? sortBy = null, string? genre = null, int? year = null, bool? isDeleted = null);
        Task<Movie> GetMovieById(int id, CancellationToken cancellationToken);
        Task Update(Movie movie, CancellationToken cancellationToken);
    }
}
