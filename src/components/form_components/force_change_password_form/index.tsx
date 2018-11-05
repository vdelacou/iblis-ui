import { Grid } from '@material-ui/core';
import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { IblisButton, IblisTextField } from '../../../components/ui_components';

export interface ForceChangePasswordFormValues {
    /**
     * The previous password of the user
     */
    password?: string;
    /**
     * The password to set
     */
    passwordAgain?: string;
}

export interface ForceChangePasswordFormProps {
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
     * The minimum password length
     */
    minimumPasswordLength: number;
    /**
     * The maximum password length
     */
    maximumPasswordLength: number;
    /**
     * The error to show when password length is not correct
     */
    passwordLengthErrorLabel: string;
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
     * The error to show when form have no email
     */
    requiredErrorLabel: string;
    /**
     * The error to show when password are not identical
     */
    passwordNotIdentical: string;
    /**
     * To show to user that the action is loading
     */
    isLoading?: boolean;
    /*
     * The function to call to set the new password
     */
    setPassword(values: ForceChangePasswordFormValues): void;
}

const ForceChangePasswordFormBase:
    React.StatelessComponent<ForceChangePasswordFormProps & InjectedFormProps<ForceChangePasswordFormValues, ForceChangePasswordFormProps>>
    = (props) => {

        const { passwordLabel, passwordAgainLabel, buttonLabelConfirm, isLoading, handleSubmit, submitting, reset, setPassword } = props;

        const submitForm = (values: ForceChangePasswordFormValues) => {
            setPassword(values);
            reset();
        };

        const validatePasswordList =
            [requiredTextField, validatePassword, validatePasswordLength, validatePasswordUppercase, validatePasswordLowercase, validatePasswordSpecialChar, validatePasswordDigit];

        return (
            <div>
                <form
                    onSubmit={handleSubmit(submitForm)}
                    noValidate={true}
                >
                    {/* password */}
                    {renderFormField('password', 'password', passwordLabel, submitting, validatePasswordList, isLoading)}
                    {/* password Again */}
                    {renderFormField('password', 'passwordAgain', passwordAgainLabel, submitting, validatePasswordList, isLoading)}
                    <Grid container={true} >&nbsp;</Grid>
                    {/* button */}
                    <Grid container={true} justify="flex-end" >
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

function renderFormField(
    type: string, fieldName: string, label: string, submitting: boolean,
    validateFunction: Array<(value: string, allValues: ForceChangePasswordFormValues, props: ForceChangePasswordFormProps) => string | undefined>, isLoading?: boolean) {
    return (
        <Grid container={true} >
            <Grid item={true} xs={12}>
                <Field
                    type={type}
                    name={fieldName}
                    component={IblisTextField}
                    disabled={submitting || isLoading}
                    validate={validateFunction}
                    fullWidth={true}
                    placeholder={label}
                    required={true}
                />
            </Grid>
        </Grid>
    );
}

function requiredTextField(value: string, _allValues: ForceChangePasswordFormValues, props: ForceChangePasswordFormProps) {
    return value && value.trim() !== '' ? undefined : props.requiredErrorLabel;
}

function validatePassword(value: string, allValues: ForceChangePasswordFormValues, props: ForceChangePasswordFormProps) {
    if (value !== allValues.password) {
        return props.passwordNotIdentical;
    }
    return undefined;
}

function validatePasswordLength(value: string, _allValues: ForceChangePasswordFormValues, props: ForceChangePasswordFormProps) {
    if (value.length < props.minimumPasswordLength || value.length > props.maximumPasswordLength) {
        return props.passwordLengthErrorLabel;
    }
    return undefined;
}

function validatePasswordUppercase(value: string, _allValues: ForceChangePasswordFormValues, props: ForceChangePasswordFormProps) {
    const numUpper = value.length - value.replace(/[A-Z]/g, '').length;
    if (numUpper < props.minimumUppercasePassword) {
        return props.minimumUppercaseErrorLabel;
    }
    return undefined;
}

function validatePasswordLowercase(value: string, _allValues: ForceChangePasswordFormValues, props: ForceChangePasswordFormProps) {
    const numLower = value.length - value.replace(/[a-z]/g, '').length;
    if (numLower < props.minimumLowercasePassword) {
        return props.minimumLowercaseErrorLabel;
    }
    return undefined;
}

function validatePasswordSpecialChar(value: string, _allValues: ForceChangePasswordFormValues, props: ForceChangePasswordFormProps) {
    const numSpecial = value.length - value.replace(/[$@$!%*#?&]/g, '').length;
    if (numSpecial < props.minimumSpecialCharPassword) {
        return props.minimumSpecialCharErrorLabel;
    }
    return undefined;
}

function validatePasswordDigit(value: string, _allValues: ForceChangePasswordFormValues, props: ForceChangePasswordFormProps) {
    const numDigit = value.length - value.replace(/[0-9]/g, '').length;
    if (numDigit < props.minimumDigitPassword) {
        return props.minimumDigitErrorLabel;
    }
    return undefined;
}

/**
 * A form to ask old password and confirm a new password.
 * The old password format is not checked, the new password must respect format.
 * Password can be checked with , length, number of uppercase, lowercase, digits and special characters
 */
export const ForceChangePasswordForm:
    React.ComponentType<ForceChangePasswordFormProps & InjectedFormProps<ForceChangePasswordFormValues, ForceChangePasswordFormProps>> =
    (ForceChangePasswordFormBase);
