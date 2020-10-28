import { html, css, LitElement } from 'lit-element';

export class ItemReviews extends LitElement {
  static get styles() {
    return css`
      h3 {
        font-size: 32px;
        border-bottom: 1px solid gray;
        font-weight: 200;
        margin-bottom: 1rem;
      }
      .review {
        font-size: 14px;
        margin-bottom: 1rem;
      }
      label {
        font-weight: bold;
      }
      .title {
        margin-bottom: 0.5rem;
      }
      .stars {
        font-size: 80%;
      }
      a {
        color: #428bca;
        text-decoration: none;
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
    if (this.reviews && typeof this.reviews.map === 'function') {
      this.sortReviews();
    }
  }

  sortReviews() {
    this.reviews = [...this.reviews].sort(
      (a, b) => -a.reviewdate.localeCompare(b.reviewdate)
    );
  }

  render() {
    if (typeof this.reviews !== 'object') {
      return;
    }
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
