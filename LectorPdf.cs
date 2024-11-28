using ProyectoFisca.Data;
using ProyectoFisca.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProyectoFisca.Controllers;

namespace ProyectoFisca
{
    public class LectorPdf
    {
        private readonly ApplicationDbContext _context;

        public LectorPdf(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Homicidios3>> ObtenerHomicidiosAsync()
        {
            var homicidios = await _context.Homicidios3
                .Include(h => h.Municipio)  // Incluir Municipio
                .ThenInclude(m => m.Entidad)  // Incluir Entidad relacionada con Municipio
                .Select(h => new Homicidios3
                {
                    Id = h.Id,
                    Municipio_Id = h.Municipio_Id,
                    Municipio = h.Municipio,
                    Fecha = h.Fecha,
                    NoMuertos = h.NoMuertos,
                    Hombre = h.Hombre,
                    Mujer = h.Mujer,
                    NoIdentificado = h.NoIdentificado,
                    Fuente = h.Fuente
                })
                .ToListAsync();

            return homicidios;
        }
    }
}

