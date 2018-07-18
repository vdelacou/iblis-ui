import { withInfo } from '@storybook/addon-info';
import { RenderFunction, storiesOf } from '@storybook/react';
import * as React from 'react';
import { CardTitleLayout } from '../../../src';
import { injectTheme } from '../../decorators';

export default storiesOf('1.3 Card With Title Layout', module)
  .addDecorator((story: RenderFunction) => {
    return (
      injectTheme(story)
    );
  })
  //
  .add('CardTitleLayout', withInfo({ source: true })(() => (
    <CardTitleLayout title={'Account'}>
      {'Place Content Here'}
    </CardTitleLayout>
  )))
  //
  ;
