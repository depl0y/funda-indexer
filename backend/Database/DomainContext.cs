using backend.Database.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace backend.Database
{
    public class DomainContext  : DbContext
    {
        private IConfiguration Configuration;

        /// <summary>
        /// Realtors stored in the database
        /// </summary>
        public DbSet<Realtor> Realtors { get; set; }

        public DomainContext(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);

            optionsBuilder.EnableSensitiveDataLogging(true);
            optionsBuilder.UseLazyLoadingProxies();
            
            var databasePath = Path.GetFullPath(this.Configuration["DataPath"]);
            optionsBuilder.UseSqlite("Data Source=" + databasePath);
        }

    }
}
