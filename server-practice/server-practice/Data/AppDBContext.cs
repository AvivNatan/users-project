using Microsoft.EntityFrameworkCore;
using server_practice.Model;

namespace server_practice.Data
{
    public class AppDBContext:DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options): base(options) { }
        public DbSet<User> Users => Set<User>();
    }
}
