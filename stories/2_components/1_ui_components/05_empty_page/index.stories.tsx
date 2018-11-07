import { RenderFunction, storiesOf } from '@storybook/react';
import * as React from 'react';
import { EmptyPage } from '../../../../src';
import { injectTheme } from '../../../decorators';

export default storiesOf('2.1.5 Empty Page', module)
  .addDecorator((story: RenderFunction) => {
    return (
      injectTheme(story)
    );
  })
  //
  .add('EmptyPage', (() => {
    return (
      <EmptyPage
      />
    );
  }
  ))
  //
  ;
