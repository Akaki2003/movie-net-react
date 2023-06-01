using Microsoft.EntityFrameworkCore;
using SigmaMovies.API.Infrastructure.Extensions;
using SigmaMovies.Persistence;
using SigmaMovies.Persistence.Context;
using System.Reflection;
using FluentValidation.AspNetCore;
using FluentValidation;
using SigmaMovies.API.Infrastructure.Auth.JWT;
using Microsoft.OpenApi.Models;
using SigmaMovies.Persistence.Seed;
using Swashbuckle.AspNetCore.Filters;
using SigmaMovies.API.Infrastructure.Middlewares.ExceptionHandling;
using SigmaMovies.API.Infrastructure.Middlewares.ExceptionHandler;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//builder.Services.AddControllers().AddNewtonsoftJson(options => {
//    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
//});



// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "SigmaMovies Api",
        Version = "v1",
        Description = "Api for sigmest of sigma movies",
        Contact = new OpenApiContact
        {
            Email = "akaki.ujarashvili@gmail.com",
            Name = "Movies Application",
        }
    });
    option.AddSecurityDefinition("basic", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        //Type = SecuritySchemeType.Http,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "basic",
        In = ParameterLocation.Header,
        Description = "Basic Authorization header using the Bearer scheme."
    });
    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "basic"
                }
            },
            new string[] {}
        }
    });
    option.CustomSchemaIds(type => type.ToString());
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine($"{AppContext.BaseDirectory}", xmlFile);

    option.IncludeXmlComments(xmlPath);
    option.ExampleFilters();
});

builder.Services.AddTokenAuthentication(builder.Configuration.GetSection(nameof(JWTConfiguration)).GetSection(nameof(JWTConfiguration.Secret)).Value);

builder.Services.AddServices();


builder.Services.Configure<ConnectionStrings>(builder.Configuration.GetSection(nameof(ConnectionStrings)));
builder.Services.Configure<JWTConfiguration>(builder.Configuration.GetSection(nameof(JWTConfiguration)));


builder.Services.AddControllers(options => options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true)
    .AddNewtonsoftJson()
 //.AddJsonOptions(options =>
 //{
 //    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()); // use this to convert all enum parameters to string
 //})
 ;

builder.Services.AddFluentValidationAutoValidation().AddFluentValidationClientsideAdapters();
builder.Services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

builder.Services.AddDbContext<SigmaMoviesContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString(nameof(ConnectionStrings.DefaultConnection))));
builder.Services.AddScoped<DbContext, SigmaMoviesContext>();

builder.Logging.ClearProviders();
Log.Logger = new LoggerConfiguration().ReadFrom.Configuration(builder.Configuration).CreateLogger();

builder.Host.UseSerilog();
builder.Services.AddSwaggerExamplesFromAssemblies(Assembly.GetExecutingAssembly());

// Enable CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigin",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

var app = builder.Build();

app.UseMiddleware<ExceptionHandlingMiddleware>();
app.UseMiddleware<RequestAndResponseLoggingMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseCors("AllowOrigin"); // Apply CORS policy

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
SigmaMoviesSeed.Initialize(app.Services);


try
{
    Log.Information("Starting...");
app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Host terminated");
}
finally
{
    Log.CloseAndFlush();
}