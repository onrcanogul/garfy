using media_api.Infrastructure;
using media_api.Models.Storage;
using media_api.Models.Storage.Cloud.Azure;
using media_api.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();
builder.Services.AddGrpc();
builder.Services.AddScoped<IStorage, AzureStorage>();
builder.Services.AddScoped<IStorageService, StorageService>();
builder.Services.AddDbContext<MediaDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("PostgreSQL")));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapGrpcService<MediaService>();
app.MapControllers();
app.Run();