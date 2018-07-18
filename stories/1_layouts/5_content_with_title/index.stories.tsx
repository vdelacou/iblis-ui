import { withInfo } from '@storybook/addon-info';
import { RenderFunction, storiesOf } from '@storybook/react';
import * as React from 'react';
import { ContentWithTitle } from '../../../src';
import { injectTheme } from '../../decorators';

export default storiesOf('1.5 Content With Title Layout', module)
  .addDecorator((story: RenderFunction) => {
    return (
      injectTheme(story)
    );
  })
  //
  .add('ContentWithTitle', withInfo({ source: true })(() => (
    <ContentWithTitle
      title={'Change password'}
    >
      {'Place Content Here'}
    </ContentWithTitle>
  )))
  //
  ;
