using ProyectoFisca.Models;

using System.Collections.Generic;

namespace ProyectoFisca.Models
{
    public class Entidad
    {
        public int Id { get; set; }  // Clave primaria
        public string Nombre { get; set; }
        public ICollection<Municipio>? Municipios { get; set; }   // Relación con Municipios
    }
}
