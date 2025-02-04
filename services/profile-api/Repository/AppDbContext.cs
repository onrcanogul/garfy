using Microsoft.EntityFrameworkCore;
using profile_api.Models;

namespace profile_api.Repository;

public class AppDbContext(DbContextOptions<AppDbContext> context) : DbContext(context)
{
    public DbSet<Profile> Profiles { get; set; }
}