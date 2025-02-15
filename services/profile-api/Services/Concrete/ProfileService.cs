using System.Text.Json;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using profile_api.Models;
using profile_api.Models.Response;
using profile_api.Repository;
using StackExchange.Redis;
using NoContent = profile_api.Models.Response.NoContent;
using Profile = profile_api.Models.Profile;

namespace profile_api.Services;

public class ProfileService(
    AppDbContext context,
    IConnectionMultiplexer redis,
    IMapper mapper,
    IConfiguration configuration,
    HttpClient client) : IProfileService
{
    private readonly IDatabase _cache = redis.GetDatabase();
    private readonly string _mediaApiUrl = configuration.GetValue<string>("MediaApiUrl")!;

    public async Task<ServiceResponse<ProfileDto>> GetProfile(string username, IFormFileCollection files)
    {
        var cacheKey = $"profile_{username}";
        var cachedProfile = await _cache.StringGetAsync(cacheKey);
        if (!cachedProfile.IsNullOrEmpty)
            return ServiceResponse<ProfileDto>.Success(
                mapper.Map<ProfileDto>(JsonSerializer.Deserialize<Profile>(cachedProfile)), StatusCodes.Status200OK);
        var profile = await context.Profiles.Include(x => x.Followers).Include(x => x.Following)
            .FirstOrDefaultAsync(x => x.Username == username);
        if (profile == null)
            throw new KeyNotFoundException("Profile not found");
        var dto = await GetImages(profile);
        await _cache.StringSetAsync(cacheKey, JsonSerializer.Serialize(profile));
        return ServiceResponse<ProfileDto>.Success(dto, StatusCodes.Status200OK);
    }
    public async Task<ServiceResponse<NoContent>> Create(ProfileDto profile)
    {
        await context.Profiles.AddAsync(mapper.Map<Profile>(profile));
        await context.SaveChangesAsync();
        return ServiceResponse<NoContent>.Success(StatusCodes.Status201Created);
    }

    public async Task<ServiceResponse<NoContent>> Update(ProfileDto model)
    {
        var profile = await context.Profiles.FirstOrDefaultAsync(x => x.Id == model.Id);
        if (profile == null) return ServiceResponse<NoContent>.Failure("Profile Not Found", StatusCodes.Status404NotFound);
        profile.Bio = model.Bio;
        profile.Username = model.Username;
        profile.FullName = model.FullName;
        // profile.Email = model.Email;
        //profile.AvatarPath = model.AvatarPath;
        context.Update(profile);
        await context.SaveChangesAsync();
        
        var cacheKey = $"profile_{model.Id}";
        await _cache.KeyDeleteAsync(cacheKey);
        
        await _cache.StringSetAsync(cacheKey, JsonSerializer.Serialize(profile));
        return ServiceResponse<NoContent>.Success(StatusCodes.Status200OK);
    }

    public async Task<ServiceResponse<NoContent>> Delete(Guid id)
    {
        var profile = await context.Profiles.FirstOrDefaultAsync(x => x.Id == id);
        context.Profiles.Remove(profile);
        await context.SaveChangesAsync();
        
        var cacheKey = $"profile_{id}";
        await _cache.KeyDeleteAsync(cacheKey);

        return ServiceResponse<NoContent>.Success(StatusCodes.Status200OK);
    }
    
    private async Task<ProfileDto> GetImages(Profile profile)
    {
        var dto = mapper.Map<ProfileDto>(profile);
        var response = await client.GetAsync($"{_mediaApiUrl}/{profile.Id}/3");
        await using var stream = await response.Content.ReadAsStreamAsync();
        dto.ProfileImageUrl = (await JsonSerializer.DeserializeAsync<List<string>>(stream) ?? []).First();
        return dto;
    }
}