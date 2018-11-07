import { action } from '@storybook/addon-actions';
import { RenderFunction, storiesOf } from '@storybook/react';
import * as React from 'react';
import { ConfigProps, reduxForm } from 'redux-form';
import { ChangePasswordForm, ChangePasswordFormProps, ChangePasswordFormValues } from '../../../../src';
import { injectProvider, injectTheme } from '../../../decorators';

export default storiesOf('2.2.5 Change Password Form', module)
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
    .add('ChangePasswordForm', (() => {
        // configure the form
        function config(): ConfigProps<ChangePasswordFormValues, ChangePasswordFormProps> {
            const configForm: ConfigProps<ChangePasswordFormValues, ChangePasswordFormProps> = {
                form: 'ChangePasswordForm',
            };
            return configForm;
        }
        // connect the form
        const ConnectedForm = reduxForm(config())(ChangePasswordForm);
        return (
            <ConnectedForm
                oldPasswordLabel={'Enter old password'}
                passwordLabel={'Choose a new password'}
                passwordAgainLabel={'Re-enter new password'}
                buttonLabelConfirm={'Change Password'}
                passwordExplainLabel={'8 or more characters, 1 lower case, 1 upper case, 1 number'}
                minimumPasswordLength={8}
                maximumPasswordLength={128}
                passwordLengthErrorLabel={'Password must be 8 characters minimum'}
                minimumUppercasePassword={1}
                minimumUppercaseErrorLabel={'Password must have at least 1 upper case letter'}
                minimumLowercasePassword={1}
                minimumLowercaseErrorLabel={'Password must have at least 1 lower case letter'}
                minimumDigitPassword={1}
                minimumDigitErrorLabel={'Password must have at least 1 number'}
                minimumSpecialCharPassword={0}
                minimumSpecialCharErrorLabel={'Password must have at least 1 special char : $@$!%*#?&'}
                requiredErrorLabel={'Required'}
                passwordNotIdentical={'Password must be identical'}
                setPassword={action('Set Password')}
            />
        );
    }))
    //
    ;
