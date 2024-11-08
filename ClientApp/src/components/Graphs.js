import React, { Component } from 'react';
import { Chart } from 'chart.js/auto';
import Plot from 'react-plotly.js';

export class Graphs extends Component {
  static displayName = Graphs.name;

  //Constructor de la tabla de datos(cambiar por lectura de base de datos)
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: [
          'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua', 
          'Ciudad de México', 'Coahuila', 'Colima', 'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo', 
          'Jalisco', 'Estado de México', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 
          'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 
          'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
        ],
        datasets: [{
          label: '# de muertes',
          data: [12, 10, 3, 5, 2, 3, 12, 10, 3, 5, 2, 3, 12, 10, 3, 5, 2, 3, 12, 10, 3, 5, 2, 3, 12, 10, 3, 5, 2, 3],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        }],
      },
      mapData: {
        labels: [
          'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua', 
          'Ciudad de México', 'Coahuila', 'Colima', 'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo', 
          'Jalisco', 'Estado de México', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 
          'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 
          'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
        ],
        values: [12, 10, 3, 5, 2, 3, 12, 10, 3, 5, 2, 3, 12, 10, 3, 5, 2, 3, 12, 10, 3, 5, 2, 3, 12, 10, 3, 5, 2, 3],
        codes: [
          'AGU', 'BCN', 'BCS', 'CAM', 'CHP', 'CHH', 'CMX', 'COA', 'COL', 'DUR', 'GUA', 'GRO', 'HID', 
          'JAL', 'MEX', 'MIC', 'MOR', 'NAY', 'NLE', 'OAX', 'PUE', 'QUE', 'ROO', 'SLP', 'SIN', 'SON', 
          'TAB', 'TAM', 'TLA', 'VER', 'YUC', 'ZAC'
        ],
      }
    };

    this.charts = {};
  }

  //Creacion inicial de todos graficos
  componentDidMount() {
    this.createChart(this.barChartRef, 'bar', 'barChart');
    this.createChart(this.lineChartRef, 'line', 'lineChart');
    this.createChart(this.pieChartRef, 'pie', 'pieChart');
    this.createChart(this.radarChartRef, 'radar', 'radarChart');
    this.createChart(this.sideBarChartRef, 'bar', 'sideBarChart');
  }

  //Destruccion de graficos
  componentWillUnmount() {
    Object.values(this.charts).forEach(chart => {
      if (chart) chart.destroy();
    });
  }

  //Creacion individual de graficos
  createChart(ref, type, chartName) {
    if (this.charts[chartName]) {
      this.charts[chartName].destroy();
    }

    //Grafica Mapa
    const ctx = ref.getContext('2d');
    this.charts[chartName] = new Chart(ctx, {
      type: type,
      data: this.state.data,
      options: {
        indexAxis: chartName === 'sideBarChart' ? 'y' : 'x',
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  //Exportacion de datos a un archivo txt
  exportData = () => {
    const { labels, datasets } = this.state.data;
    const rows = labels.map((label, index) => `${label}: ${datasets[0].data[index]}`);
    const fileContent = rows.join('\n');

    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  //Importacion de datos de un archivo txt
  importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        const lines = content.split('\n');

        const labels = [];
        const data = [];

        lines.forEach(line => {
          const [label, value] = line.split(':').map(item => item.trim());
          if (label && !isNaN(value)) {
            labels.push(label);
            data.push(parseFloat(value));
          }
        });

        this.setState({
          data: {
            labels: labels,
            datasets: [{
              label: '# de muertes',
              data: data,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            }],
          }
        }, () => {
          // Volver a crear los gráficos para que tomen los nuevos datos
          this.createChart(this.barChartRef, 'bar', 'barChart');
          this.createChart(this.lineChartRef, 'line', 'lineChart');
          this.createChart(this.pieChartRef, 'pie', 'pieChart');
          this.createChart(this.radarChartRef, 'radar', 'radarChart');
          this.createChart(this.sideBarChartRef, 'bar', 'sideBarChart');
        });
      };
      reader.readAsText(file);
    }
  };

  //Renderizacion de Graficos
  render() {
    const { labels, values, codes } = this.state.mapData;

    return (
      <div>
        <button onClick={this.exportData}>Exportar datos</button>
        <input type="file" accept=".txt" onChange={this.importData} />
        
        {/*Primeras dos Graficas */}
        <div style={{
          display: 'flex', 
          flexDirection: 'row', 
          justifyContent: 'space-around', 
          width: '100%',
          gap: '10px',
        }}>
          <div style={{ width: '45%', height: '300px' }}>
            <canvas ref={(ref) => this.barChartRef = ref} />
          </div>
          <div style={{ width: '45%', height: '300px' }}>
            <canvas ref={(ref) => this.lineChartRef = ref} />
          </div>
        </div>
        
        {/* Resto de las Graficas */}
        <div style={{
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: '10px'
        }}>
          <div style={{ width: '100%', height: '300px' }}>
            <canvas ref={(ref) => this.radarChartRef = ref} />
          </div>
          <div style={{ width: '100%', height: '300px' }}>
            <canvas ref={(ref) => this.pieChartRef = ref} />
          </div>
          <div style={{ width: '100%', height: '300px' }}>
            <canvas ref={(ref) => this.sideBarChartRef = ref} />
          </div>
        </div>

        {/* Mapa de México */}
        <div style={{ width: '100%', height: '500px', marginTop: '20px' }}>
          <Plot
            data={[
              {
                type: 'choropleth',
                locations: codes,
                z: values,
                locationmode: 'ISO-3',
                text: labels,
                colorscale: [
                  [0, "rgb(5, 10, 172)"],
                  [0.35, "rgb(40, 60, 190)"],
                  [0.5, "rgb(70, 100, 245)"],
                  [0.6, "rgb(90, 120, 245)"],
                  [0.7, "rgb(106, 137, 247)"],
                  [1, "rgb(220, 220, 220)"]
                ],
                colorbar: {
                  title: '# de muertes',
                },
                marker: {
                  line: {
                    color: 'rgb(180,180,180)',
                    width: 0.5
                  }
                },
              }
            ]}
            layout={{
              title: 'Mapa de México - Distribución de Muertes',
              geo: {
                scope: 'north america',
                showlakes: true,
                lakecolor: 'rgb(255, 255, 255)',
                projection: { type: 'mercator' }
              }
            }}
          />
        </div>
      </div>
    );
  }
}
