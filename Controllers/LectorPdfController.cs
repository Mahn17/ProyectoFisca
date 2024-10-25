using System;
using System.IO;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Canvas.Parser;
using Microsoft.AspNetCore.Mvc;

namespace ProyectoFisca.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LectorPdfController : ControllerBase
    {
        [HttpGet]
        public IActionResult ReadPdf()
        {
            string pdfPath = "homicidios.pdf";
            string text = ExtractTextFromPdf(pdfPath);
            //Console.WriteLine(text);
            return Ok(text);
        }

        static string ExtractTextFromPdf(string pdfPath)
        {
            using (PdfReader reader = new PdfReader(pdfPath))
            using (PdfDocument pdfDoc = new PdfDocument(reader))
            {
                StringWriter text = new StringWriter();
                for (int page = 1; page <= 1; page++)
                {
                    text.WriteLine(PdfTextExtractor.GetTextFromPage(pdfDoc.GetPage(page)));
                }
                return text.ToString();
            }
        }
    }
}
