﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using media_api.Infrastructure;

#nullable disable

namespace media_api.Migrations
{
    [DbContext(typeof(MediaDbContext))]
    [Migration("20250210080302_initial")]
    partial class initial
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("media_api.Models.Entities.File", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasMaxLength(13)
                        .HasColumnType("character varying(13)");

                    b.Property<int>("FileType")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Path")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Storage")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Files");

                    b.HasDiscriminator<string>("Discriminator").HasValue("File");

                    b.UseTphMappingStrategy();
                });

            modelBuilder.Entity("media_api.Models.Entities.PostImage", b =>
                {
                    b.HasBaseType("media_api.Models.Entities.File");

                    b.Property<Guid>("PostId")
                        .HasColumnType("uuid");

                    b.HasDiscriminator().HasValue("PostImage");
                });

            modelBuilder.Entity("media_api.Models.Entities.ProfileImage", b =>
                {
                    b.HasBaseType("media_api.Models.Entities.File");

                    b.Property<Guid>("ProfileId")
                        .HasColumnType("uuid");

                    b.HasDiscriminator().HasValue("ProfileImage");
                });

            modelBuilder.Entity("media_api.Models.Entities.ReelsVideo", b =>
                {
                    b.HasBaseType("media_api.Models.Entities.File");

                    b.Property<Guid>("ProfileId")
                        .HasColumnType("uuid");

                    b.ToTable("Files", t =>
                        {
                            t.Property("ProfileId")
                                .HasColumnName("ReelsVideo_ProfileId");
                        });

                    b.HasDiscriminator().HasValue("ReelsVideo");
                });
#pragma warning restore 612, 618
        }
    }
}
