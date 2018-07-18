import { Store, withState } from '@dump247/storybook-state';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { RenderFunction, storiesOf } from '@storybook/react';
import * as React from 'react';
import { ConfigProps, reduxForm } from 'redux-form';
import { UploadAvatar, UserProfileForm, UserProfileFormProps, UserProfileFormValues } from '../../../../src';
import { injectProvider, injectTheme } from '../../../decorators';

interface State {
    firstName: string;
    lastName: string;
    email: string;
    language: string;
    avatarUrl: string;
    avatarFileId: string | number;
    isLoading: boolean;
}

const langValues = [{ id: 'en', value: 'English' }, { id: 'fr', value: 'French' }];

export default storiesOf('2.2.4 User Profile Form', module)
    .addDecorator((story: RenderFunction) => {
        return (
            injectTheme(story)
        );
    })
    .addDecorator((story: RenderFunction) => {
        return (
            injectProvider(story)
        );
    })
    //
    .add('UserProfileForm', withInfo({ source: true })(() => {

        // configure the form
        function config(): ConfigProps<UserProfileFormValues, UserProfileFormProps> {
            const configForm: ConfigProps<UserProfileFormValues, UserProfileFormProps> = {
                form: 'form',
            };
            return configForm;
        }

        const uploadAvatar = (
            <UploadAvatar
                buttonLabel={'Select File'}
                onClick={(_binary, file) => alert(file.name)}
                avatarUrl={'https://pickaface.net/gallery/avatar/unr_alberteinstein_161028_1839_7f2a2to8.png'}
                captionLabel="Supported file types: JPEG, PNG, GIF, BMP (Max 5 MB)"
                fileType=".jpeg,.jpg,.png,.gif,.bmp"
                fileSize={5}
                handleTypeError={() => alert('Error Type')}
                handleSizeError={() => alert('Error Size')}
            />
        );

        // connect the form
        const ConnectedForm = reduxForm(config())(UserProfileForm);
        const userProfileFormValues: UserProfileFormValues = {
            firstName: 'Albert',
            lastName: 'Einstein',
            email: 'albert@einstein.com',
            language: 'en',
            avatarFileId: 1,
        };
        return (
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
                avatarComponent={uploadAvatar}
                updateUser={action('Update Clicked')}
            />
        );
    }))
    //
    .add('Example', (withState(
        {
            firstName: 'Albert',
            lastName: 'Einstein',
            email: 'albert@einstein.com',
            language: 'en',
            avatarUrl: 'https://pickaface.net/gallery/avatar/unr_alberteinstein_161028_1839_7f2a2to8.png',
            avatarFileId: 0,
            isLoading: false,
        }
    )((story: any) => {
        const store: Store<State> = story.store as Store<State>;
        const state: State = store.state;

        // configure the form
        function config(): ConfigProps<UserProfileFormValues, UserProfileFormProps> {
            const configForm: ConfigProps<UserProfileFormValues, UserProfileFormProps> = {
                form: 'form',
            };
            return configForm;
        }
        const uploadAvatarImage = () => {
            store.set({ isLoading: true });
            setTimeout(() => {
                const avatarFileId = Math.floor(Math.random() * 1000);
                store.set({ isLoading: false, avatarFileId: avatarFileId });
                const values: UserProfileFormValues = {
                    firstName: state.firstName,
                    lastName: state.lastName,
                    email: state.email,
                    language: state.language,
                    avatarFileId: avatarFileId,
                };
                updateUser(values);
            }, 1000);
        };

        const updateUser = (values: UserProfileFormValues) => {
            store.set({ isLoading: true });
            setTimeout(() => {
                store.set({
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    language: values.language,
                    avatarFileId: values.avatarFileId,
                    isLoading: false,
                }
                );
            }, 1000);
        };

        const uploadAvatar = (
            <UploadAvatar
                buttonLabel={'Select File'}
                onClick={(_binary, _file) => uploadAvatarImage()}
                avatarUrl={state.avatarUrl}
                captionLabel="Supported file types: JPEG, PNG, GIF, BMP (Max 5 MB)"
                fileType=".jpeg,.jpg,.png,.gif,.bmp"
                fileSize={5}
                handleTypeError={() => alert('Error Type')}
                handleSizeError={() => alert('Error Size')}
            />
        );

        // connect the form
        const ConnectedForm = reduxForm(config())(UserProfileForm);
        const userProfileFormValues: UserProfileFormValues = {
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            language: state.language,
            avatarFileId: state.avatarFileId,
        };
        return (
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
                avatarComponent={uploadAvatar}
                isLoading={state.isLoading}
                updateUser={(values) => updateUser(values)}
            />
        );
    })))
    //
    ;
