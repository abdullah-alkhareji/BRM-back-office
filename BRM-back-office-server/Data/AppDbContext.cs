using BRM_back_office_server.Models;
using Microsoft.EntityFrameworkCore;

namespace BRM_back_office_server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<User> Users => Set<User>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(x => x.Id);

                entity.HasIndex(x => x.Email)
                      .IsUnique();

                entity.Property(x => x.Email)
                      .IsRequired()
                      .HasMaxLength(256);

                entity.Property(x => x.PasswordHash)
                      .IsRequired();
            });
        }
    }

}
