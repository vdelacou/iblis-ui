import { action } from '@storybook/addon-actions';
import { RenderFunction, storiesOf } from '@storybook/react';
import * as React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { StripeForm } from '../../../../src';
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
    .add('StripeForm', (() => {
        return (
            <StripeProvider apiKey="pk_test_LDqpUr0tLsfAApZIUjAIGhOV">
                <Elements>
                    <StripeForm
                        buttonLabelConfirm={'Add Card'}
                        stripeToken={action('Get Token')}
                    />
                </Elements>
            </StripeProvider>
        );
    }))
    //
    ;
