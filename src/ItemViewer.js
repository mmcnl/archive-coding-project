import { html, css, LitElement } from 'lit-element';

export class ItemViewer extends LitElement {
  static get styles() {
    return css``;
  }

  static get properties() {
    return {
      identifier: { type: String, reflect: true },
      data: { type: Object },
    };
  }

  get identifier() {
    return this._identifier;
  }

  set identifier(value) {
    this._identifier = value;
    this.fetchData();
  }

  async fetchData() {
    if (!this.identifier) {
      this.data = null;
      return;
    }
    const url = `https://archive.org/metadata/${this.identifier}`;
    // const url = './test/fixtures/metadata.json';

    try {
      const response = await fetch(url);
      const json = await response.json();
      this.data = json;
    } catch {
      console.error(`could not load metadata from ${url}`);
    }
  }

  render() {
    if (!this.identifier || !this.data) {
      return html`<p>No data loaded</p>`;
    }

    const md = this.data.metadata;
    return html`
      <main>
        <video-element .identifier=${this.identifier}></video-element>

        <h2 class="item-title">${md.title}</h2>

        ${/* featured pairs */ [
          'date',
          'licenseurl',
          'subject',
          'publisher',
          'sponsor',
        ].map(k => {
          return html` <metadata-pair .key=${k}> ${md[k]} </metadata-pair> `;
        })}

        <p class="item-description">${md.description}</p>

        ${/* additional pairs */ [
          'addeddate',
          'closed_captioning',
          'collectionid',
          'color',
          'identifier',
          'numeric_id',
          'proddate',
          'runtime',
          'sound',
          'type',
        ].map(k => {
          return html` <metadata-pair .key=${k}> ${md[k]} </metadata-pair> `;
        })}

        <item-reviews .reviews=${this.data.reviews}></item-reviews>
      </main>
    `;
  }
}
