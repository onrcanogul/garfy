using media_api.Infrastructure;
using media_api.Models.Storage;
using media_api.Models.Storage.Cloud.Azure;
using media_api.Services;
using media_api.Services.Interceptors;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();
builder.Services.AddGrpc(options =>
{
    options.Interceptors.Add<GrpcLoggingInterceptor>();
});
builder.Services.AddScoped<IStorage, AzureStorage>();
builder.Services.AddScoped<IStorageService, StorageService>();
builder.Services.AddScoped<IMediaService, MediaService>();
builder.Services.AddHealthChecks();
builder.Services.AddDbContext<MediaDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("PostgreSQL")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        corsPolicyBuilder =>  
        {
            corsPolicyBuilder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});
var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<MediaDbContext>();
    dbContext.Database.Migrate();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseHealthChecks("/health");
app.UseHttpsRedirection();
app.MapControllers();
app.Run();