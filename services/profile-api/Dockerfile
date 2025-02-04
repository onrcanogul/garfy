# .NET Runtime için temel image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Build Aşaması (SDK içeren image)
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Proje dosyalarını kopyala ve restore et
COPY ["profile-api.csproj", "./"]
RUN dotnet restore "profile-api.csproj"

# Kodları kopyala ve build et
COPY . .
WORKDIR /src
RUN dotnet build "profile-api.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Publish Aşaması
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "profile-api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Final Image (Çalıştırma)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "profile-api.dll"]
