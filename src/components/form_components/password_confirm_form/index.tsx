import { ButtonBase, Grid, Typography, withTheme, WithTheme } from '@material-ui/core';
import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { IblisButton, IblisTextField } from '../../../components/ui_components';

export interface PasswordConfirmFormValues {
    /**
     * The code for passwordConfirm
     */
    code?: string;
    /**
     * The password for passwordConfirm
     */
    password?: string;
    /**
     * The password to type again to be sure that there is no typing mistake
     */
    passwordAgain?: string;
}

export interface PasswordConfirmFormProps {
    /**
     * The code label for the code field
     */
    codeLabel: string;
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
     * The function to call to passwordConfirm the user
     */
    passwordConfirm(values: PasswordConfirmFormValues): void;
    /*
     * The function to call when click on back button
     */
    back(): void;
}

const PasswordConfirmFormBase:
    React.StatelessComponent<PasswordConfirmFormProps & InjectedFormProps<PasswordConfirmFormValues, PasswordConfirmFormProps> & WithTheme> = (props) => {

        const { codeLabel, passwordLabel, passwordAgainLabel, buttonLabelConfirm, backLabel, isLoading, back, handleSubmit, submitting } = props;

        const submitForm = (form: PasswordConfirmFormValues) => {
            props.passwordConfirm(form);
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
                                type="number"
                                name="code"
                                component={IblisTextField}
                                disabled={submitting || isLoading}
                                validate={[requiredTextField]}
                                placeholder={codeLabel}
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
                                validate={validatePasswordList}
                                placeholder={passwordLabel}
                                required={true}
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
                                placeholder={passwordAgainLabel}
                                required={true}
                            />
                        </Grid>
                    </Grid>
                    <Grid container={true} >&nbsp;</Grid>
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

function requiredTextField(value: string, _allValues: PasswordConfirmFormValues, props: PasswordConfirmFormProps) {
    return value && value.trim() !== '' ? undefined : props.requiredErrorLabel;
}

function validatePassword(value: string, allValues: PasswordConfirmFormValues, props: PasswordConfirmFormProps) {
    if (value !== allValues.password) {
        return props.passwordNotIdentical;
    }
    return undefined;
}

function validatePasswordLength(value: string, _allValues: PasswordConfirmFormValues, props: PasswordConfirmFormProps) {
    if (value.length < props.minimumPasswordLength || value.length > props.maximumPasswordLength) {
        return props.passwordLengthErrorLabel;
    }
    return undefined;
}

function validatePasswordUppercase(value: string, _allValues: PasswordConfirmFormValues, props: PasswordConfirmFormProps) {
    const numUpper = value.length - value.replace(/[A-Z]/g, '').length;
    if (numUpper < props.minimumUppercasePassword) {
        return props.minimumUppercaseErrorLabel;
    }
    return undefined;
}

function validatePasswordLowercase(value: string, _allValues: PasswordConfirmFormValues, props: PasswordConfirmFormProps) {
    const numLower = value.length - value.replace(/[a-z]/g, '').length;
    if (numLower < props.minimumLowercasePassword) {
        return props.minimumLowercaseErrorLabel;
    }
    return undefined;
}

function validatePasswordSpecialChar(value: string, _allValues: PasswordConfirmFormValues, props: PasswordConfirmFormProps) {
    const numSpecial = value.length - value.replace(/[$@$!%*#?&]/g, '').length;
    if (numSpecial < props.minimumSpecialCharPassword) {
        return props.minimumSpecialCharErrorLabel;
    }
    return undefined;
}

function validatePasswordDigit(value: string, _allValues: PasswordConfirmFormValues, props: PasswordConfirmFormProps) {
    const numDigit = value.length - value.replace(/[0-9]/g, '').length;
    if (numDigit < props.minimumDigitPassword) {
        return props.minimumDigitErrorLabel;
    }
    return undefined;
}
const PasswordConfirmWithTheme: React.ComponentType<PasswordConfirmFormProps & InjectedFormProps<PasswordConfirmFormValues, PasswordConfirmFormProps>> =
    withTheme()(PasswordConfirmFormBase);

/**
 * A form for passwordConfirm.
 */
export const PasswordConfirmForm:
    React.ComponentType<PasswordConfirmFormProps & InjectedFormProps<PasswordConfirmFormValues, PasswordConfirmFormProps>> = (PasswordConfirmWithTheme);
