# .NET Runtime için temel image (Çalıştırma aşaması)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# ✅ Gerekli araçları ekleyelim (bash, curl, wget, procps)
RUN apt-get update && apt-get install -y bash curl wget procps

# .NET SDK içeren image (Build aşaması)
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# ✅ wget ve curl yükle (Eğer build aşamasında da ihtiyaç duyarsan)
RUN apt-get update && apt-get install -y wget curl

# Proje dosyalarını kopyala ve restore et
COPY ["profile-api.csproj", "./"]
RUN dotnet restore "profile-api.csproj"

# Tüm kaynak kodlarını kopyala ve build et
COPY . .
RUN dotnet build "profile-api.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Publish aşaması
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "profile-api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# ✅ Final image: Artık hem runtime hem de temel araçlar var!
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# ✅ Bash üzerinden başlat
ENTRYPOINT ["/bin/bash", "-c", "dotnet profile-api.dll"]
