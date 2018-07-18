import * as React from 'react';
import renderer from 'react-test-renderer';
import { FilterButton, FilterButtonMenuProps } from '../../../../src';

it('renders correctly', () => {
    const filterMenu: FilterButtonMenuProps[] = [
        { name: 'All', action: () => undefined, count: '88' },
        { name: 'Published', action: () => undefined, count: '34' },
        { name: 'Draft', action: () => undefined, count: '12' },
    ];
    const tree = renderer
        .create(
            <FilterButton
                listFilter={filterMenu}
                activeIndex={0}
            />
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
