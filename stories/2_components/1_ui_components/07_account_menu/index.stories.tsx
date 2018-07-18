import { PowerSettingsNew, Receipt, Settings } from '@material-ui/icons';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { RenderFunction, storiesOf } from '@storybook/react';
import * as React from 'react';
import { AccountCard, AccountMenu, AccountMenuLevelProps } from '../../../../src';
import { injectTheme } from '../../../decorators';

export default storiesOf('2.1.7 Account Menu', module)
  .addDecorator((story: RenderFunction) => {
    return (
      injectTheme(story)
    );
  })
  //
  .add('AccountMenu', withInfo({ source: true })(() => {
    const accountMenu: AccountMenuLevelProps[] = [
      { name: 'Billing', action: action('Billing clicked'), icon: <Receipt /> },
      { name: 'Settings', action: action('Settings clicked'), icon: <Settings /> },
    ];
    const accountComponent = (
      <AccountCard
        avatarUrl="https://pickaface.net/gallery/avatar/unr_alberteinstein_161028_1839_7f2a2to8.png"
        email="albert@einstein.com"
        firstName="albert"
        lastName="einstein"
        buttonText="My Account"
        buttonAction={action('Button Clicked')}
      />);
    return (
      <AccountMenu
        accountComponent={accountComponent}
        accountMenu={accountMenu}
        signOutText="Sign Out"
        signOutIcon={<PowerSettingsNew />}
        signOutAction={action('Sign out clicked')}
      />
    );
  }
  ))
  //
  .add('With no menu', (() => {
    const accountComponent = (
      <AccountCard
        avatarUrl="https://pickaface.net/gallery/avatar/unr_alberteinstein_161028_1839_7f2a2to8.png"
        email="albert.einstein@pattern-bern-office.com"
        firstName="albert"
        lastName="einstein"
        buttonText="My Account"
        buttonAction={action('Button Clicked')}
      />);
    return (
      <AccountMenu
        accountComponent={accountComponent}
        signOutText="Sign Out"
        signOutIcon={<PowerSettingsNew />}
        signOutAction={action('Sign out clicked')}
      />
    );
  }
  ))
  //
  ;
