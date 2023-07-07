using Microsoft.AspNetCore.JsonPatch;
using Moq;
using SigmaMovies.Application;
using SigmaMovies.Application.Actors;
using SigmaMovies.Application.Actors.Repositories;
using SigmaMovies.Application.Actors.Requests;
using SigmaMovies.Application.Exceptions;
using SigmaMovies.Domain.Actors;

namespace SigmaMoviesTest.Actors
{
    public class ActorTest
    {
        private readonly Mock<IActorRepository> actorRepo = new Mock<IActorRepository> {DefaultValue=DefaultValue.Empty };
        private readonly Mock<IUnitOfWork> unitOfWorkRepo = new Mock<IUnitOfWork> {DefaultValue=DefaultValue.Empty };

        private readonly ActorService actorService;
        private readonly CancellationToken cancellationToken = new CancellationToken();

        private readonly ActorRequestPutModelNoNested actorRequestPutModelNoNested;
        private readonly ActorRequestPutModel actorRequestPutModel;

        private int id;
        public ActorTest()
        {
            actorService = new ActorService(actorRepo.Object, unitOfWorkRepo.Object);
            actorRequestPutModelNoNested = GetActorRequestPutModelNoNested();
            id = 1;
        }

        [Fact]
        public void ShouldThrowActorNotFoundException_CallingGetActorById_WhenActorWithCurrentIdDoesntExist()
        {
            //arrange
            actorRepo.Setup(x => x.GetActorById(id, cancellationToken));

            //act
            var task = () => actorService.GetActorById(id, cancellationToken);

            //assert

            Assert.ThrowsAnyAsync<ActorNotFoundException>(task);
        }

        [Fact]
        public void ShouldThrowActorNotFoundException_WhileUpdating_WhenActorWithCurrentIdDoesntExist()
        {
            //arrange
            actorRepo.Setup(x => x.GetActorById(id,cancellationToken));

            //act
            var task = () => actorService.UpdateActorAsync(cancellationToken, actorRequestPutModelNoNested);

            //assert

            Assert.ThrowsAnyAsync<ActorNotFoundException>(task);
        }


        [Fact]
        public void ShouldThrowActorNotFoundException_WhileUpdatingWithNested_WhenActorWithCurrentIdDoesntExist()
        {
            //arrange
            actorRepo.Setup(x => x.GetActorByIdFull(id, cancellationToken));

            //act
            var task = () => actorService.UpdateActorWithNestedAsync(cancellationToken, actorRequestPutModel);

            //assert

            Assert.ThrowsAnyAsync<ActorNotFoundException>(task);
        }

        [Fact]
        public void ShouldThrowActorNotFoundException_WhilePatching_WhenActorWithCurrentIdDoesntExist()
        {
            //arrange
            actorRepo.Setup(x => x.GetActorById(id,cancellationToken));

            //act
            var task = () => actorService.UpdatePatchActor(id, It.IsAny<JsonPatchDocument<Actor>>(),cancellationToken);

            //assert

            Assert.ThrowsAnyAsync<ActorNotFoundException>(task);
        }


        private ActorRequestPutModelNoNested GetActorRequestPutModelNoNested()
        {
            ActorRequestPutModelNoNested actorRequestPutModelNoNested = new ActorRequestPutModelNoNested()
            {
                Id = 1,
                Img = "img",
                Name = "selma"
            };
            return actorRequestPutModelNoNested;
        }
    }
}