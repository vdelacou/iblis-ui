import * as React from 'react';
import renderer from 'react-test-renderer';
import { CardMenu, CardMenuProps } from '../../../src';

it('renders correctly', () => {

    const menu = [
        {
            firstLevel: { name: 'Profile', action: () => undefined },
        },
        {
            firstLevel: { name: 'Security', action: () => undefined },
            sublevel: [
                { name: 'Your Details', action: () => undefined },
                { name: 'Change Password', action: () => undefined },
                { name: 'Delete Account', action: () => undefined },
            ],
        },
    ];

    const cardMenuProps: CardMenuProps = {
        menu: menu,
        firstLevelActive: 0,
        secondLevelActive: 0,
    };

    const tree = renderer
        .create(
            <CardMenu {...cardMenuProps}>
                {'Place Content Here'}
            </CardMenu>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
