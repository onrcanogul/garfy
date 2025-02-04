using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using profile_api.Models;
using profile_api.Repository;
using StackExchange.Redis;

namespace profile_api.Services;

public class ProfileService(AppDbContext context, IConnectionMultiplexer redis) : IProfileService
{
    private readonly IDatabase _cache = redis.GetDatabase();

    public async Task<Profile> GetProfile(Guid id)
    {
        var cacheKey = $"profile_{id}";

        var cachedProfile = await _cache.StringGetAsync(cacheKey);
        if(!cachedProfile.IsNullOrEmpty)
            return JsonSerializer.Deserialize<Profile>(cachedProfile);
        
        var profile = await context.Profiles.FirstOrDefaultAsync(x => x.Id == id);
        if(profile != null)
            await _cache.StringSetAsync(cacheKey, JsonSerializer.Serialize(profile));
        return profile;
    }

    public async Task Create(Profile profile)
    {
        await context.Profiles.AddAsync(profile);
        await context.SaveChangesAsync();
    }

    public async Task Update(Profile model)
    {
        var profile = await context.Profiles.FirstOrDefaultAsync(x => x.Id == model.Id);
        if (profile == null) return;
        profile.Bio = model.Bio;
        profile.Username = model.Username;
        // profile.Email = model.Email;
        context.Update(profile);
        await context.SaveChangesAsync();
        
        var cacheKey = $"profile_{model.Id}";
        await _cache.KeyDeleteAsync(cacheKey);
        
        await _cache.StringSetAsync(cacheKey, JsonSerializer.Serialize(model));
    }

    public async Task Delete(Guid id)
    {
        var profile = await context.Profiles.FirstOrDefaultAsync(x => x.Id == id);
        context.Profiles.Remove(profile);
        await context.SaveChangesAsync();
        
        var cacheKey = $"profile_{id}";
        await _cache.KeyDeleteAsync(cacheKey);
    }
}