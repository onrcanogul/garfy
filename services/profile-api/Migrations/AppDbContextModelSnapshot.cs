﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using profile_api.Repository;

#nullable disable

namespace profile_api.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("profile_api.Models.Friendship", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("FriendshipState")
                        .HasColumnType("integer");

                    b.Property<Guid>("ReceiverProfileId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("RequesterProfileId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("ReceiverProfileId");

                    b.HasIndex("RequesterProfileId");

                    b.ToTable("Friendships");
                });

            modelBuilder.Entity("profile_api.Models.Profile", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("AvatarPath")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Bio")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("IsHidden")
                        .HasColumnType("boolean");

                    b.Property<int>("PostCount")
                        .HasColumnType("integer");

                    b.Property<decimal>("Rating")
                        .HasColumnType("numeric");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Profiles");
                });

            modelBuilder.Entity("profile_api.Models.Friendship", b =>
                {
                    b.HasOne("profile_api.Models.Profile", "ReceiverProfile")
                        .WithMany("Followers")
                        .HasForeignKey("ReceiverProfileId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("profile_api.Models.Profile", "RequesterProfile")
                        .WithMany("Following")
                        .HasForeignKey("RequesterProfileId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("ReceiverProfile");

                    b.Navigation("RequesterProfile");
                });

            modelBuilder.Entity("profile_api.Models.Profile", b =>
                {
                    b.Navigation("Followers");

                    b.Navigation("Following");
                });
#pragma warning restore 612, 618
        }
    }
}
