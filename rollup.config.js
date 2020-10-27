import merge from 'deepmerge';
import { createSpaConfig } from '@open-wc/building-rollup';

const baseConfig = createSpaConfig({
  outputDir: 'docs',
  developmentMode: process.env.ROLLUP_WATCH === 'true',
  workbox: false,
});

export default merge(baseConfig, {
  // if you use createSpaConfig, you can use your index.html as entrypoint,
  // any <script type="module"> inside will be bundled by rollup
  input: './index.html',
});
