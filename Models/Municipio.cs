using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProyectoFisca.Models
{
    public class Municipio
    {
        [Key]
        public int Id { get; set; } // Clave primaria
        public string? Nombre { get; set; }
        public int? EntidadId { get; set; }
        public Entidad? Entidad { get; set; }  // Relación con Entidad
    }
}
