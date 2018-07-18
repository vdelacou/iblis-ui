import { Store, withState } from '@dump247/storybook-state';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { RenderFunction, storiesOf } from '@storybook/react';
import * as React from 'react';
import { FilterButton, FilterButtonMenuProps } from '../../../../src';
import { injectTheme } from '../../../decorators';

interface State {
  activeIndex: number;
}

export default storiesOf('2.1.12 Filter Button', module)
  .addDecorator((story: RenderFunction) => {
    return (
      injectTheme(story)
    );
  })
  //
  .add('FilterButton', withInfo({ source: true })(() => {

    const filterMenu: FilterButtonMenuProps[] = [
      { name: 'All', action: action('All Clicked'), count: '88' },
      { name: 'Published', action: action('Published Clicked'), count: '34' },
      { name: 'Draft', action: action('Draft Clicked'), count: '12' },
    ];
    return (
      <FilterButton
        listFilter={filterMenu}
        activeIndex={0}
      />
    );
  }
  ))
  //
  .add('Example', (withState(
    {
      activeIndex: 0,
    }
  )((story: any) => {
    const store: Store<State> = story.store as Store<State>;
    const state: State = store.state;

    const filterMenu: FilterButtonMenuProps[] = [
      { name: 'All', action: () => changeIndex(store, 0), count: '88' },
      { name: 'Published', action: () => changeIndex(store, 1), count: '34' },
      { name: 'Draft', action: () => changeIndex(store, 2), count: '12' },
    ];
    return (
      <FilterButton
        listFilter={filterMenu}
        activeIndex={state.activeIndex}
      />
    );
  }
  )))
  //
  .add('Withtout Count', (withState(
    {
      activeIndex: 0,
    }
  )((story: any) => {
    const store: Store<State> = story.store as Store<State>;
    const state: State = store.state;

    const filterMenu: FilterButtonMenuProps[] = [
      { name: 'All', action: () => changeIndex(store, 0) },
      { name: 'Published', action: () => changeIndex(store, 1) },
      { name: 'Draft', action: () => changeIndex(store, 2) },
    ];
    return (
      <FilterButton
        listFilter={filterMenu}
        activeIndex={state.activeIndex}
      />
    );
  }
  )))
  //
  .add('4 items', (withState(
    {
      activeIndex: 0,
    }
  )((story: any) => {
    const store: Store<State> = story.store as Store<State>;
    const state: State = store.state;

    const filterMenu: FilterButtonMenuProps[] = [
      { name: 'All', action: () => changeIndex(store, 0), count: '88' },
      { name: 'Published', action: () => changeIndex(store, 1), count: '34' },
      { name: 'Archived', action: () => changeIndex(store, 2), count: '26' },
      { name: 'Draft', action: () => changeIndex(store, 3), count: '12' },
    ];
    return (
      <FilterButton
        listFilter={filterMenu}
        activeIndex={state.activeIndex}
      />
    );
  }
  )))
  //
  .add('2 items', (withState(
    {
      activeIndex: 0,
    }
  )((story: any) => {
    const store: Store<State> = story.store as Store<State>;
    const state: State = store.state;

    const filterMenu: FilterButtonMenuProps[] = [
      { name: 'All', action: () => changeIndex(store, 0) },
      { name: 'Published', action: () => changeIndex(store, 1) },
    ];
    return (
      <FilterButton
        listFilter={filterMenu}
        activeIndex={state.activeIndex}
      />
    );
  }
  )))
  //
  ;

const changeIndex = (store: Store<State>, index: number) => {
  store.set(
    {
      activeIndex: index,
    }
  );
};
