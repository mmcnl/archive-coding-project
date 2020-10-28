import { html, css, LitElement } from 'lit-element';

export class RelatedItems extends LitElement {
  static get styles() {
    return css`
      h3 {
        font-size: 22px;
        border-bottom: 1px solid gray;
        font-weight: 200;
        margin-bottom: 1rem;
        margin-top: 0.8rem;
        text-transform: uppercase;
      }
      .item {
        font-size: 14px;
        margin-bottom: 1rem;
      }
      a {
        color: inherit;
        text-decoration: none;
      }
      .title {
        font-weight: 500;
        margin-bottom: 0.5rem;
      }
      .downloads {
        font-size: 12px;
      }
    `;
  }

  static get properties() {
    return {
      items: { type: Array },
    };
  }

  render() {
    return html`
      <main>
        <h3>Similar Items</h3>

        ${this.items?.map(item => {
          return html`
            <div class="item">
              <a href="./?identifier=${item._id}">
                <div class="title">${item._source.title}</div>
                <image src="https://archive.org/services/img/${item._id}" />
              </a>
              <div class="downloads">${item._source.downloads} views</div>
            </div>
          `;
        })}
      </main>
    `;
  }
}
