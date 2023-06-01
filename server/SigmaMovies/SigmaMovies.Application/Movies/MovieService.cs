using Mapster;
using Microsoft.AspNetCore.JsonPatch;
using SigmaMovies.Application.Exceptions;
using SigmaMovies.Application.Movies.Repositories;
using SigmaMovies.Application.Movies.Requests;
using SigmaMovies.Application.Movies.Responses;
using SigmaMovies.Application.Pagination;
using SigmaMovies.Domain.Actors;
using SigmaMovies.Domain.Movies;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Channels;

namespace SigmaMovies.Application.Movies
{
    public class MovieService : IMovieService
    {
        private readonly IMovieRepository _repository;
        private readonly IUnitOfWork _unitOfWork;

        public MovieService(IMovieRepository repository, IUnitOfWork unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }

        public async Task<int> CreateMovie(MovieRequestModel movie, CancellationToken cancellationToken)
        {
            List<string> actors = new List<string>(movie.Actors);
            movie.Actors.Clear();
            var movieToCreate = movie.Adapt<Movie>();
            movieToCreate = await AddActorToMovie(movieToCreate, actors, cancellationToken);
            int id = await _unitOfWork.Movie.Create(movieToCreate, cancellationToken);
            await _unitOfWork.Save(cancellationToken);
            return id;
        }
        public async Task<Movie> AddActorToMovie(Movie movie, List<string> actorNames, CancellationToken cancellationToken)
        {
            return await _unitOfWork.Movie.AddActorsToMovie(movie, actorNames, cancellationToken);
        }

        public async Task<(List<MovieResponseModel> Movies, int TotalPages)> GetAllMovies(CancellationToken cancellationToken, PaginationFilter paginationFilter, string? sortBy = null, string? genre = null, int? year = null, bool? isDeleted = null)
        {
            var movies = await _repository.GetAllMovies(cancellationToken, paginationFilter);
            var totalPages = movies.TotalPages;

            var filteredMovies = movies
                .Where(x => string.IsNullOrEmpty(genre) || x.Metadata.Genre == genre)
                .Where(x => !year.HasValue || x.Metadata.Year == year.Value)
                .Where(x => !isDeleted.HasValue || isDeleted.Value == x.IsDeleted)
                .ToList();

            if (string.IsNullOrEmpty(sortBy))
            {
                return (filteredMovies.Adapt<List<MovieResponseModel>>(), totalPages);
            }
            var result = sortBy.ToLower() switch
            {

                "year" => filteredMovies.OrderByDescending(x => x.Metadata.Year),
                "imdbrating" => filteredMovies.OrderByDescending(x => x.Rating.IMDb),
                "rtrating" => filteredMovies.OrderByDescending(x => x.Rating.RottenTomatoes),
                _ => default  
            };
            if(result is null) return (filteredMovies.Adapt<List<MovieResponseModel>>(), totalPages);
            return (result.Adapt<List<MovieResponseModel>>(), totalPages);
        }



        public async Task<MovieResponseModel> GetMovieById(CancellationToken cancellationToken, int id)
        {
            var movie = await _unitOfWork.Movie.GetMovieById(id, cancellationToken) ?? throw new MovieNotFoundException("Movie not found");
            return (movie).Adapt<MovieResponseModel>();
        }

        public async Task UpdateMovieAsync(CancellationToken cancellationToken, MovieRequestPutModel movie)
        {
            #region First way 
            //var movieToUpdate = await _unitOfWork.Movie.GetMovieById(movie.Id, cancellationToken) ?? throw new Exception("Not Found");
            ////movie.Adapt(movieToUpdate);

            //movieToUpdate.Title = movie.Title;
            //movieToUpdate.Color = movie.Color;
            //movieToUpdate.Color2 = movie.Color2;
            //movieToUpdate.Img = movie.Img;
            //movieToUpdate.Video = movie.Video;
            //movieToUpdate.Description = movie.Description;
            //movieToUpdate.Rating = movie.Rating;
            //var test = await _unitOfWork.Movie.GetMovieById(movie.Id, cancellationToken) ?? throw new Exception("Not Found");
            //movieToUpdate.ModifiedAt = DateTime.Now;

            //movieToUpdate.Actors.Clear(); // remove all existing actors
            //foreach (var actor in movie.Actors)
            //{
            //    var existingActor = await _unitOfWork.Actor.GetActorById(actor.Id, cancellationToken);
            //    if (existingActor != null)
            //    {
            //        existingActor.Name = actor.Name;
            //        existingActor.Img = actor.Img;
            //        test = await _unitOfWork.Movie.GetMovieById(movie.Id, cancellationToken) ?? throw new Exception("Not Found");

            //        movieToUpdate.Actors.Add(existingActor);
            //        test = await _unitOfWork.Movie.GetMovieById(movie.Id, cancellationToken) ?? throw new Exception("Not Found");
            //    }
            //}
            //await _unitOfWork.Save(cancellationToken);
            #endregion

            #region Second way
            //var movieToUpdate = await _repository.GetMovieById(movie.Id, cancellationToken) ?? throw new MovieNotFoundException("Movie not Found");
            //movie.Adapt(movieToUpdate);

            //movieToUpdate.ModifiedAt = DateTime.Now;

            //await _unitOfWork.Movie.Update(movieToUpdate, cancellationToken);
            //await _unitOfWork.Save(cancellationToken);
            #endregion

            #region Third way
            var movieToUpdate = await _unitOfWork.Movie.GetMovieById(movie.Id, cancellationToken) ?? throw new MovieNotFoundException("Movie not Found");

            movieToUpdate.Title = movie.Title;
            movieToUpdate.Color = movie.Color;
            movieToUpdate.Color2 = movie.Color2;
            movieToUpdate.Img = movie.Img;
            movieToUpdate.Video = movie.Video;
            movieToUpdate.Description = movie.Description;
            movieToUpdate.Rating = movie.Rating;
            movieToUpdate.Metadata = movie.Metadata;

            movieToUpdate.ModifiedAt = DateTime.Now;
            foreach (var actor in movie.Actors)
            {
                var existingActor = movieToUpdate.Actors.FirstOrDefault(x => x.Id == actor.Id);
                if (existingActor is null)
                {
                    movieToUpdate.Actors.Add(actor.Adapt<Actor>());
                }
                else
                {
                    actor.Adapt(existingActor);
                }
            }
            for (int i = 0; i < movieToUpdate.Actors.Count; i++)
            {
                if (movie.Actors.Any(x => x.Id != movieToUpdate.Actors[i].Id))
                {
                    movieToUpdate.Actors.Remove(movieToUpdate.Actors[i]);
                }
            }
            await _unitOfWork.Movie.Update(movieToUpdate, cancellationToken);
            await _unitOfWork.Save(cancellationToken);
            #endregion
        }

        public async Task UpdatePatchMovie(int id, JsonPatchDocument<Movie> movie, CancellationToken cancellationToken)
        {
            var movieToUpdate = await _unitOfWork.Movie.GetMovieById(id, cancellationToken) ?? throw new MovieNotFoundException("Movie not Found");
            movie.ApplyTo(movieToUpdate);
            await _unitOfWork.Save(cancellationToken);

        }

        public async Task DeleteMovie(int id, CancellationToken cancellationToken)
        {
            var movieToDelete = await _unitOfWork.Movie.GetMovieById(id, cancellationToken) ?? throw new MovieNotFoundException("Movie not Found");
            await _unitOfWork.Movie.Delete(movieToDelete.Id, cancellationToken);
            await _unitOfWork.Save(cancellationToken);
        }

    }
}
