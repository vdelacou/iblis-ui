import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { RenderFunction, storiesOf } from '@storybook/react';
import * as React from 'react';
import { ConfigProps, reduxForm } from 'redux-form';
import { DeleteAccountForm, DeleteAccountFormProps, DeleteAccountFormValues } from '../../../../src';
import { injectProvider, injectTheme } from '../../../decorators';

export default storiesOf('2.2.6 Delete Account Form', module)
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
    .add('DeleteAccountForm',
        withInfo({
            source: true,
        })
            (() => {
                // configure the form
                function config(): ConfigProps<DeleteAccountFormValues, DeleteAccountFormProps> {
                    const configForm: ConfigProps<DeleteAccountFormValues, DeleteAccountFormProps> = {
                        form: 'form',
                    };
                    return configForm;
                }
                // connect the form
                const ConnectedForm = reduxForm(config())(DeleteAccountForm);
                return (
                    <ConnectedForm
                        leaveCommentsLabel={'We\'d hate to see you go. Would you kindly tell us why, so we can improve?'}
                        checkboxLabel={'Yes, I understand this is not reversible.'}
                        emailLabel={'This CANNOT be undone! If you really want to delete your account, type in the email address of this account to confirm.'}
                        firstButtonLabelConfirm={' Delete My Account'}
                        buttonLabelConfirm={'I understand the consequences, delete my account'}
                        deleteAccount={action('Delete Account')}
                        requiredErrorLabel={'Required'}
                        emailNotValidErrorLabel={'Email not valid'}
                    />
                );
            }))
    //
    ;
