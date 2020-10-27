import { html, css, LitElement } from 'lit-element';

export class VideoElement extends LitElement {
  static get styles() {
    return css`
      main {
        text-align: center;
      }
    `;
  }

  static get properties() {
    return {
      identifier: { type: String },
    };
  }

  render() {
    return html`
      <main>
        <iframe
          frameborder="0"
          src="https://archive.org/embed/${this.identifier}"
          width="640"
          height="480"
          frameborder="0"
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          allowfullscreen
        ></iframe>
      </main>
    `;
  }
}
