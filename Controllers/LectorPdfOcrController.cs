using System;
using System.IO;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Canvas.Parser;
using Microsoft.AspNetCore.Mvc;
using Tesseract;

namespace ProyectoFisca.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LectorPdfOcrController : ControllerBase
    {
        [HttpGet]
        public IActionResult ReadPdf()
        {
            string pdfPath = "homicidiosfotos.pdf";
            string text = ExtractTextFromPdf(pdfPath);
            return Ok(text);
        }

        static string ExtractTextFromPdf(string pdfPath)
        {
            using (PdfReader reader = new PdfReader(pdfPath))
            using (PdfDocument pdfDoc = new PdfDocument(reader))
            {
                StringWriter textWriter = new StringWriter();

                for (int page = 1; page <= pdfDoc.GetNumberOfPages(); page++)
                {
                    string extractedText = PdfTextExtractor.GetTextFromPage(pdfDoc.GetPage(page));

                    // Si no hay texto digital, aplica OCR
                    if (string.IsNullOrWhiteSpace(extractedText))
                    {
                        // Extrae la imagen de la página y aplica OCR
                        string ocrText = ExtractTextFromImage(pdfPath, page);
                        textWriter.WriteLine(ocrText);
                    }
                    else
                    {
                        textWriter.WriteLine(extractedText);
                    }
                }

                return textWriter.ToString();
            }
        }

        static string ExtractTextFromImage(string pdfPath, int pageNumber)
        {
            // Aquí puedes utilizar una biblioteca adicional para extraer la página como una imagen
            // y luego aplicar OCR. Por simplicidad, asumimos que la imagen ya está extraída.

            string imagePath = $"page_{pageNumber}.png"; // Guarda la página como una imagen

            // Usa Tesseract para aplicar OCR sobre la imagen
            using (var engine = new TesseractEngine(@"./tessdata", "eng", EngineMode.Default))
            {
                using (var img = Pix.LoadFromFile(imagePath))
                {
                    using (var page = engine.Process(img))
                    {
                        return page.GetText();
                    }
                }
            }
        }
    }
}
