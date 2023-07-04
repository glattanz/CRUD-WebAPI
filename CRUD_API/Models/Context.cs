using Microsoft.EntityFrameworkCore;

namespace CRUD_API.Models
{
    public class Context : DbContext
    {
        public DbSet<Person> People { get; set; }

        public Context(DbContextOptions<Context> options) : base(options)
        {

        }
    }
}