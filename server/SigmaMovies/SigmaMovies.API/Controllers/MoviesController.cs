
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SigmaMovies.Application.Movies;
using SigmaMovies.Application.Movies.Requests;
using SigmaMovies.Application.Movies.Responses;
using SigmaMovies.Domain.Movies;
using SigmaMovies.API.ModelExamples;
using Swashbuckle.AspNetCore.Filters;
using SigmaMovies.Application.Pagination;
using SigmaMovies.Application.HelperModels;
using Microsoft.AspNetCore.JsonPatch;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace SigmaMovies.API.Controllers
{
    [Route("v1/[controller]")]
    [ApiController]
    public class MoviesController : Controller
    {
        private readonly IMovieService movieService;

        public MoviesController(IMovieService movieService)
        {
            this.movieService = movieService;
        }

        /// <summary>
        /// Retrieves a list of all movies and total number of pages.
        /// </summary>
        /// <param name="cancellationToken">The cancellation token.</param>
        /// <param name="paginationFilter">The movie's pagination filter.</param>
        /// <param name="sortBy">The movie's sorting algorithm.</param>
        /// <param name="genre">The movie's genre.</param>
        /// <param name="year">The movie's year.</param>
        /// <param name="isDeleted">The movie's delete status.</param>
        /// <response code="200">Returns an empty response.</response>
        [Route("GetAllMovies")]
        [HttpGet]
        public async Task<ActionResult/*<List<MovieResponseModel>>*/> GetAllMovies(CancellationToken cancellationToken, [FromQuery] PaginationFilter paginationFilter, [FromQuery] SortBy? sortBy = null, string? genre = null, int? year = null, bool? isDeleted = null)
        {
            var response = new
            {
                (await movieService.GetAllMovies(cancellationToken, paginationFilter, sortBy.HasValue ? sortBy.Value.ToString() : null, genre, year, isDeleted)).Movies,
                (await movieService.GetAllMovies(cancellationToken, paginationFilter, sortBy.HasValue ? sortBy.Value.ToString() : null, genre, year, isDeleted)).TotalPages
            };
            return Ok(response);
        }

        //COPYOFTRUE

        /// <summary>
        /// Retrieves movie by Id.
        /// </summary>
        /// <param name="cancellationToken">The cancellation token.</param>
        /// <param name="Id">The movie id.</param>
        /// <response code="200">Returns an empty response.</response>
        [Route("GetMovieById")]
        [HttpGet]
        public async Task<IActionResult> GetMovieById(CancellationToken cancellationToken,int Id)
        {
            return Ok(await movieService.GetMovieById(cancellationToken, Id));
        }

        /// <summary>
        /// Adds a new movie to database.
        /// </summary>
        /// <param name="cancellationToken">The cancellation token.</param>
        /// <param name="movieRequest">The movie request model.</param>
        /// <response code="200">Returns an empty response.</response>
        [SwaggerRequestExample(typeof(MovieRequestModel), typeof(MovieRequestModelExamples))]
        [HttpPost("AddMovie")]
        [Produces("application/json")]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> AddMovie(CancellationToken cancellationToken, [FromBody] MovieRequestModel movieRequest)
        {
            await movieService.CreateMovie(movieRequest, cancellationToken);
            return Ok();
        }


        /// <summary>
        /// Updates a movie.
        /// </summary>
        /// <param name="cancellationToken">The cancellation token.</param>
        /// <param name="request">The movie request model.</param>
        /// <response code="200">Returns an empty response.</response>
        [HttpPut("UpdateMovie")]
        [SwaggerRequestExample(typeof(MovieRequestPutModel), examplesProviderType: typeof(MovieRequestPutModelExample))]
        [Produces("application/json")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateMovie(CancellationToken cancellationToken,[FromBody] MovieRequestPutModel request)
        {
            await movieService.UpdateMovieAsync(cancellationToken, request);
            return Ok();
        }



        /// <summary>
        /// Patches a movie.
        /// </summary>
        /// <param name="cancellationToken">The cancellation token.</param>
        /// <param name="request">The movie request model.</param>
        /// <param name="id">The movie id.</param>
        /// <response code="200">Returns an empty response.</response>
        [HttpPatch("UpdatePatchMovie/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdatePatchMovie([FromBody] JsonPatchDocument<Movie> request, int id, CancellationToken cancellationToken)
        {
            await movieService.UpdatePatchMovie(id, request,cancellationToken);
            return Ok();
        }



        /// <summary>
        /// Deletes a movie.
        /// </summary>
        /// <param name="cancellationToken">The cancellation token.</param>
        /// <param name="id">The movie id.</param>
        /// <response code="200">Returns an empty response.</response>
        [HttpDelete("DeleteMovie/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteMovie(int id, CancellationToken cancellationToken)
        {
            await movieService.DeleteMovie(id, cancellationToken);
            return Ok();
        }

    }
}
