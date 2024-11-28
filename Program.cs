using Microsoft.EntityFrameworkCore;
using ProyectoFisca.Data;

var builder = WebApplication.CreateBuilder(args);

// Configurar la conexión a la base de datos
var connectionString = builder.Configuration.GetConnectionString("FiscaliaDatabase");
if (connectionString == null)
{
    throw new InvalidOperationException("Connection string 'FiscaliaDatabase' not found.");
}

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySQL(connectionString));

// Agregar servicios al contenedor
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configuración del pipeline HTTP
if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();





