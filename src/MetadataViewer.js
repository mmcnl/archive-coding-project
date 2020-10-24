import { html, css, LitElement } from 'lit-element';

export class MetadataViewer extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--metadata-viewer-text-color, #000);
      }
    `;
  }

  static get properties() {
    return {
      counter: { type: Number },
      item: { type: String },
    };
  }

  constructor() {
    super();
    this.counter = 5;
  }

  __increment() {
    this.counter += 1;
  }

  render() {
    return html`
      <h2>${this.item} Nr. ${this.counter}!</h2>
      <button @click=${this.__increment}>increment</button>
    `;
  }
}
