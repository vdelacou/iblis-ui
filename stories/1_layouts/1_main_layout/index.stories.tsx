import { AccountBox, AccountCircle, Archive, Home, PowerSettingsNew, Receipt, Settings } from '@material-ui/icons';
import { action } from '@storybook/addon-actions';
import { RenderFunction, storiesOf } from '@storybook/react';
import * as React from 'react';
import { AccountCard, AccountMenu, FooterMenu, FooterMenuLevelProps, FooterMenuProps, MainLayout, MainMenu, MainMenuProps } from '../../../src';
import { injectThemeWithoutLimitWidth } from '../../decorators';

const menu = [
  {
    firstLevel: { name: 'Home', action: action('Home clicked'), icon: < Home /> },
    sublevel: [
      { name: 'Expenses', action: action('Expenses clicked'), icon: < Receipt /> },
      { name: 'Report', action: action('Report clicked'), icon: <Archive /> },
    ],
  },
  {
    firstLevel: { name: 'Account', action: action('Account clicked'), icon: <AccountCircle /> },
    sublevel: [
      { name: 'My Account', action: action('My Account clicked'), icon: < AccountBox /> },
      { name: 'Settings', action: action('Settings clicked'), icon: <Settings /> },
    ],
  },
];

const accountComponent = (
  <AccountCard
    avatarUrl="https://pickaface.net/gallery/avatar/unr_alberteinstein_161028_1839_7f2a2to8.png"
    email="albert@einstein.com"
    firstName="albert"
    lastName="einstein"
    buttonText="My Account"
    buttonAction={action('Button Card Clicked')}
  />);

const accountMenuComponent = (
  <AccountMenu
    accountComponent={accountComponent}
    accountMenu={menu[1].sublevel}
    signOutText="Sign Out"
    signOutIcon={<PowerSettingsNew />}
    signOutAction={action('Sign out clicked')}
  />
);

const mainMenuProps: MainMenuProps = {
  mainTitle: 'Iblis',
  mainTitleAction: action('Main Title clicked'),
  menu: menu,
  firstLevelActive: 0,
  secondLevelActive: 0,
  lastMenuComponent: accountMenuComponent,
};

const mainMenu = (
  <MainMenu {...mainMenuProps} />
);

const footerMenuLevelProps: FooterMenuLevelProps[] = [
  { name: 'Home', action: action('Home Clicked') },
  { name: 'Legal & Privacy', action: action('Legal & Privacy Clicked') },
];

const footerMenuProps: FooterMenuProps = {
  rightText: `© ${new Date().getFullYear()} Iblis`,
  menu: footerMenuLevelProps,
};

export default storiesOf('1.1 Main Layout', module)
  // decorators
  .addDecorator((story: RenderFunction) => {
    return (
      injectThemeWithoutLimitWidth(story)
    );
  })
  //
  .add('MainLayout', (() => (
    <MainLayout
      menuComponent={mainMenu}
      footerComponent={(<FooterMenu {...footerMenuProps} />)}
    >
      <div>Place Content Here</div>
    </MainLayout>
  )))
  //
  .add('Layout with content height more than windows', (() => (
    <MainLayout
      menuComponent={mainMenu}
      footerComponent={(<FooterMenu {...footerMenuProps} />)}
    >
      <div style={{ height: '130vh' }}>Place Content Here</div>
    </MainLayout>
  )))
  //
  ;
