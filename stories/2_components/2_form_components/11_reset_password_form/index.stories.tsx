import { action } from '@storybook/addon-actions';
import { RenderFunction, storiesOf } from '@storybook/react';
import * as React from 'react';
import { ConfigProps, reduxForm } from 'redux-form';
import { ResetPasswordForm, ResetPasswordFormProps, ResetPasswordFormValues } from '../../../../src';
import { injectProvider, injectTheme } from '../../../decorators';

export default storiesOf('2.2.11 ResetPasswordForm', module)
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
    .add('ResetPasswordForm', (() => {
        // configure the form
        function config(): ConfigProps<ResetPasswordFormValues, ResetPasswordFormProps> {
            const configForm: ConfigProps<ResetPasswordFormValues, ResetPasswordFormProps> = {
                form: 'ResetPasswordForm',
            };
            return configForm;
        }
        // connect the form
        const ConnectedForm = reduxForm(config())(ResetPasswordForm);
        return (
            <ConnectedForm
                emailLabel={'Enter your email'}
                buttonLabelConfirm={'Send Code'}
                backLabel={'Back to Sign In'}
                requiredErrorLabel={'Required'}
                emailNotValidErrorLabel={'Email not valid'}
                resetPassword={action('Reset Password')}
                back={action('back')}
            />
        );
    }))
    //
    ;
