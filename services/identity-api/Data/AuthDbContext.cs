using identity_api.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace identity_api.Data;

public class AuthDbContext(DbContextOptions<AuthDbContext> options) : IdentityDbContext<User, Role, string>(options)
{
}