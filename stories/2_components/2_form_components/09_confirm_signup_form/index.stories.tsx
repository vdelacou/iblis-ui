import { action } from '@storybook/addon-actions';
import { RenderFunction, storiesOf } from '@storybook/react';
import * as React from 'react';
import { ConfigProps, reduxForm } from 'redux-form';
import { ConfirmSignupForm, ConfirmSignupFormProps, ConfirmSignupFormValues } from '../../../../src';
import { injectProvider, injectTheme } from '../../../decorators';

export default storiesOf('2.2.9 ConfirmSignupForm', module)
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
    .add('ConfirmSignupForm', (() => {
        // configure the form
        function config(): ConfigProps<ConfirmSignupFormValues, ConfirmSignupFormProps> {
            const configForm: ConfigProps<ConfirmSignupFormValues, ConfirmSignupFormProps> = {
                form: 'ConfirmSignupForm',
            };
            return configForm;
        }
        // connect the form
        const ConnectedForm = reduxForm(config())(ConfirmSignupForm);
        return (
            <ConnectedForm
                userEmail={'janedoe@email.com'}
                codeLabel={'Enter your password'}
                buttonLabelConfirm={'Confirm'}
                resendCodeLabel={'Resend Code'}
                backLabel={'Back to Sign In'}
                requiredErrorLabel={'Required'}
                confirmSignup={action('Login')}
                back={action('Back')}
                resendCode={action('Resend Code')}
            />
        );
    }))
    //
    ;
