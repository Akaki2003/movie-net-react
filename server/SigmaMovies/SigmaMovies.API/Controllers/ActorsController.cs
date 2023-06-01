using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using SigmaMovies.API.ModelExamples;
using SigmaMovies.Application.Actors;
using SigmaMovies.Application.Actors.Requests;
using SigmaMovies.Application.Actors.Responses;
using SigmaMovies.Domain.Actors;
using Swashbuckle.AspNetCore.Filters;

namespace SigmaMovies.API.Controllers
{
    [Route("v1/[controller]")]
    [ApiController]
    public class ActorsController : Controller
    {
        private readonly IActorService actorService;

        public ActorsController(IActorService actorService)
        {
            this.actorService = actorService;
        }




        /// <summary>
        /// Retrieves all actors.
        /// </summary>
        /// <param name="cancellationToken">The cancellation token.</param>
        /// <response code="200">Returns an empty response.</response>
        [Route("GetAllActors")]
        [HttpGet]
        public async Task<ActionResult<List<ActorResponseModel>>> GetAllActors(CancellationToken cancellationToken)
        {
            return Ok(await actorService.GetAllActors(cancellationToken));
        }

        /// <summary>
        /// Retrieves actor by id.
        /// </summary>
        /// <param name="cancellationToken">The cancellation token.</param>
        /// <param name="id">The actor id.</param>
        /// <response code="200">Returns an empty response.</response>
        [Route("GetActorById")]
        [HttpGet]
        public async Task<IActionResult> GetActorById(CancellationToken cancellationToken, int id)
        {
            return Ok(await actorService.GetActorById(id, cancellationToken));
        }


        /// <summary>
        /// Retrieves actor with nested movie by id.
        /// </summary>
        /// <param name="cancellationToken">The cancellation token.</param>
        /// <param name="id">The actor id.</param>
        /// <response code="200">Returns an empty response.</response>
        [Route("GetActorByIdFull")]
        [HttpGet]
        public async Task<IActionResult> GetActorByIdFull(CancellationToken cancellationToken, int id)
        {
            return Ok(await actorService.GetActorByIdFull(id, cancellationToken));
        }


        /// <summary>
        /// Adds a new actor to the database.
        /// </summary>
        /// <param name="cancellationToken">The cancellation token.</param>
        /// <param name="request">Actor's request model.</param>
        /// <response code="200">Returns an empty response.</response>
        [SwaggerRequestExample(typeof(ActorRequestModel), examplesProviderType: typeof(ActorRequestModelExample))]
        [HttpPost("AddActor")]
        [Produces("application/json")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddActor(CancellationToken cancellationToken, [FromBody] ActorRequestModel? request)
        {
            await actorService.AddActor(request, cancellationToken);
            return Ok();
        }

        /// <summary>
        /// Updates an actor.
        /// </summary>
        /// <param name="cancellationToken">The cancellation token.</param>
        /// <param name="request">Actor's request model.</param>
        /// <response code="200">Returns an empty response.</response>
        [SwaggerRequestExample(typeof(ActorRequestPutModelNoNested), examplesProviderType: typeof(ActorRequestPutModelNoNestedExamples))]
        [HttpPut("UpdateActor")]
        [Produces("application/json")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> UpdateActor(CancellationToken cancellationToken, [FromBody] ActorRequestPutModelNoNested request)
        {
            await actorService.UpdateActorAsync(cancellationToken, request);
            return Ok();
        }


        /// <summary>
        /// Updates actor with nested movie.
        /// </summary>
        /// <param name="cancellationToken">The cancellation token.</param>
        /// <param name="request">Actor's request model.</param>
        /// <response code="200">Returns an empty response.</response>
        [SwaggerRequestExample(typeof(ActorRequestPutModel), examplesProviderType: typeof(ActorRequestPutModelExamples))]
        [Produces("application/json")]
        [HttpPut("UpdateActorWithNested")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> UpdateActorWithNested(CancellationToken cancellationToken, [FromBody] ActorRequestPutModel request)
        {
            await actorService.UpdateActorWithNestedAsync(cancellationToken, request);
            return Ok();
        }


        /// <summary>
        /// Patches actor.
        /// </summary>
        /// <param name="cancellationToken">The cancellation token.</param>
        /// <param name="request">Actor's request model.</param>
        /// <param name="id">Actor's id.</param>
        /// <response code="200">Returns an empty response.</response>
        [HttpPatch("UpdatePatchActor/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> UpdatePatchActor([FromBody] JsonPatchDocument<Actor> request, int id, CancellationToken cancellationToken)
        {
            await actorService.UpdatePatchActor(id, request, cancellationToken);
            return Ok();
        }

    }
}
