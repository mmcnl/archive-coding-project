import { html, fixture, expect } from '@open-wc/testing';

import '../metadata-viewer.js';

describe('MetadataViewer', () => {
  it('increases the counter on button click', async () => {
    const el = await fixture(html` <metadata-viewer></metadata-viewer> `);
    el.shadowRoot.querySelector('button').click();

    expect(el.counter).to.equal(6);
  });

  it('can override the item via attribute', async () => {
    const el = await fixture(html`
      <metadata-viewer item="test_item"></metadata-viewer>
    `);

    expect(el.item).to.equal('test_item');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(html` <metadata-viewer></metadata-viewer> `);

    await expect(el).shadowDom.to.be.accessible();
  });
});
