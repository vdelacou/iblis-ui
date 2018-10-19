import { ButtonBase, Grid, Typography, withTheme, WithTheme } from '@material-ui/core';
import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { IblisButton, IblisTextField } from '../../../components/ui_components';

export interface ConfirmSignupFormValues {
    /**
     * The email for confirmSignup
     */
    email?: string;
    /**
     * The code for confirmSignup
     */
    code?: string;
}

export interface ConfirmSignupFormProps {
    /**
     * The email for verify the code
     */
    userEmail: string;
    /**
     * The code label for the code field
     */
    codeLabel: string;
    /**
     * The button label to launch main action
     */
    buttonLabelConfirm: string;
    /**
     * The resend code label
     */
    resendCodeLabel: string;
    /**
     * The back label
     */
    backLabel: string;
    /**
     * The error to show when form have no email
     */
    requiredErrorLabel: string;
    /**
     * To show to user that the action is loading
     */
    isLoading?: boolean;
    /*
     * The function to call to confirmSignup the user
     */
    confirmSignup(values: ConfirmSignupFormValues): void;
    /*
     * The function to call when click on back
     */
    back(): void;
    /*
     * The function to call when click on resend code
     */
    resendCode(): void;
}

const ConfirmSignupFormBase: React.StatelessComponent<ConfirmSignupFormProps & InjectedFormProps<ConfirmSignupFormValues, ConfirmSignupFormProps> & WithTheme> = (props) => {

    const { codeLabel, backLabel, buttonLabelConfirm, resendCodeLabel, isLoading, resendCode, back, handleSubmit, submitting } = props;

    const submitForm = (form: ConfirmSignupFormValues) => {
        props.confirmSignup(form);
    };

    const confirmSignupFormValues: ConfirmSignupFormValues = {
        email: props.userEmail,
    };
    if (!props.initialized) {
        props.initialize(confirmSignupFormValues);
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(submitForm)}
                noValidate={true}
            >
                {/* email */}
                <Grid container={true} >
                    <Grid item={true} xs={12}>
                        <Field
                            type="text"
                            name="email"
                            component={IblisTextField}
                            disabled={true}
                            validate={[requiredTextField]}
                            fullWidth={true}
                        />
                    </Grid>
                </Grid>
                {/* code */}
                <Grid container={true} >
                    <Grid item={true} xs={12}>
                        <Field
                            type="code"
                            name="code"
                            component={IblisTextField}
                            disabled={submitting || isLoading}
                            validate={[requiredTextField]}
                            fullWidth={true}
                            placeholder={codeLabel}
                        />
                    </Grid>
                </Grid>
                {/* forget code */}
                <Grid container={true} >
                    <Grid item={true} xs={12} >
                        <Typography align="center">
                            <ButtonBase onClick={() => resendCode()} disabled={submitting || isLoading}>
                                {resendCodeLabel}
                            </ButtonBase>
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container={true} justify="space-between" >
                    {/* create account */}
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

function requiredTextField(value: string, _allValues: ConfirmSignupFormValues, props: ConfirmSignupFormProps) {
    return value && value.trim() !== '' ? undefined : props.requiredErrorLabel;
}

const ConfirmSignupWithTheme: React.ComponentType<ConfirmSignupFormProps & InjectedFormProps<ConfirmSignupFormValues, ConfirmSignupFormProps>> =
    withTheme()(ConfirmSignupFormBase);

/**
 * A form for confirmSignup.
 */
export const ConfirmSignupForm: React.ComponentType<ConfirmSignupFormProps & InjectedFormProps<ConfirmSignupFormValues, ConfirmSignupFormProps>> = (ConfirmSignupWithTheme);
