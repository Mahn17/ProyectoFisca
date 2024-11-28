using System.Collections.Generic;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Canvas.Parser;
using Microsoft.AspNetCore.Mvc;
using ProyectoFisca.Models;

namespace ProyectoFisca.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LectorPdfController : ControllerBase
    {
        //[HttpGet]
        //public IActionResult ReadPdf()
        //{
          //  string pdfPath = "homicidios_22092024.pdf";
            //var data = ExtractDataFromPdf(pdfPath);
            //return Ok(data);
        //}

        /*static List<DatosHomicidios> ExtractDataFromPdf(string pdfPath)
        {
            var result = new List<DatosHomicidios>();
            string currentEntidad = null;
            string accumulatedLine = ""; 

            string currentMunicipio = null; // Para manejar líneas de municipios en varias líneas
            bool isMunicipioLine = false; // Indica si estamos procesando una línea de municipio

            using (PdfReader reader = new PdfReader(pdfPath))
            using (PdfDocument pdfDoc = new PdfDocument(reader))
            {
                for (int page = 1; page <= pdfDoc.GetNumberOfPages(); page++)
                {
                    var text = PdfTextExtractor.GetTextFromPage(pdfDoc.GetPage(page));
                    var lines = text.Split('\n');

                    foreach (var line in lines)
                    {
                        // Limpiar el texto y evitar líneas vacías
                        var trimmedLine = line.Trim();
                        if (string.IsNullOrEmpty(trimmedLine)) continue;

                        // Ignorar líneas de encabezado o separadores
                        if (trimmedLine.StartsWith("MUNICIPIOS MÁS VIOLENTOS") || 
                            trimmedLine.StartsWith("Homicidios Dolosos") || 
                            trimmedLine.StartsWith("Entidad")) 
                            //trimmedLine.StartsWith("--------------------------------------------------"))
                        {
                            continue;
                        }

                        // Detección de entidad (asumiendo que comienza con un nombre específico)
                        if (IsEntityLine(trimmedLine))
                        {
                             // Si hay un municipio anterior, añade la entrada a los resultados
                            if (currentMunicipio != null)
                            {
                                AddHomicidioData(result, currentEntidad, currentMunicipio);
                                currentMunicipio = null; // Reiniciar para la siguiente entrada
                            }

                            currentEntidad = GetEntityName(trimmedLine);
                        }
                        else
                        {

                            // Verifica si la línea es parte de un municipio
                            if (IsMunicipioLine(trimmedLine))
                            {
                                if (currentMunicipio != null)
                                {
                                    currentMunicipio += " " + trimmedLine; // Concatenar si es una continuación
                                }
                                else
                                {
                                    currentMunicipio = trimmedLine; // Asignar municipio
                                }
                                isMunicipioLine = true; // Indica que se está en una línea de municipio
                            }
                            else if (isMunicipioLine)
                            {

                                // Dividir la línea en partes basándose en el espacio en blanco
                                var columns = trimmedLine.Split(new[] { ' ' }, System.StringSplitOptions.RemoveEmptyEntries);
                                
                                // Asegurarse de que hay suficientes columnas
                                if (columns.Length >= 4)
                                {
                                    var municipio = columns[0]; // Asume que el primer campo es el municipio
                                    var noMuertos = columns[1]; // Asume que el segundo campo es el número de muertos
                                    var hombres = columns[2];
                                    var mujeres = columns[3];


                                    // Crear un nuevo objeto DatosHomicidios
                                    var data = new DatosHomicidios
                                    {
                                        Entidad = currentEntidad,
                                        Municipio = municipio,
                                        NoMuertos = noMuertos == "-" ? "0" : noMuertos, // Cambia '-' por '0' si lo deseas
                                        Hombre = hombres == "-" ? "0" : hombres, // Cambia '-' por '0' si lo deseas
                                        Mujer = mujeres == "-" ? "0" : mujeres

                                    };
                                    result.Add(data);
                                }

                            }
                           
                        }
                    }
                    // Si al final de la página hay datos sin agregar, los añadimos
                    if (currentMunicipio != null && currentEntidad != null)
                    {
                        AddHomicidioData(result, currentEntidad, currentMunicipio);
                    }
                }
            }

            return result;
        }

        private static bool IsEntityLine(string line)
        {
            // Define aquí qué considera como línea de entidad, puede incluir más condiciones
            return line.Contains("Baja California") || line.Contains("Chiapas");
        }
        private static void AddHomicidioData(List<DatosHomicidios> result, string entidad, string municipio)
        {
            // Se puede agregar una lógica para obtener los números de muertos y demás campos
            result.Add(new DatosHomicidios
            {
                Entidad = entidad,
                Municipio = municipio,
                NoMuertos = "0", // Aquí debes agregar la lógica para obtener el valor real
                Hombre = "0", // Aquí debes agregar la lógica para obtener el valor real
                Mujer = "0" // Aquí debes agregar la lógica para obtener el valor real
            });
        }


        private static string GetEntityName(string line)
        {
            // Extrae el nombre de la entidad de la línea
            var parts = line.Split(' ', System.StringSplitOptions.RemoveEmptyEntries);
            return parts[0]; // Retorna la primera parte como el nombre de la entidad
        }
         private static bool IsMunicipioLine(string line)
        {
            // Define aquí qué considera como línea de municipio
            return !string.IsNullOrWhiteSpace(line) && line.Length < 30; // Ajusta el criterio según sea necesario
        }*/

    }
}