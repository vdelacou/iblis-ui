import { action } from '@storybook/addon-actions';
import { RenderFunction, storiesOf } from '@storybook/react';
import * as React from 'react';
import { FooterMenu, FooterMenuLevelProps, FooterMenuProps } from '../../../../src';
import { injectThemeWithoutLimitWidth } from '../../../decorators';

const footerMenuLevelProps: FooterMenuLevelProps[] = [
  { name: 'Home', action: action('Home Clicked') },
  { name: 'Legal & Privacy', action: action('Legal & Privacy Clicked') },
];

const footerMenuProps: FooterMenuProps = {
  rightText: `© ${new Date().getFullYear()} Iblis`,
  menu: footerMenuLevelProps,
};

export default storiesOf('2.1.8 Footer Menu', module)
  .addDecorator((story: RenderFunction) => {
    return (
      injectThemeWithoutLimitWidth(story)
    );
  })
  //
  .add('FooterMenu', (() => {
    return (
      <FooterMenu {...footerMenuProps} />
    );
  }
  ))

  ;
