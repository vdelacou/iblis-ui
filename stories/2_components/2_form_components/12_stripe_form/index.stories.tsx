import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { RenderFunction, storiesOf } from '@storybook/react';
import * as React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { ConfigProps, reduxForm } from 'redux-form';
import { StripeForm, StripeFormProps, StripeFormValues } from '../../../../src';
import { injectProvider, injectTheme } from '../../../decorators';

export default storiesOf('2.2.12 StripeForm', module)
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
    .add('StripeForm', withInfo({ source: true })(() => {
        // configure the form
        function config(): ConfigProps<StripeFormValues, StripeFormProps> {
            const configForm: ConfigProps<StripeFormValues, StripeFormProps> = {
                form: 'StripeForm',
            };
            return configForm;
        }
        // connect the form
        const ConnectedForm = reduxForm(config())(StripeForm);
        return (
            <StripeProvider apiKey="pk_test_LDqpUr0tLsfAApZIUjAIGhOV">
                <Elements>
                    <ConnectedForm
                        emailLabel={'Enter your email'}
                        buttonLabelConfirm={'Send Code'}
                        backLabel={'Back to Sign In'}
                        requiredErrorLabel={'Required'}
                        emailNotValidErrorLabel={'Email not valid'}
                        stripe={action('Reset Password')}
                        back={action('back')}
                    />
                </Elements>
            </StripeProvider>
        );
    }))
    //
    ;
