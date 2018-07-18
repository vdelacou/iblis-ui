import { Store, withState } from '@dump247/storybook-state';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { RenderFunction, storiesOf } from '@storybook/react';
import * as React from 'react';
import { CardMenu, CardMenuProps } from '../../../src';
import { injectTheme } from '../../decorators';

interface State {
  firstLevelActive: number;
  secondLevelActive: number;
}

export default storiesOf('1.4 Card Menu Layout', module)
  .addDecorator((story: RenderFunction) => {
    return (
      injectTheme(story)
    );
  })
  .add('CardMenu',
    withInfo({ source: true })(() => {
      const menu = [
        {
          firstLevel: { name: 'Profile', action: () => action('Profile Clicked') },
        },
        {
          firstLevel: { name: 'Security', action: () => action('Security Clicked') },
          sublevel: [
            { name: 'Your Details', action: () => action('Your Details Clicked') },
            { name: 'Change Password', action: () => action('Change Password Clicked') },
            { name: 'Delete Account', action: () => action('Delete Account Clicked') },
          ],
        },
      ];

      const cardMenuProps: CardMenuProps = {
        menu: menu,
        firstLevelActive: 0,
        secondLevelActive: 1,
      };

      return (
        <CardMenu {...cardMenuProps}>
          {'Place Content Here'}
        </CardMenu>
      );
    }
    )
  )
  //
  .add('Example',
    withState(
      {
        firstLevelActive: 0,
        secondLevelActive: 0,
      }
    )((story: any) => {
      const store: Store<State> = story.store as Store<State>;
      const state: State = store.state;

      const navigate = (firstLevelActive: number, secondLevelActive: number) => {
        store.set({ firstLevelActive: firstLevelActive, secondLevelActive: secondLevelActive });
      };

      const menu = [
        {
          firstLevel: { name: 'Profile', action: () => navigate(0, 0) },
        },
        {
          firstLevel: { name: 'Security', action: () => navigate(1, 0) },
          sublevel: [
            { name: 'Your Details', action: () => navigate(1, 0) },
            { name: 'Change Password', action: () => navigate(1, 1) },
            { name: 'Delete Account', action: () => navigate(1, 2) },
          ],
        },
      ];

      const cardMenuProps: CardMenuProps = {
        menu: menu,
        firstLevelActive: state.firstLevelActive,
        secondLevelActive: state.secondLevelActive,
      };

      return (
        <CardMenu {...cardMenuProps}>
          {'Place Content Here'}
        </CardMenu>
      );
    }
    )
  )
  //
  ;
