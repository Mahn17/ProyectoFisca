using System.Collections.Generic;
using System.IO;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Canvas.Parser;
using Microsoft.AspNetCore.Mvc;

namespace ProyectoFisca.Models
{
    public class DatosHomicidios
    {
        public string? Entidad { get; set; }
        public string? Municipio { get; set; }
        public string? NoMuertos { get; set; }
        public string? Hombre { get; set; }
        public string? Mujer { get; set; }
        public string? NoIdentificado { get; set; }
        public string? Fuente { get; set; }
    }
}