using Microsoft.AspNetCore.JsonPatch;
using SigmaMovies.Application.Movies.Requests;
using SigmaMovies.Application.Movies.Responses;
using SigmaMovies.Application.Pagination;
using SigmaMovies.Domain.Movies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace SigmaMovies.Application.Movies
{
    public interface IMovieService
    {
        Task<Movie> AddActorToMovie(Movie Movie, List<string> actorNames, CancellationToken cancellationToken);
        Task<int> CreateMovie(MovieRequestModel movie, CancellationToken cancellationToken);
        Task DeleteMovie(int id, CancellationToken cancellationToken);
        Task<(List<MovieResponseModel> Movies, int TotalPages)> GetAllMovies(CancellationToken cancellationToken, PaginationFilter paginationFilter, string? sortBy = null, string? genre = null, int? year = null, bool? isDeleted = null);
        Task<MovieResponseModel> GetMovieById(CancellationToken cancellationToken, int Id);
        Task UpdateMovieAsync(CancellationToken cancellationToken, MovieRequestPutModel movie);
        Task UpdatePatchMovie(int id, JsonPatchDocument<Movie> movie, CancellationToken cancellationToken);
    }
}
