import * as React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { combineReducers, createStore, ReducersMapObject, Store } from 'redux';
import { ConfigProps, reducer as formReducer, reduxForm } from 'redux-form';
import { UserProfileForm, UserProfileFormProps, UserProfileFormValues } from '../../../../src';

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

    const langValues = [{ id: 'en', value: 'English' }, { id: 'fr', value: 'French' }];

    // configure the form
    function config(): ConfigProps<UserProfileFormValues, UserProfileFormProps> {
        const configForm: ConfigProps<UserProfileFormValues, UserProfileFormProps> = {
            form: 'form',
        };
        return configForm;
    }
    // connect the form
    const ConnectedForm = reduxForm(config())(UserProfileForm);
    const userProfileFormValues: UserProfileFormValues = {
        firstName: 'Albert',
        lastName: 'Einstein',
        email: 'albert@einstein.com',
        language: 'en',
        avatarFileId: '22',
    };

    const tree = renderer
        .create(
            <Provider store={store}>
                <ConnectedForm
                    initValues={userProfileFormValues}
                    firstNameLabel={'FirstName'}
                    lastNameLabel={'LastName'}
                    emailLabel={'Email'}
                    languageLabel={'Language'}
                    buttonLabelConfirm={'Update'}
                    requiredErrorLabel={'Required'}
                    emailNotValidErrorLabel={'Email not valid'}
                    languagePossibleValues={langValues}
                    avatarComponent={<div />}
                    isLoading={false}
                    updateUser={(_values) => undefined}
                />
            </Provider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
