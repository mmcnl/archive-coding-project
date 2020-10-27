import { html, css, LitElement } from 'lit-element';

export class ItemReviews extends LitElement {
  static get styles() {
    return css`
      h3 {
        border-bottom: 1px solid gray;
      }
      .review {
        margin: 1em;
      }
      label {
        font-weight: bold;
      }
    `;
  }

  static get properties() {
    return {
      reviews: { type: Array },
    };
  }

  formatDate(str) {
    return new Date(str).toDateString().split(' ').slice(1).join(' ');
  }

  connectedCallback() {
    super.connectedCallback();
    this.reviews = [...this.reviews].sort(
      (a, b) => -a.reviewdate.localeCompare(b.reviewdate)
    );
  }

  render() {
    return html`
      <main>
        <h3>Reviews</h3>

        ${this.reviews?.map(r => {
          return html`
            <div class="review">
              <div>
                <label>Reviewer:</label>
                <a href="#">${r.reviewer}</a>
                <span class="stars">${'★'.repeat(r.stars)}</span>
                <span class="date">${this.formatDate(r.reviewdate)}</span>
              </div>

              <div class="title">
                <label>Subject:</label>
                <span class="text">${r.reviewtitle}</span>
              </div>

              <div class="body">${r.reviewbody}</div>
            </div>
          `;
        })}
      </main>
    `;
  }
}