import { html, css, LitElement } from 'lit-element';

export class ItemViewer extends LitElement {
  constructor() {
    super();
    this.featuredPairs = [
      'date',
      'licenseurl',
      'subject',
      'publisher',
      'sponsor',
    ];
    this.additionalPairs = [
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
    ];
  }
  static get styles() {
    return css`
      main {
        background-color: white;
        color: #333;
        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
      }
      .grid {
        margin: 0 auto;
        max-width: 1200px;
        display: grid;
        grid-template-columns: 2fr 1fr;
        grid-template-areas: 'left right';
      }
      .metadata {
        grid-area: left;
        padding: 0 2rem 1rem;
      }
      .related {
        grid-area: right;
        background-color: hsla(0, 0%, 85%, 0.33);
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.33);
        border-radius: 1px;
        padding: 0 1rem;
        margin: 1rem;
      }
      .related h3 {
        color: #444;
        font-size: 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        padding-bottom: 0.2rem;
        margin: 1rem auto;
      }
      .item-title {
        font-size: 34px;
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
      item: { type: Object },
      related: { type: Object },
    };
  }

  get identifier() {
    return this._identifier;
  }

  set identifier(value) {
    this._identifier = value;
    this.fetchRemoteData();
  }

  async fetchRemoteData() {
    if (!this.identifier) {
      this.item = null;
      return;
    }
    const dataSources = {
      item: `https://archive.org/metadata/${this.identifier}`,
      related: `https://be-api.us.archive.org/mds/v1/get_related/all/${this.identifier}`,
    };
    // const dataSources = {
    //   item: './test/fixtures/metadata.json',
    //   related: './test/fixtures/related.json',
    // };
    for (const [dataType, url] of Object.entries(dataSources)) {
      try {
        const response = await fetch(url);
        const json = await response.json();
        this[dataType] = json;
      } catch {
        console.error(`could not load ${dataType} data from ${url}`);
      }
    }
  }

  pairsHtml(pairs) {
    const md = this.item.metadata;
    return pairs.map(
      k => html`<metadata-pair .key=${k} .value=${md[k]}></metadata-pair>`
    );
  }

  render() {
    if (!this.identifier || !this.item) {
      return html`<p>No item loaded</p>`;
    }
    const md = this.item.metadata;
    return html`
      <main>
        <div class="video">
          <video-element .identifier=${this.identifier}></video-element>
        </div>

        <div class="grid">
          <div class="metadata">
            <h2 class="item-title">${md.title}</h2>

            ${this.pairsHtml(this.featuredPairs)}

            <p class="item-description">${md.description}</p>

            ${this.pairsHtml(this.additionalPairs)}

            <item-reviews .reviews=${this.item.reviews}></item-reviews>
          </div>

          <div class="related">
            <related-items .items=${this.related?.hits?.hits}></related-items>
          </div>
        </div>
      </main>
    `;
  }
}
