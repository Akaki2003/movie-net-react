using System.Text.Json.Serialization;

namespace SigmaMovies.Application.HelperModels
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum SortBy
    {
        Year,
        IMDb,
        RottenTomatoes
    }
}
