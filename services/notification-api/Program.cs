using Microsoft.EntityFrameworkCore;
using notification_api.Contexts;
using notification_api.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<NotificationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddOpenApi();
builder.Services.AddSignalR();


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseEndpoints(endpoint =>
{
    endpoint.MapControllers();
    endpoint.MapHub<NotificationHub>("/notificationHub");
});
app.Run();