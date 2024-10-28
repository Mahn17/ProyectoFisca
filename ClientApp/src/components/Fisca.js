import React, { Component } from 'react';
import './Fisca.css';

export class Fisca extends Component {
  static displayName = Fisca.name;

  constructor(props) {
    super(props);
    this.state = { pdfData: [], loading: true };
  }

  componentDidMount() {
    this.fetchPdfContent();
  }

  async fetchPdfContent() {
    try {
      const response = await fetch('/LectorPdf');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      this.setState({ pdfData: data, loading: false });
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      this.setState({ pdfData: [], loading: false });
    }
  }

  render() {
    const { loading, pdfData } = this.state;

    let contents = loading ? (
      <p className="loading-text"><em>Loading...</em></p>
    ) : (
      <table className="pdf-table">
        <thead>
          <tr>
            <th>Entidad</th>
            <th>Municipio</th>
            <th>Número de Muertos</th>
            <th>Hombre</th>
            <th>Mujer</th>
          </tr>
        </thead>
        <tbody>
          {pdfData.map((row, index) => (
            <tr key={index}>
              <td>{row.entidad}</td>
              <td>{row.municipio}</td>
              <td>{row.noMuertos}</td>
              <td>{row.hombre}</td>
              <td>{row.mujer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );

    return (
      <div className="fisca-container">
        <h1 id="tableLabel" className="pdf-title">Contenido del PDF</h1>
        <p className="pdf-description">Índice de homicidios por estado.</p>
        {contents}
      </div>
    );
  }
}

