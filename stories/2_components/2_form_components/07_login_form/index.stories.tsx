import { action } from '@storybook/addon-actions';
import { RenderFunction, storiesOf } from '@storybook/react';
import * as React from 'react';
import { ConfigProps, reduxForm } from 'redux-form';
import { LoginForm, LoginFormProps, LoginFormValues } from '../../../../src';
import { injectProvider, injectTheme } from '../../../decorators';

export default storiesOf('2.2.7 LoginForm', module)
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
    .add('LoginForm', (() => {
        // configure the form
        function config(): ConfigProps<LoginFormValues, LoginFormProps> {
            const configForm: ConfigProps<LoginFormValues, LoginFormProps> = {
                form: 'LoginForm',
            };
            return configForm;
        }
        // connect the form
        const ConnectedForm = reduxForm(config())(LoginForm);
        return (
            <ConnectedForm
                emailLabel={'Enter your email'}
                passwordLabel={'Enter your password'}
                buttonLabelConfirm={'Sign In'}
                forgetPasswordLabel={'Forget your password?'}
                createAccountLabel={'No account? Create account'}
                minimumPasswordLength={8}
                maximumPasswordLength={128}
                requiredErrorLabel={'Required'}
                emailNotValidErrorLabel={'Email not valid'}
                passwordLengthErrorLabel={'Password must be 8 characters minimum'}
                login={action('Login')}
                forgetPassword={action('Forget Password')}
                createAccount={action('Create account')}
            />
        );
    }))
    //
    ;
