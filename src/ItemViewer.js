import { html, css, LitElement } from 'lit-element';

export class ItemViewer extends LitElement {
  static get styles() {
    return css`
      main {
        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
        color: #333;
        background-color: white;
      }
      .grid-container {
        margin: 0 auto;
        max-width: 1200px;
        display: grid;
        grid-template-columns: 2fr 1fr;
        grid-template-areas: 'a b';
      }
      .metadata,
      .related {
        padding: 0 2em;
      }
      .metadata {
        grid-area: a;
      }
      .related {
        grid-area: b;
        background-color: hsla(0, 0%, 85%, 0.33);
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.33);
        padding: 0 1rem;
        margin: 1rem;
      }
      .related h3 {
        color: #444;
        margin: 1rem auto;
        font-size: 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        padding-bottom: 0.2rem;
        border-radius: 2px;
      }
      .item-title {
        font-size: 30px;
        font-weight: 500;
      }
      .item-description {
        font-size: 14px;
      }
    `;
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
    // const url = `https://archive.org/metadata/${this.identifier}`;
    const url = './test/fixtures/metadata.json';

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
        <div class="video">
          <video-element .identifier=${this.identifier}></video-element>
        </div>
        <div class="grid-container">
          <div class="metadata">
            <h2 class="item-title">${md.title}</h2>
            ${/* featured pairs */ [
              'date',
              'licenseurl',
              'subject',
              'publisher',
              'sponsor',
            ].map(k => {
              return html`
                <metadata-pair .key=${k}> ${md[k]} </metadata-pair>
              `;
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
              return html`
                <metadata-pair .key=${k}> ${md[k]} </metadata-pair>
              `;
            })}

            <item-reviews .reviews=${this.data.reviews}></item-reviews>
          </div>
          <div class="related">
            <h3>SIMILAR ITEMS</h3>
          </div>
        </div>
      </main>
    `;
  }
}
