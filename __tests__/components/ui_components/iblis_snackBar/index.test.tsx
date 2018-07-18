import * as React from 'react';
import renderer from 'react-test-renderer';
import { IblisSnackbar } from '../../../../src';

it('renders correctly', () => {
    const tree = renderer
        .create(
            <IblisSnackbar
                isError={false}
                errorText={'Error occurs, we will fixed it soon'}
                hide={() => undefined}
            />
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
