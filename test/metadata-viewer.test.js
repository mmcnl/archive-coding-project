import { html, fixture, expect, waitUntil, aTimeout } from '@open-wc/testing';
import '../metadata-viewer.js';

describe('MetadataViewer', () => {
  it('shows the correct metadata', async () => {
    const el = await fixture(
      html` <metadata-viewer identifier="InformationM"></metadata-viewer> `
    );
    await waitUntil(() => el.metadata);

    const title = el.shadowRoot.querySelector('main .title');
    expect(title.innerText).to.equal('Information Machine, The');

    const description = el.shadowRoot.querySelector('main .description');
    expect(description.innerText.slice(0, 20)).to.equal('Applies graphic sens');
  });

  it('shows a message if there is no metadata available', async () => {
    const el = await fixture(html` <metadata-viewer></metadata-viewer> `);
    await aTimeout(10);

    expect(el.shadowRoot.querySelector('p').innerText).to.equal(
      'No metadata loaded'
    );
  });
});
