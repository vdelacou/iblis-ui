import { action } from '@storybook/addon-actions';
import { RenderFunction, storiesOf } from '@storybook/react';
import * as React from 'react';
import { AccountCard } from '../../../../src';
import { injectTheme } from '../../../decorators';

export default storiesOf('2.1.6 Account Card', module)
  .addDecorator((story: RenderFunction) => {
    return (
      injectTheme(story)
    );
  })
  //
  .add('AccountCard', (() => {
    return (
      <AccountCard
        avatarUrl="https://pickaface.net/gallery/avatar/unr_alberteinstein_161028_1839_7f2a2to8.png"
        email="albert@einstein.com"
        firstName="albert"
        lastName="einstein"
        buttonText="My Account"
        buttonAction={action('Button Clicked')}
      />
    );
  }
  ))
  //
  .add('With email, pic', (() => {
    return (
      <AccountCard
        avatarUrl="https://pickaface.net/gallery/avatar/unr_alberteinstein_161028_1839_7f2a2to8.png"
        email="albert@einstein.com"
        buttonText="My Account"
        buttonAction={action('Button Clicked')}
      />
    );
  }
  ))
  //
  .add('With email, pic, firstName', (() => {
    return (
      <AccountCard
        avatarUrl="https://pickaface.net/gallery/avatar/unr_alberteinstein_161028_1839_7f2a2to8.png"
        email="albert@einstein.com"
        firstName="albert"
        buttonText="My Account"
        buttonAction={action('Button Clicked')}
      />
    );
  }
  ))
  //
  .add('With email, pic, lastName', (() => {
    return (
      <AccountCard
        avatarUrl="https://pickaface.net/gallery/avatar/unr_alberteinstein_161028_1839_7f2a2to8.png"
        email="albert@einstein.com"
        lastName="einstein"
        buttonText="My Account"
        buttonAction={action('Button Clicked')}
      />
    );
  }
  ))
  //
  .add('With email only', (() => {
    return (
      <AccountCard
        email="albert@einstein.com"
        buttonText="My Account"
        buttonAction={action('Button Clicked')}
      />
    );
  }
  ))
  //
  ;
