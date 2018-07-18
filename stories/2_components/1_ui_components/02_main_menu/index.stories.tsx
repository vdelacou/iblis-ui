
import { AccountBox, AccountCircle, Archive, Home, PowerSettingsNew, Receipt, Settings } from '@material-ui/icons';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { RenderFunction, storiesOf } from '@storybook/react';
import * as React from 'react';
import { AccountCard, AccountMenu, MainMenu, MainMenuProps } from '../../../../src';
import { injectThemeWithoutLimitWidth } from '../../../decorators';

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

export default storiesOf('2.1.2 Main Menu', module)
  .addDecorator((story: RenderFunction) => {
    return (
      injectThemeWithoutLimitWidth(story)
    );
  })
  //
  .add('MainMenu', withInfo({ source: true })(() => {
    const mainMenuProps: MainMenuProps = {
      mainTitle: 'Iblis',
      mainTitleAction: action('Main Title clicked'),
      menu: menu,
      firstLevelActive: 0,
      secondLevelActive: 0,
      lastMenuComponent: accountMenuComponent,
    };
    return (
      <MainMenu {...mainMenuProps} />
    );
  }
  ))
  //
  .add('Display menu with logo', (() => {
    const mainMenuProps: MainMenuProps = {
      mainTitle: 'Iblis',
      mainTitleAction: action('Main Title clicked'),
      menu: menu,
      firstLevelActive: 0,
      secondLevelActive: 1,
      lastMenuComponent: accountMenuComponent,
      mainLogo: <img src={require('./logo_white.png')} width={24} height={24} style={{ marginRight: '8px' }} />,
    };
    return (
      <MainMenu {...mainMenuProps} />
    );
  }
  ))
  //
  .add('Display menu with avatar', (() => {
    const mainMenuProps: MainMenuProps = {
      mainTitle: 'Iblis',
      mainTitleAction: action('Main Title clicked'),
      menu: menu,
      firstLevelActive: 0,
      secondLevelActive: 1,
      lastMenuComponent: accountMenuComponent,
      lastMenuPicUrl: 'https://tinyfac.es/data/avatars/5F8C5D50-DDB6-4F06-AA15-ACB30D8D910D-200w.jpeg',
    };
    return (
      <MainMenu {...mainMenuProps} />
    );
  }
  ))
  //
  .add('Last Menu active', (() => {
    const mainMenuProps: MainMenuProps = {
      mainTitle: 'Iblis',
      mainTitleAction: action('Main Title clicked'),
      menu: menu,
      firstLevelActive: 1,
      secondLevelActive: 1,
      lastMenuComponent: accountMenuComponent,
    };
    return (
      <MainMenu {...mainMenuProps} />
    );
  }
  ))
  //
  .add('Last Menu active with Avatar', (() => {
    const mainMenuProps: MainMenuProps = {
      mainTitle: 'Iblis',
      mainTitleAction: action('Main Title clicked'),
      menu: menu,
      firstLevelActive: 1,
      secondLevelActive: 1,
      lastMenuComponent: accountMenuComponent,
      lastMenuPicUrl: 'https://tinyfac.es/data/avatars/5F8C5D50-DDB6-4F06-AA15-ACB30D8D910D-200w.jpeg',
    };
    return (
      <MainMenu {...mainMenuProps} />
    );
  }
  ))
  .add('Display menu with no icon', (() => {
    const menuWithNo = [
      {
        firstLevel: { name: 'Home', action: action('Home clicked') },
        sublevel: [
          { name: 'Expenses', action: action('Expenses clicked') },
          { name: 'Report', action: action('Report clicked') },
        ],
      },
      {
        firstLevel: { name: 'Account', action: action('Account clicked') },
        sublevel: [
          { name: 'My Account', action: action('My Account clicked') },
          { name: 'Settings', action: action('Settings clicked') },
        ],
      },
    ];
    const mainMenuProps: MainMenuProps = {
      mainTitle: 'Iblis',
      mainTitleAction: action('Main Title clicked'),
      menu: menuWithNo,
      firstLevelActive: 0,
      secondLevelActive: 1,
      lastMenuComponent: accountMenuComponent,
    };
    return (
      <MainMenu {...mainMenuProps} />
    );
  }
  ))
  //
  ;
