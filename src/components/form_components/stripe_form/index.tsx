import { Grid, withTheme, WithTheme } from '@material-ui/core';
import * as React from 'react';
import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements';
import { IblisButton } from '../../../components/ui_components';

export interface StripeFormProps {

    /**
     * The button label to launch main action
     */
    buttonLabelConfirm: string;
    /**
     * To show to user that the action is loading
     */
    isLoading?: boolean;
    /*
     * The function to call to get the token
     */
    stripeToken(stripeToken: string): void;
}

class StripeFormState {
    /**
     * Loading when waiting for stripe
     * @default true
     */
    readonly loadingStripe: boolean = true;
}

class StripeFormBase extends React.PureComponent<StripeFormProps & ReactStripeElements.InjectedStripeProps & WithTheme, StripeFormState>  {

    readonly state = new StripeFormState();

    render(): React.ReactNode {

        const { buttonLabelConfirm, isLoading, stripeToken, theme } = this.props;

        const cardStyle = {
            base: {
                'color': theme.typography.headline.color,
                'fontFamily': theme.typography.headline.fontFamily,
                '::placeholder': {
                    color: theme.palette.grey['500'],
                },
            },
            invalid: {
                color: theme.palette.error.main,
            },
        };

        const submitForm = (event: React.FormEvent<{}>) => {
            event.preventDefault();
            this.setState(() => ({ loadingStripe: true }));
            if (this.props.stripe) {
                this.props.stripe.createToken().then((payload) => {
                    this.setState(() => ({ loadingStripe: false }));
                    if (payload.token) {
                        stripeToken(payload.token.id);
                    }
                }
                );
            }
        };

        const stripeReady = () => {
            this.setState(() => ({ loadingStripe: false }));
        };

        return (
            <div>
                <form
                    onSubmit={submitForm}
                    noValidate={true}
                >
                    {/* card */}
                    <Grid container={true} >
                        <Grid item={true} xs={5}>
                            <CardElement style={cardStyle} onReady={stripeReady} />
                        </Grid>
                    </Grid>
                    <Grid container={true} justify="flex-end" >
                        {/* button */}
                        <Grid item={true} >
                            <IblisButton
                                buttonType={'primary'}
                                buttonLabel={buttonLabelConfirm}
                                type="submit"
                                isLoading={isLoading || this.state.loadingStripe}
                            />
                        </Grid>
                    </Grid>
                </form>
            </div >
        );
    }
}

const StripeWithStripe: React.ComponentType<StripeFormProps & WithTheme> = injectStripe(StripeFormBase);
const StripeWithTheme: React.ComponentType<StripeFormProps> = withTheme()(StripeWithStripe);

/**
 * A form for stripe.
 */
export const StripeForm: React.ComponentType<StripeFormProps> = (StripeWithTheme);
