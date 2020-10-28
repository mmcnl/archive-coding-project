import { html, css, LitElement } from 'lit-element';
import { nothing } from 'lit-html';

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
        min-width: 25%;
        vertical-align: top;
      }
      dd {
        color: #aaa;
        max-width: 74%;
      }
    `;
  }

  static get properties() {
    return {
      key: { type: String },
      value: { type: Object },
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
        return this.value;
    }
  }

  usage() {
    if (this.value === 'http://creativecommons.org/licenses/publicdomain/') {
      return html` <a href="${this.value}"> Public Domain </a>`;
    } else if (this.value.startsWith('http')) {
      return html` <a href="${this.value}"> License </a>`;
    }
    return this.value;
  }

  pubDate() {
    return html`
      <a href="https://archive.org/search.php?query=date:${this.value}">
        ${this.value}
      </a>
    `;
  }

  topics() {
    let content;
    if (typeof this.value.map === 'function') {
      content = this.value;
    } else {
      content = this.value.split(/[;]/).filter(item => item);
    }
    // lit-html doesn't support join so simulate it using this approach
    // https://github.com/Polymer/lit-html/issues/1131#issuecomment-603971243
    return html`${this.join(
      content.map(topic => this.topicLink(topic.trim())),
      ', '
    )}`;
  }

  topicLink(topic) {
    return html` <a
      href="https://archive.org/search.php?query=${encodeURIComponent(
        `subject: "${topic}"`
      )}"
      >${topic}</a
    >`;
  }

  // see https://github.com/Polymer/lit-html/issues/1131#issuecomment-603971243
  join(values, joiner) {
    return values.map((v, i) => [v, i < values.length - 1 ? joiner : nothing]);
  }

  render() {
    if (!this.value) {
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
