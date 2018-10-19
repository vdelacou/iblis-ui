import { ButtonBase, Grid, Typography, withTheme, WithTheme } from '@material-ui/core';
import * as React from 'react';
import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements';
import { InjectedFormProps } from 'redux-form';
import { IblisButton } from '../../../components/ui_components';

export interface StripeFormValues {
    /**
     * The email for stripe
     */
    email?: string;
}

export interface StripeFormProps {
    /**
     * The code label for the code field
     */
    emailLabel: string;
    /**
     * The button label to launch main action
     */
    buttonLabelConfirm: string;
    /**
     * The back label
     */
    backLabel: string;
    /**
     * The error to show when form have no email
     */
    requiredErrorLabel: string;
    /**
     * The error to show when email is not correct
     */
    emailNotValidErrorLabel: string;
    /**
     * To show to user that the action is loading
     */
    isLoading?: boolean;
    /*
     * The function to call reset password
     */
    stripe(values: StripeFormValues): void;
    /*
     * The function to call when click on back
     */
    back(): void;
}

const StripeFormBase: React.StatelessComponent<StripeFormProps & InjectedFormProps<StripeFormValues, StripeFormProps>
    & ReactStripeElements.InjectedStripeProps & WithTheme> = (props) => {

        const { backLabel, buttonLabelConfirm, isLoading, back, handleSubmit, submitting } = props;

        const submitForm = (form: StripeFormValues) => {
            props.stripe(form);
        };

        return (
            <div>
                <form
                    onSubmit={handleSubmit(submitForm)}
                    noValidate={true}
                >
                    {/* email */}
                    <Grid container={true} >
                        <Grid item={true} xs={12}>
                            <CardElement />
                        </Grid>
                    </Grid>
                    <Grid container={true} justify="space-between" >
                        {/* back */}
                        <Grid item={true} >
                            <Typography variant="subheading">
                                <ButtonBase onClick={() => back()} disabled={submitting || isLoading}>
                                    {backLabel}
                                </ButtonBase>
                            </Typography>
                        </Grid>
                        {/* button */}
                        <Grid item={true} >
                            <IblisButton
                                buttonType={'primary'}
                                buttonLabel={buttonLabelConfirm}
                                type="submit"
                                isLoading={submitting || isLoading}
                            />
                        </Grid>
                    </Grid>

                </form>
            </div >
        );
    };

const StripeWithStripe: React.ComponentType<StripeFormProps & InjectedFormProps<StripeFormValues, StripeFormProps> & WithTheme> =
    injectStripe(StripeFormBase);

const StripeWithTheme: React.ComponentType<StripeFormProps & InjectedFormProps<StripeFormValues, StripeFormProps>> =
    withTheme()(StripeWithStripe);

/**
 * A form for stripe.
 */
export const StripeForm: React.ComponentType<StripeFormProps & InjectedFormProps<StripeFormValues, StripeFormProps>> = (StripeWithTheme);
