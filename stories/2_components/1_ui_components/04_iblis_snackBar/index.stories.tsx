import { action } from '@storybook/addon-actions';
import { RenderFunction, storiesOf } from '@storybook/react';
import * as React from 'react';
import { IblisSnackbar } from '../../../../src';
import { injectTheme } from '../../../decorators';

export default storiesOf('2.1.4 Iblis SnackBar', module)
  .addDecorator((story: RenderFunction) => {
    return (
      injectTheme(story)
    );
  })
  //
  .add('IblisSnackbar', (() => (
    <IblisSnackbar
      isError={true}
      errorText={'Error occurs, we will fixed it soon'}
      hide={action('Be Hidden')}
    />
  )))
  //
  .add('Hide Snackbar', (() => (
    <IblisSnackbar
      isError={false}
      errorText={'Error occurs, we will fixed it soon'}
      hide={action('Be Hidden')}
    />
  )))
  //
  ;
