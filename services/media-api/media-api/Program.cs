using media_api.Models.Storage;
using media_api.Models.Storage.Cloud.Azure;
using media_api.Services;
using media_api.Services.File;
using media_api.Services.File.Reels;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddGrpc();
builder.Services.AddScoped<IStorage, AzureStorage>();
builder.Services.AddScoped<IStorageService, StorageService>();
builder.Services.AddScoped<IReelsFileService, ReelsFileService>();
builder.Services.AddScoped<IProfileFileService, ProfileFileService>();
builder.Services.AddScoped<IPostFileService, PostFileService>();


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.Run();