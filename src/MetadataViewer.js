import { html, css, LitElement } from 'lit-element';

export class MetadataViewer extends LitElement {
  static get styles() {
    return css``;
  }

  static get properties() {
    return {
      id: { type: String },
      loaded: { type: Boolean },
      metadata: { type: Object },
    };
  }

  constructor() {
    super();
    this.fetchMetadata();
  }

  async fetchMetadata() {
    const response = await fetch('./test/fixtures/metadata.json');
    const json = await response.json();
    this.metadata = json.metadata;
    this.loaded = true;
  }

  render() {
    if (!this.loaded) {
      return html`Loading...`;
    }
    const md = this.metadata;
    return html`
      <main>
        <h2>${this.id}</h2>

        <div class="title">${md.title}</div>
        <div class="description">${md.description}</div>

        <p>${md.publisher}</p>
      </main>
    `;
  }
}
