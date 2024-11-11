namespace ProyectoFisca.Models
{
    public class Municipio
    {
        public int Id { get; set; } // Clave primaria
        public string? Nombre { get; set; }
        public int EntidadId { get; set; }
        public Entidad? Entidad { get; set; }  // Relación con Entidad
    }
}
