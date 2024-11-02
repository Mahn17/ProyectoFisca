import React, { Component } from 'react';
import { Chart } from 'chart.js/auto';

export class Graphs extends Component {
  static displayName = Graphs.name;

  data = {
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
  };

  componentDidMount() {
    this.createChart(this.barChartRef, 'bar');
    this.createChart(this.lineChartRef, 'line');
    this.createChart(this.pieChartRef, 'pie');
    this.createChart(this.radarChartRef, 'radar');
  }

  createChart(ref, type) {
    const ctx = ref.getContext('2d');
    new Chart(ctx, {
      type: type,
      data: this.data,
      options: {
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

  exportData = () => {
    const { labels, datasets } = this.data;
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

  render() {
    return (
      <div>
        <button onClick={this.exportData}>Exportar datos</button>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '10px' 
        }}>
          <div style={{ width: '100%', height: '300px' }}>
            <canvas ref={(ref) => this.barChartRef = ref} />
          </div>
          <div style={{ width: '100%', height: '300px' }}>
            <canvas ref={(ref) => this.lineChartRef = ref} />
          </div>
          <div style={{ width: '100%', height: '300px' }}>
            <canvas ref={(ref) => this.radarChartRef = ref} />
          </div>
          <div style={{ width: '100%', height: '600px' }}>
            <canvas ref={(ref) => this.pieChartRef = ref} />
          </div>
        </div>
      </div>
    );
  }
}
