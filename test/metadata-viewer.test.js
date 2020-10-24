import { html, fixture, expect, waitUntil } from '@open-wc/testing';
import '../metadata-viewer.js';

describe('MetadataViewer', () => {
  it('shows the correct metadata', async () => {
    const el = await fixture(
      html` <metadata-viewer id="InformationM"></metadata-viewer> `
    );
    await waitUntil(() => el.loaded);

    const title = el.shadowRoot.querySelector('main .title');
    expect(title.innerText).to.equal('Information Machine, The');

    const description = el.shadowRoot.querySelector('main .description');
    expect(description.innerText.slice(0, 20)).to.equal('Applies graphic sens');
  });
});
