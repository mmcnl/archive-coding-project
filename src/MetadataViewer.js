import { html, css, LitElement } from 'lit-element';

export class MetadataViewer extends LitElement {
  static get styles() {
    return css``;
  }

  static get properties() {
    return {
      identifier: { type: String, reflect: true },
      metadata: { type: Object },
    };
  }

  get identifier() {
    return this._identifier;
  }

  set identifier(value) {
    this._identifier = value;
    this.fetchMetadata();
  }

  async fetchMetadata() {
    // const url = `https://archive.org/metadata/${this.identifier}`;
    const url = './test/fixtures/metadata.json';

    try {
      const response = await fetch(url);
      const json = await response.json();
      this.metadata = json.metadata;
    } catch {
      console.error(`could not load metadata from ${url}`);
    }
  }

  render() {
    if (!this.identifier || !this.metadata) {
      return html`No metadata loaded`;
    }
    const md = this.metadata;
    return html`
      <main>
        <h2>${this.identifier}</h2>

        <div class="title">${md.title}</div>

        <p class="description">${md.description}</p>

        <p>${md.publisher}</p>
      </main>
    `;
  }
}
