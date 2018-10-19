import { ButtonBase, Grid, Typography, withTheme, WithTheme } from '@material-ui/core';
import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { IblisButton, IblisTextField } from '../../../components/ui_components';

export interface SignupFormValues {
    /**
     * The email for signup
     */
    email?: string;
    /**
     * The password for signup
     */
    password?: string;
    /**
     * The password to type again to be sure that there is no typing mistake
     */
    passwordAgain?: string;
}

export interface SignupFormProps {
    /**
     * The email label for the email field
     */
    emailLabel: string;
    /**
     * The password label for the password field
     */
    passwordLabel: string;
    /**
     * The password again label for the password again field
     */
    passwordAgainLabel: string;
    /**
     * The button label to launch main action
     */
    buttonLabelConfirm: string;
    /**
     * The go back label
     */
    backLabel: string;
    /**
     * The minimum password length
     */
    minimumPasswordLength: number;
    /**
     * The maximum password length
     */
    maximumPasswordLength: number;
    /**
     * The number of minimum uppercase letter needed
     */
    minimumUppercasePassword: number;
    /**
     * The error to show when number upercase is not correct
     */
    minimumUppercaseErrorLabel: string;
    /**
     * The number of minimum lowercase letter needed
     */
    minimumLowercasePassword: number;
    /**
     * The error to show when number lowercase is not correct
     */
    minimumLowercaseErrorLabel: string;
    /**
     * The number of minimum digit needed
     */
    minimumDigitPassword: number;
    /**
     * The error to show when number digit is not correct
     */
    minimumDigitErrorLabel: string;
    /**
     * The number of special char needed : $@$!%*#?&
     */
    minimumSpecialCharPassword: number;
    /**
     * The error to show when number special char is not correct
     */
    minimumSpecialCharErrorLabel: string;
    /**
     * The error to show when email is not valid
     */
    emailNotValidErrorLabel: string;
    /**
     * The error to show when password length is not correct
     */
    passwordLengthErrorLabel: string;
    /**
     * The error to show when password are not identical
     */
    passwordNotIdentical: string;
    /**
     * The error to show when form have no email
     */
    requiredErrorLabel: string;
    /**
     * To show to user that the action is loading
     */
    isLoading?: boolean;
    /*
     * The function to call to signup the user
     */
    signup(values: SignupFormValues): void;
    /*
     * The function to call when click on back button
     */
    back(): void;
}

const SignupFormBase: React.StatelessComponent<SignupFormProps & InjectedFormProps<SignupFormValues, SignupFormProps> & WithTheme> = (props) => {

    const { emailLabel, passwordLabel, passwordAgainLabel, buttonLabelConfirm, backLabel, isLoading, back, handleSubmit, submitting } = props;

    const submitForm = (form: SignupFormValues) => {
        props.signup(form);
    };

    const validatePasswordList =
        [requiredTextField, validatePassword, validatePasswordLength, validatePasswordUppercase, validatePasswordLowercase, validatePasswordSpecialChar, validatePasswordDigit];

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
                {/* password */}
                <Grid container={true} >
                    <Grid item={true} xs={12}>
                        <Field
                            type="password"
                            name="password"
                            component={IblisTextField}
                            disabled={submitting || isLoading}
                            validate={validatePasswordList}
                            fullWidth={true}
                            placeholder={passwordLabel}
                        />
                    </Grid>
                </Grid>
                {/* passwordAgain */}
                <Grid container={true} >
                    <Grid item={true} xs={12}>
                        <Field
                            type="password"
                            name="passwordAgain"
                            component={IblisTextField}
                            disabled={submitting || isLoading}
                            validate={validatePasswordList}
                            fullWidth={true}
                            placeholder={passwordAgainLabel}
                        />
                    </Grid>
                </Grid>
                <Grid container={true} justify="space-between" >
                    {/* back */}
                    <Grid item={true} >
                        <Typography variant={'subheading'} >
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

function requiredTextField(value: string, _allValues: SignupFormValues, props: SignupFormProps) {
    return value && value.trim() !== '' ? undefined : props.requiredErrorLabel;
}

function validateEmail(value: string, _allValues: SignupFormValues, props: SignupFormProps) {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return props.emailNotValidErrorLabel;
    }
    return undefined;
}

function validatePassword(value: string, allValues: SignupFormValues, props: SignupFormProps) {
    if (value !== allValues.password) {
        return props.passwordNotIdentical;
    }
    return undefined;
}

function validatePasswordLength(value: string, _allValues: SignupFormValues, props: SignupFormProps) {
    if (value.length < props.minimumPasswordLength || value.length > props.maximumPasswordLength) {
        return props.passwordLengthErrorLabel;
    }
    return undefined;
}

function validatePasswordUppercase(value: string, _allValues: SignupFormValues, props: SignupFormProps) {
    const numUpper = value.length - value.replace(/[A-Z]/g, '').length;
    if (numUpper < props.minimumUppercasePassword) {
        return props.minimumUppercaseErrorLabel;
    }
    return undefined;
}

function validatePasswordLowercase(value: string, _allValues: SignupFormValues, props: SignupFormProps) {
    const numLower = value.length - value.replace(/[a-z]/g, '').length;
    if (numLower < props.minimumLowercasePassword) {
        return props.minimumLowercaseErrorLabel;
    }
    return undefined;
}

function validatePasswordSpecialChar(value: string, _allValues: SignupFormValues, props: SignupFormProps) {
    const numSpecial = value.length - value.replace(/[$@$!%*#?&]/g, '').length;
    if (numSpecial < props.minimumSpecialCharPassword) {
        return props.minimumSpecialCharErrorLabel;
    }
    return undefined;
}

function validatePasswordDigit(value: string, _allValues: SignupFormValues, props: SignupFormProps) {
    const numDigit = value.length - value.replace(/[0-9]/g, '').length;
    if (numDigit < props.minimumDigitPassword) {
        return props.minimumDigitErrorLabel;
    }
    return undefined;
}
const SignupWithTheme: React.ComponentType<SignupFormProps & InjectedFormProps<SignupFormValues, SignupFormProps>> =
    withTheme()(SignupFormBase);

/**
 * A form for signup.
 */
export const SignupForm: React.ComponentType<SignupFormProps & InjectedFormProps<SignupFormValues, SignupFormProps>> = (SignupWithTheme);
