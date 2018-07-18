import { setOptions } from '@storybook/addon-options';
import { configure } from '@storybook/react';

// automatically import all files ending in *.stories.tsx
const req = require.context('../stories', true, /.stories.tsx$/);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

setOptions({
  name: 'Iblis UI',
  url: 'https://github.com/vdelacou/iblis-ui',
});

configure(loadStories, module);
