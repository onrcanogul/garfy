using media_api.Models.Entities;
using Microsoft.EntityFrameworkCore;
using File = media_api.Models.Entities.File;

namespace media_api.Infrastructure;

public class MediaDbContext(DbContextOptions<MediaDbContext> options) : DbContext(options)
{
    public DbSet<File> Files { get; set; }
    public DbSet<PostImage> PostImages { get; set; }
    public DbSet<ProfileImage> ProfileImages { get; set; }
    public DbSet<ReelsVideo> ReelVideos { get; set; }
}