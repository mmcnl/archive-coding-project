import { html, fixture, expect, waitUntil, aTimeout } from '@open-wc/testing';
import fetchMock from 'fetch-mock/esm/client';

// import all custom elements
import '../index.js';

// JSON responses to use for mocked API requests
import itemApiResponse from '../test/fixtures/item.js';
import relatedApiResponse from '../test/fixtures/related.js';

fetchMock.sticky('https://archive.org/metadata/InformationM', itemApiResponse);
fetchMock.sticky(
  'https://be-api.us.archive.org/mds/v1/get_related/all/InformationM',
  relatedApiResponse
);

describe('ItemViewer', () => {
  it('shows a message if no identifier was provided', async () => {
    const el = await fixture(html` <item-viewer></item-viewer> `);
    await aTimeout(10);

    expect(el.shadowRoot.querySelector('p').innerText).to.equal(
      'No item loaded'
    );
  });

  it('shows info for the item requested by the given identifier', async () => {
    const el = await fixture(
      html` <item-viewer identifier="InformationM"></item-viewer> `
    );
    await waitUntil(() => el.item);

    const title = el.shadowRoot.querySelector('.item-title');
    expect(title.innerText).to.equal('Information Machine, The');

    const description = el.shadowRoot.querySelector('.item-description');
    expect(description.innerText.slice(0, 20)).to.equal('Applies graphic sens');
  });

  it('shows items similar to the requested item', async () => {
    const el = await fixture(
      html` <item-viewer identifier="InformationM"></item-viewer> `
    );
    await waitUntil(() => el.item);

    const relatedTitles = Array.from(
      el.shadowRoot
        .querySelector('related-items')
        .shadowRoot.querySelectorAll('.item .title')
    ).map(e => e.innerText);

    expect(relatedTitles[5]).to.equal(
      'Computer : a history of the information machine'
    );

    const downloadCounts = Array.from(
      el.shadowRoot
        .querySelector('related-items')
        .shadowRoot.querySelectorAll('.item .downloads')
    ).map(e => e.innerText);

    expect(downloadCounts[5]).to.equal('77 views');
  });
});
