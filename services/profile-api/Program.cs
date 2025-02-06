using Microsoft.EntityFrameworkCore;
using profile_api.Repository;
using profile_api.Services;
using profile_api.Services.Mapper;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddSingleton<IConnectionMultiplexer>(opt =>
    ConnectionMultiplexer.Connect($"{builder.Configuration["Redis:Host"]}:{builder.Configuration["Redis:Port"]}"));
builder.Services.AddScoped<IProfileService, ProfileService>();
builder.Services.AddAutoMapper(typeof(Mapping));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();

app.Run();