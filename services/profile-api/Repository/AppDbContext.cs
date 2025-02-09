using Microsoft.EntityFrameworkCore;
using profile_api.Models;

namespace profile_api.Repository;

public class AppDbContext(DbContextOptions<AppDbContext> context) : DbContext(context)
{
    public DbSet<Profile> Profiles { get; set; }
    public DbSet<Friendship> Friendships { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Friendship>()
            .HasOne(f => f.RequesterProfile)
            .WithMany(p => p.Following)
            .HasForeignKey(f => f.RequesterProfileId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Friendship>()
            .HasOne(f => f.ReceiverProfile)
            .WithMany(p => p.Followers)
            .HasForeignKey(f => f.ReceiverProfileId)
            .OnDelete(DeleteBehavior.Restrict);
    }

    
    
}