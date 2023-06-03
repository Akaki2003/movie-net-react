﻿using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using SigmaMovies.API.Infrastructure.Middlewares.RequestResponseLogging;
using System.Text;

namespace SigmaMovies.API.Infrastructure.Middlewares.ExceptionHandler
{
    public class RequestAndResponseLoggingMiddleware
    {
        private readonly RequestDelegate _next;

        private string path = Path.Combine(Environment.CurrentDirectory, "Logs", "ReqResLogging.txt");

        public RequestAndResponseLoggingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {

            await LogRequest(context.Request);

            Stream originalBody = context.Response.Body;

            try
            {
                using (var memoryStream = new MemoryStream())
                {
                    context.Response.Body = memoryStream;

                    await _next(context);
                    await LoggingResponse(context.Response, memoryStream);

                    memoryStream.Position = 0;
                    await memoryStream.CopyToAsync(originalBody);
                }
            }
            finally
            {
                context.Response.Body = originalBody;
            }
        }

        private async Task LoggingResponse(HttpResponse response, MemoryStream memoryStream)
        {
            memoryStream.Position = 0;
            string responseBody = new StreamReader(memoryStream).ReadToEnd();
            Console.WriteLine(responseBody);

            var logger = $"Response logged from middleware " +
               $"StatusCode = {response.StatusCode}\n" +
               $"TraceIdentifier = {response.HttpContext.TraceIdentifier}\n" +
               $"Body = {responseBody}\n" +
               $"ResponseTime = {DateTime.Now}\n";

            await File.AppendAllTextAsync(path, logger);
        }

        private async Task LogRequest(HttpRequest request)
        {
            var requestModel = new RequestModel
            {
                IP = request.HttpContext.Connection.RemoteIpAddress.ToString(),
                Schema = request.Scheme,
                Host = request.Host.ToString(),
                Method = request.Method,
                Path = request.Path,
                IsSecured = request.IsHttps,
                QueryString = request.QueryString.ToString(),
                Body = await ReadRequestBody(request),
            };

            if (!string.IsNullOrEmpty(requestModel.Body))
            {
                var jsonObject = JObject.Parse(requestModel.Body);
                if (jsonObject.ContainsKey("password"))
                {
                    jsonObject["password"] = new string('*', jsonObject["password"].Value<string>().Length);
                    requestModel.Body = jsonObject.ToString();
                }
            }

            var toLog = $" logged from Middleware\n" +
                $"IP = {requestModel.IP}\n" +
                $"Address = {requestModel.Schema}\n" +
                $"Method = {requestModel.Method}\n" +
                $"Path = {requestModel.Path}\n" +
                $"IsSecured = {requestModel.IsSecured}\n" +
                $"QueryString = {requestModel.QueryString}\n" +
                $"RequestBody = {requestModel.Body}\n" +
                $"Time = {requestModel.RequestTime}\n";

            await File.AppendAllTextAsync(path, toLog);
        }

        private async Task<string> ReadRequestBody(HttpRequest request)
        {
            request.EnableBuffering();

            var buffer = new byte[request.ContentLength ?? 0];

            await request.Body.ReadAsync(buffer, 0, buffer.Length);

            var bodyAsText = Encoding.UTF8.GetString(buffer);

            request.Body.Position = 0;

            return bodyAsText;
        }
    }
}
