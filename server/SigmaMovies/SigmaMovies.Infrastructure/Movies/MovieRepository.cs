using Mapster;
using Microsoft.EntityFrameworkCore;
using SigmaMovies.Application.Actors.Repositories;
using SigmaMovies.Application.Movies.Repositories;
using SigmaMovies.Application.Movies.Responses;
using SigmaMovies.Application.Pagination;
using SigmaMovies.Domain.Actors;
using SigmaMovies.Domain.Movies;
using SigmaMovies.Persistence.Context;

namespace SigmaMovies.Infrastructure.Movies
{
    public class MovieRepository : BaseRepository<Movie>, IMovieRepository
    {
        private IActorRepository _actorRepo;
        public MovieRepository(SigmaMoviesContext context, IActorRepository actorRepo) : base(context)
        {
            _actorRepo = actorRepo;
        }

        public async Task<PagedList<Movie>> GetAllMovies(CancellationToken cancellationToken, PaginationFilter paginationFilter, string? sortBy = null, string? genre = null, int? year = null, bool? isDeleted = null)
        {
            var filteredMovies = _dbSet.Include(x => x.Actors)
                .Where(x => string.IsNullOrEmpty(genre) || x.Metadata.Genre.Contains(genre))
           .Where(x => !year.HasValue || x.Metadata.Year == year.Value)
           .Where(x => !isDeleted.HasValue || isDeleted.Value == x.IsDeleted)
                .OrderByDescending(x => x.Id);

            if (string.IsNullOrEmpty(sortBy))
            {
                return await PagedList<Movie>.ToPagedListAsync(filteredMovies, paginationFilter.PageNumber, paginationFilter.PageSize);
            }
            var result = sortBy.ToLower() switch
            {
                "year" => filteredMovies.OrderByDescending(x => x.Metadata.Year),
                "imdb" => filteredMovies.OrderByDescending(x => x.Rating.IMDb),
                "rottentomatoes" => filteredMovies.OrderByDescending(x => x.Rating.RottenTomatoes),
                _ => default
            };
            if (result is null) return await PagedList<Movie>.ToPagedListAsync(filteredMovies, paginationFilter.PageNumber, paginationFilter.PageSize);
            return await PagedList<Movie>.ToPagedListAsync(result, paginationFilter.PageNumber, paginationFilter.PageSize);

        }

        public async Task<Movie> GetMovieById(int id, CancellationToken cancellationToken)
        {
            return await _dbSet.Where(x => x.Id == id).Include(x => x.Actors).SingleOrDefaultAsync(cancellationToken);
        }

        public async Task<int> Create(Movie movie, CancellationToken cancellationToken)
        {
            movie.CreatedAt = DateTime.Now;
            movie.ModifiedAt = DateTime.Now;
            movie.IsDeleted = false;


            await AddAsync(cancellationToken, movie);

            return movie.Id;
        }

        public async Task Update(Movie movie, CancellationToken cancellationToken)
        {
            var movieToUpdate = await GetMovieById(movie.Id, cancellationToken);
            _context.Entry(movieToUpdate).CurrentValues.SetValues(movie);
            var _actors = movieToUpdate.Actors;
            foreach (var actor in movie.Actors)
            {
                if (_actors.All(act => act.Id != actor.Id))
                {
                    movieToUpdate.Actors.Add(actor.Adapt<Actor>());
                }
                else
                {
                    var act = movieToUpdate.Actors.SingleOrDefault(x => x.Id == actor.Id);
                    _context.Entry(act).CurrentValues.SetValues(actor);
                }
            }
            for (int i = 0; i < _actors.Count; i++)
            {
                if (movie.Actors.FirstOrDefault(act => act.Id == _actors[i].Id) == null)
                {
                    movieToUpdate.Actors.Remove(_actors[i]);
                }
            }
        }


        public async Task Delete(int id, CancellationToken cancellationToken)
        {
            var movieToDelete = await GetMovieById(id, cancellationToken);
            movieToDelete.IsDeleted = true;
            await UpdateAsync(cancellationToken, movieToDelete);
        }

        public async Task<Movie> AddActorsToMovie(Movie movie, List<string> actorNames, CancellationToken cancellationToken)
        {
            var allActors = await _actorRepo.GetAllActors(cancellationToken);
            var actorsForMovie = allActors.Where(x => actorNames.Contains(x.Name)).ToList();
            movie.Actors = actorsForMovie;
            return movie;
        }

        public void Detach(Actor actor)
        {
            _context.Entry(actor).State = EntityState.Detached;
        }

        public async Task<bool> Exists(int id, CancellationToken cancellationToken)
        {
            return await AnyAsync(cancellationToken, x => x.Id == id);
        }
    }
}
