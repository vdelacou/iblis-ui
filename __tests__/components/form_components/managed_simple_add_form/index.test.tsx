import * as React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { combineReducers, createStore, ReducersMapObject, Store } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { ManagedSimpleForm, ManagedSimpleFormProps } from '../../../../src';

it('renders correctly', () => {

    // Combine all app Reducers
    const reducersList: ReducersMapObject = {
        form: formReducer,
    };

    // Combine all app Reducers
    const reducers = combineReducers(reducersList);

    // create redux store with all app reducers amd all the middleware
    const store: Store<{}> = createStore(
        // reducers
        reducers,
        // preload state
        {},
    );

    const data = [
        { id: '1', name: 'Marketing' },
        { id: '2', name: 'Legal' },
    ];
    const ManagedSimpleFormOwnProps: ManagedSimpleFormProps = {
        data: data,
        idFieldName: 'id',
        displayFieldName: 'name',
        namePlaceHolder: 'Enter your name',
        addAction: (_value) => undefined,
        editAction: (_value) => undefined,
        deleteAction: (_id) => undefined,
        isLoading: false,
    };

    const tree = renderer
        .create(
            <Provider store={store}>
                <ManagedSimpleForm
                    {...ManagedSimpleFormOwnProps}
                />
            </Provider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
