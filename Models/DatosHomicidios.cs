namespace ProyectoFisca.Models
{
    public class DatosHomicidios2
    {
        public int Id { get; set; }  // Clave primaria
        public int MunicipioId { get; set; }
        public Municipio? Municipio { get; set; }
        public DateTime Fecha { get; set; }
        public int NoMuertos { get; set; }
        public int Hombre { get; set; }
        public int Mujer { get; set; }
        public int NoIdentificado { get; set; }
        public string? Fuente { get; set; }
    }
}
