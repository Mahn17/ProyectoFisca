import React, { Component } from 'react';
import { Chart } from 'chart.js/auto';
  
export class Graphs extends Component {
  static displayName = Graphs.name;

  async fetchPdfContent() {
    try {
      const response = await fetch('https://localhost:44497/LectorPdf'); // URL del backend
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
  
      // Actualizar el estado con los datos recibidos
      this.setState({ 
        pdfData: data.map(item => ({
          entidad: item.entidad,
          noMuertos: item.total_muertos
        })), 
        loading: false 
      }, () => {
        this.createCharts();
      });
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      this.setState({ pdfData: [], loading: false });
    }
  }
  

  //Constructor de la tabla de datos(cambiar por lectura de base de datos)
  constructor(props) {
    super(props);
    this.state = {
      pdfData: [], // Datos desde la base de datos
      loading: true,
    };

    // Guardar cada instancia de gráfico
    this.charts = {};
  }

  //Creacion inicial de todos graficos
  componentDidMount() {
    this.fetchPdfContent();
  }

  //Lectura de datos del PDF
  async fetchPdfContent() {
    try {
      const response = await fetch('/LectorPdf');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      // Actualizar estado y crear gráficos después de cargar los datos
      this.setState({ pdfData: data, loading: false }, () => {
        this.createCharts();
      });
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      this.setState({ pdfData: [], loading: false });
    }
  }

  //Creacion individual de graficos
  createCharts() {
    this.createChart(this.barChartRef, 'bar', 'barChart');
    this.createChart(this.lineChartRef, 'line', 'lineChart');
    this.createChart(this.radarChartRef, 'radar', 'radarChart');
    this.createChart(this.sideBarChartRef, 'bar', 'sideBarChart');
  }

  //Destruccion de Graficos
  componentWillUnmount() {
    Object.values(this.charts).forEach(chart => {
      if (chart) chart.destroy();
    });
  }

  createChart(ref, type, chartName) {
    if (!ref) return;
    if (this.charts[chartName]) {
      this.charts[chartName].destroy();
    }

    const ctx = ref.getContext('2d');
    const { pdfData } = this.state;
    
    // Configurar datos para los gráficos
    const chartData = {
      labels: pdfData.map(item => item.entidad), // Usar "entidad" como etiquetas
      datasets: [{
        label: '# de muertes',
        data: pdfData.map(item => (item.num_Muertos)), // Usar "total_muertos" como datos
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      }],
    };

    this.charts[chartName] = new Chart(ctx, {
      type: type,
      data: chartData,
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

  //Renderizacion de Graficos
  render() {
    return (
      <div>
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
        
        {/* Resto de las Graficas.*/}
        <div style={{
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: '10px'
        }}>
          <div style={{ width: '75%', height: '500px' }}>
            <canvas ref={(ref) => this.radarChartRef = ref} />
          </div>
          <div style={{ width: '50%', height: '300px' }}>
            <canvas ref={(ref) => this.sideBarChartRef = ref} />
          </div>
        </div>
      </div>
    );
  }
}