import React, { Component } from 'react';

export class Fisca extends Component {
  static displayName = Fisca.name;

  constructor(props) {
    super(props);
    this.state = { pdfContent: '', loading: true };
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
      const text = await response.text();
      console.log(text);
      this.setState({ pdfContent: text, loading: false });
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      this.setState({ pdfContent: 'Error loading PDF content', loading: false });
    }
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : <pre>{this.state.pdfContent}</pre>;

    return (
      <div>
        <h1 id="tableLabel">Contenido del PDF</h1>
        <p>Para ver a los muertos</p>
        {contents}
      </div>
    );
  }
}
