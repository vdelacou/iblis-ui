import { ButtonBase, Grid, Typography, withTheme, WithTheme } from '@material-ui/core';
import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { IblisButton, IblisTextField } from '../../../components/ui_components';

export interface ResetPasswordFormValues {
    /**
     * The email for resetPassword
     */
    email?: string;
}

export interface ResetPasswordFormProps {
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
    resetPassword(values: ResetPasswordFormValues): void;
    /*
     * The function to call when click on back
     */
    back(): void;
}

const ResetPasswordFormBase: React.StatelessComponent<ResetPasswordFormProps & InjectedFormProps<ResetPasswordFormValues, ResetPasswordFormProps> & WithTheme> = (props) => {

    const { emailLabel, backLabel, buttonLabelConfirm, isLoading, back, handleSubmit, submitting } = props;

    const submitForm = (form: ResetPasswordFormValues) => {
        props.resetPassword(form);
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
                        <Field
                            type="text"
                            name="email"
                            component={IblisTextField}
                            disabled={submitting || isLoading}
                            validate={[requiredTextField, validateEmail]}
                            fullWidth={true}
                            placeholder={emailLabel}
                        />
                    </Grid>
                </Grid>
                <Grid container={true} >&nbsp;</Grid>
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

function requiredTextField(value: string, _allValues: ResetPasswordFormValues, props: ResetPasswordFormProps) {
    return value && value.trim() !== '' ? undefined : props.requiredErrorLabel;
}

function validateEmail(value: string, _allValues: ResetPasswordFormValues, props: ResetPasswordFormProps) {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return props.emailNotValidErrorLabel;
    }
    return undefined;
}

const ResetPasswordWithTheme: React.ComponentType<ResetPasswordFormProps & InjectedFormProps<ResetPasswordFormValues, ResetPasswordFormProps>> =
    withTheme()(ResetPasswordFormBase);

/**
 * A form for resetPassword.
 */
export const ResetPasswordForm: React.ComponentType<ResetPasswordFormProps & InjectedFormProps<ResetPasswordFormValues, ResetPasswordFormProps>> = (ResetPasswordWithTheme);
