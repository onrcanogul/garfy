using System.Diagnostics;
using Grpc.Core;
using Grpc.Core.Interceptors;

namespace media_api.Services.Interceptors;

public class GrpcLoggingInterceptor : Interceptor
{
    public override async Task<TResponse> UnaryServerHandler<TRequest, TResponse>(
        TRequest request, ServerCallContext context, UnaryServerMethod<TRequest, TResponse> continuation)
    {
        var stopwatch = Stopwatch.StartNew();
        var response = await continuation(request, context);
        stopwatch.Stop();

        Console.WriteLine($"[gRPC] {context.Method} took {stopwatch.ElapsedMilliseconds} ms");

        return response;
    }
}