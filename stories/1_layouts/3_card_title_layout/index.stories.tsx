import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { RenderFunction, storiesOf } from '@storybook/react';
import { Publish } from 'mdi-material-ui';
import * as React from 'react';
import { CardTitleLayout, IblisButton } from '../../../src';
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
  .add('Card Title Layout With Button', withInfo({ source: true })(() => (
    <CardTitleLayout
      title={'Account'}
      rightComponent={<IblisButton onClick={action('Button Clicked')} buttonLabel={'Publish'} buttonType={'primary'} icon={<Publish />} />}
    >
      {'Place Content Here'}
    </CardTitleLayout>
  )))
  //
  ;
