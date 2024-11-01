import React, { Component } from 'react';
import { Chart } from 'chart.js/auto';

export class Graphs extends Component {
  static displayName = Graphs.name;

  componentDidMount() {
    const ctx = this.chartRef.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
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
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  render() {
    return (
      <div>
        <canvas ref={(ref) => this.chartRef = ref} id="myChart" width="400" height="190"></canvas>
      </div>
    );
  }
}
