import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { RenderFunction, storiesOf } from '@storybook/react';
import * as React from 'react';
import { ConfigProps, reduxForm } from 'redux-form';
import { PasswordConfirmForm, PasswordConfirmFormProps, PasswordConfirmFormValues } from '../../../../src';
import { injectProvider, injectTheme } from '../../../decorators';

export default storiesOf('2.2.12 PasswordConfirmForm', module)
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
    .add('PasswordConfirmForm', withInfo({ source: true })(() => {
        // configure the form
        function config(): ConfigProps<PasswordConfirmFormValues, PasswordConfirmFormProps> {
            const configForm: ConfigProps<PasswordConfirmFormValues, PasswordConfirmFormProps> = {
                form: 'PasswordConfirmForm',
            };
            return configForm;
        }
        // connect the form
        const ConnectedForm = reduxForm(config())(PasswordConfirmForm);
        return (
            <ConnectedForm
                codeLabel={'Enter your code'}
                passwordLabel={'New password'}
                passwordAgainLabel={'Confirm password'}
                buttonLabelConfirm={'Submit'}
                backLabel={'Resend Code'}
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
                passwordLengthErrorLabel={'Password must be 8 characters minimum'}
                passwordNotIdentical={'Password must be identical'}
                requiredErrorLabel={'Required'}
                passwordConfirm={action('Password Confirm')}
                back={action('back')}
            />
        );
    }))
    //
    ;
