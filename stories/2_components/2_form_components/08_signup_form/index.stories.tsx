import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { RenderFunction, storiesOf } from '@storybook/react';
import * as React from 'react';
import { ConfigProps, reduxForm } from 'redux-form';
import { SignupForm, SignupFormProps, SignupFormValues } from '../../../../src';
import { injectProvider, injectTheme } from '../../../decorators';

export default storiesOf('2.2.8 SignupForm', module)
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
    .add('SignupForm', withInfo({ source: true })(() => {
        // configure the form
        function config(): ConfigProps<SignupFormValues, SignupFormProps> {
            const configForm: ConfigProps<SignupFormValues, SignupFormProps> = {
                form: 'SignupForm',
            };
            return configForm;
        }
        // connect the form
        const ConnectedForm = reduxForm(config())(SignupForm);
        return (
            <ConnectedForm
                emailLabel={'janedoe@email.com'}
                passwordLabel={'Create a password'}
                passwordAgainLabel={'Confirm password'}
                buttonLabelConfirm={'Create Account'}
                backLabel={'Have an account? Sign in'}
                minimumPasswordLength={8}
                maximumPasswordLength={128}
                minimumUppercasePassword={1}
                minimumUppercaseErrorLabel={'Password must have at least 1 upper case letter'}
                minimumLowercasePassword={1}
                minimumLowercaseErrorLabel={'Password must have at least 1 lower case letter'}
                minimumDigitPassword={1}
                minimumDigitErrorLabel={'Password must have at least 1 number'}
                minimumSpecialCharPassword={1}
                minimumSpecialCharErrorLabel={'Password must have at least 1 special char : $@$!%*#?&'}
                emailNotValidErrorLabel={'Email not valid'}
                passwordLengthErrorLabel={'Password must be 8 characters minimum'}
                passwordNotIdentical={'Password must be identical'}
                requiredErrorLabel={'Required'}
                signup={action('Sign up')}
                back={action('back')}
            />
        );
    }))
    //
    ;
