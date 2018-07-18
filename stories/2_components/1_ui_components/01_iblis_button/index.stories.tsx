import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { RenderFunction, storiesOf } from '@storybook/react';
import * as React from 'react';
import { IblisButton } from '../../../../src';
import { injectTheme } from '../../../decorators';

export default storiesOf('2.1.1 Iblis Button', module)
  .addDecorator((story: RenderFunction) => {
    return (
      injectTheme(story)
    );
  })
  //
  .add('IblisButton', withInfo({ source: true })(() => (
    <IblisButton
      buttonType={'primary'}
      buttonLabel={'Iblis'}
      onClick={action('Button Clicked')}
    />
  )))
  //
  .add('Default Button', (() => (
    <IblisButton
      buttonType={'default'}
      buttonLabel={'Iblis'}
      onClick={action('Button Clicked')}
    />
  )))
  //
  .add('Disabled Primary Button', (() => (
    <IblisButton
      disabled={true}
      buttonType={'primary'}
      buttonLabel={'Iblis'}
      onClick={action('Button Clicked')}
    />
  )))
  //
  .add('Disabled Default Button', (() => (
    <IblisButton
      disabled={true}
      buttonType={'default'}
      buttonLabel={'Iblis'}
      onClick={action('Button Clicked')}
    />
  )))
  //
  .add('Loading Primary Button', (() => (
    <IblisButton
      isLoading={true}
      buttonType={'primary'}
      buttonLabel={'Iblis'}
      onClick={action('Button Clicked')}
    />
  )))
  //
  .add('Loading Default Button', (() => (
    <IblisButton
      isLoading={true}
      buttonType={'default'}
      buttonLabel={'Iblis'}
      onClick={action('Button Clicked')}
    />
  )))
  //
  ;
