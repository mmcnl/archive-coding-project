import { html, css, LitElement } from 'lit-element';

export class MetadataPair extends LitElement {
  static get styles() {
    return css`
      a {
        color: #428bca;
        text-decoration: none;
      }
      dl {
        font-weight: 200;
        font-size: 16px;
        color: #333;
        margin: 0;
        line-height: 1.4;
      }
      dd,
      dt {
        display: inline-block;
        margin: 0;
      }
      dt {
        width: 33%;
      }
      dd {
        color: #aaa;
      }
    `;
  }

  static get properties() {
    return {
      key: { type: String },
    };
  }

  getLabelForKey() {
    switch (this.key) {
      case 'licenseurl':
        return 'Usage';
      case 'date':
        return 'Publication Date';
      case 'sponsor':
        return 'Digitizing Sponsor';
      case 'subject':
        return 'Topics';
      default:
        return this.key[0].toUpperCase() + this.key.slice(1);
    }
  }

  formatValue() {
    switch (this.key) {
      case 'licenseurl':
        return this.usage();
      case 'date':
        return this.pubDate();
      case 'subject':
        return this.topics();
      default:
        return this.textContent;
    }
  }

  usage() {
    return 'usage link';
  }

  pubDate() {
    return 'pub date link';
  }

  topics() {
    return this.textContent.split(';')?.map(topic => {
      return html`
        <a
          href="https://archive.org/search.php?query=${encodeURIComponent(
            `subject: "${topic}"`
          )}"
          >${topic}</a
        >
      `;
    });
  }

  render() {
    if (!this.textContent) {
      return;
    }

    return html`
      <dl>
        <dt>${this.getLabelForKey()}</dt>
        <dd>${this.formatValue()}</dd>
      </dl>
    `;
  }
}
