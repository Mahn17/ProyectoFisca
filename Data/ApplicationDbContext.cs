using Microsoft.EntityFrameworkCore;
using ProyectoFisca.Models;

namespace ProyectoFisca.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<DatosHomicidios2>? Homicidios3 { get; set; }
        public DbSet<Municipio>? Municipio { get; set; }
        public DbSet<Entidad>? Entidad { get; set; }
    }
}

