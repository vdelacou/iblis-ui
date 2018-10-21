import { ButtonBase, Grid, Typography, withTheme, WithTheme } from '@material-ui/core';
import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { IblisButton, IblisTextField } from '../../../components/ui_components';

export interface LoginFormValues {
    /**
     * The email for login
     */
    email?: string;
    /**
     * The password for login
     */
    password?: string;
}

export interface LoginFormProps {
    /**
     * The email label for the email field
     */
    emailLabel: string;
    /**
     * The password label for the password field
     */
    passwordLabel: string;
    /**
     * The button label to launch main action
     */
    buttonLabelConfirm: string;
    /**
     * The forget password label
     */
    forgetPasswordLabel: string;
    /**
     * The create account label
     */
    createAccountLabel: string;
    /**
     * The minimum password length
     */
    minimumPasswordLength: number;
    /**
     * The maximum password length
     */
    maximumPasswordLength: number;
    /**
     * The error to show when form have no email
     */
    requiredErrorLabel: string;
    /**
     * The error to show when email is not correct
     */
    emailNotValidErrorLabel: string;
    /**
     * The error to show when password length is not correct
     */
    passwordLengthErrorLabel: string;
    /**
     * To show to user that the action is loading
     */
    isLoading?: boolean;
    /*
     * The function to call to login the user
     */
    login(values: LoginFormValues): void;
    /*
     * The function to call when click on create account
     */
    createAccount(): void;
    /*
     * The function to call when click on forget Password
     */
    forgetPassword(): void;
}

const LoginFormBase: React.StatelessComponent<LoginFormProps & InjectedFormProps<LoginFormValues, LoginFormProps> & WithTheme> = (props) => {

    const { emailLabel, passwordLabel, createAccountLabel, buttonLabelConfirm, forgetPasswordLabel, isLoading, forgetPassword, createAccount, handleSubmit, submitting } = props;

    const submitForm = (form: LoginFormValues) => {
        props.login(form);
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
                            required={true}
                        />
                    </Grid>
                </Grid>
                {/* password */}
                <Grid container={true} >
                    <Grid item={true} xs={12}>
                        <Field
                            type="password"
                            name="password"
                            component={IblisTextField}
                            disabled={submitting || isLoading}
                            validate={[requiredTextField, validateLengthPassword]}
                            fullWidth={true}
                            placeholder={passwordLabel}
                            required={true}
                        />
                    </Grid>
                </Grid>
                {/* forget password */}
                <Grid container={true} justify="flex-end" >
                    <Grid item={true}>
                        <Typography align="center">
                            <ButtonBase onClick={() => forgetPassword()} disabled={submitting || isLoading}>
                                {forgetPasswordLabel}
                            </ButtonBase>
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container={true} >&nbsp;</Grid>
                <Grid container={true} justify="space-between" >
                    {/* create account */}
                    <Grid item={true} >
                        <Typography variant="subheading">
                            <ButtonBase onClick={() => createAccount()} disabled={submitting || isLoading}>
                                {createAccountLabel}
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

function requiredTextField(value: string, _allValues: LoginFormValues, props: LoginFormProps) {
    return value && value.trim() !== '' ? undefined : props.requiredErrorLabel;
}

function validateEmail(value: string, _allValues: LoginFormValues, props: LoginFormProps) {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return props.emailNotValidErrorLabel;
    }
    return undefined;
}

function validateLengthPassword(value: string, _allValues: LoginFormValues, props: LoginFormProps) {
    if (value.length < props.minimumPasswordLength || value.length > props.maximumPasswordLength) {
        return props.passwordLengthErrorLabel;
    }
    return undefined;
}

const LoginWithTheme: React.ComponentType<LoginFormProps & InjectedFormProps<LoginFormValues, LoginFormProps>> =
    withTheme()(LoginFormBase);

/**
 * A form for login.
 */
export const LoginForm: React.ComponentType<LoginFormProps & InjectedFormProps<LoginFormValues, LoginFormProps>> = (LoginWithTheme);
