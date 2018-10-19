import { Grid, Hidden, Theme, Tooltip, Typography, withTheme, WithTheme } from '@material-ui/core';
import { Help } from '@material-ui/icons';
import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { IblisButton, IblisTextField } from '../../../components/ui_components';
import { style } from './style';

export interface ChangePasswordFormValues {
    /**
     * The previous password of the user
     */
    oldPassword?: string;
    /**
     * The password to set
     */
    password?: string;
    /**
     * The password to type again to be sure that there is no typing mistake
     */
    passwordAgain?: string;
}

export interface ChangePasswordFormProps {
    /**
     * The previous password label for the password field
     */
    oldPasswordLabel: string;
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
     * The label to explain password
     */
    passwordExplainLabel: string;
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
    setPassword(values: ChangePasswordFormValues): void;
}

const ChangePasswordFormBase: React.StatelessComponent<ChangePasswordFormProps & InjectedFormProps<ChangePasswordFormValues, ChangePasswordFormProps> & WithTheme> = (props) => {

    const { oldPasswordLabel, passwordLabel, passwordAgainLabel, buttonLabelConfirm, passwordExplainLabel, isLoading, handleSubmit, submitting, reset, setPassword, theme } = props;

    const submitForm = (values: ChangePasswordFormValues) => {
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
                {/* old password */}
                {renderFormField('password', 'oldPassword', oldPasswordLabel, submitting, false, passwordExplainLabel, theme, [requiredTextField], isLoading)}
                {/* password */}
                {renderFormField('password', 'password', passwordLabel, submitting, true, passwordExplainLabel, theme, validatePasswordList, isLoading)}
                {/* password Again */}
                {renderFormField('password', 'passwordAgain', passwordAgainLabel, submitting, false, passwordExplainLabel, theme, validatePasswordList, isLoading)}
                {/* button */}
                <Grid container={true} >
                    <Hidden only={'xs'}>
                        <Grid item={true} sm={3} >
                            {' '}
                        </Grid>
                    </Hidden>
                    <Grid item={true} sm={6} xs={12} >
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
    type: string, fieldName: string, label: string, submitting: boolean, needHelpPassword: boolean, passwordExplainLabel: string, theme: Theme,
    validateFunction: Array<(value: string, allValues: ChangePasswordFormValues, props: ChangePasswordFormProps) => string | undefined>, isLoading?: boolean) {
    const renderHelpPassword = () => {
        if (needHelpPassword) {
            return (
                <Hidden only={'xs'}>
                    <Tooltip title={passwordExplainLabel} placement={'right'}>
                        <Help color="action" style={style(theme).icon} />
                    </Tooltip>
                </Hidden>
            );
        }
        return undefined;
    };
    return (
        <Grid container={true} >
            <Grid item={true} sm={3} xs={12}>
                <Typography variant="body2">
                    {label}
                </Typography>
            </Grid>
            <Grid item={true} sm={6} xs={12}>
                <Field
                    type={type}
                    name={fieldName}
                    component={IblisTextField}
                    disabled={submitting || isLoading}
                    validate={validateFunction}
                    required={true}
                    fullWidth={true}
                />
            </Grid>
            {renderHelpPassword()}
        </Grid>
    );
}

function requiredTextField(value: string, _allValues: ChangePasswordFormValues, props: ChangePasswordFormProps) {
    return value && value.trim() !== '' ? undefined : props.requiredErrorLabel;
}

function validatePassword(value: string, allValues: ChangePasswordFormValues, props: ChangePasswordFormProps) {
    if (value !== allValues.password) {
        return props.passwordNotIdentical;
    }
    return undefined;
}

function validatePasswordLength(value: string, _allValues: ChangePasswordFormValues, props: ChangePasswordFormProps) {
    if (value.length < props.minimumPasswordLength || value.length > props.maximumPasswordLength) {
        return props.passwordLengthErrorLabel;
    }
    return undefined;
}

function validatePasswordUppercase(value: string, _allValues: ChangePasswordFormValues, props: ChangePasswordFormProps) {
    const numUpper = value.length - value.replace(/[A-Z]/g, '').length;
    if (numUpper < props.minimumUppercasePassword) {
        return props.minimumUppercaseErrorLabel;
    }
    return undefined;
}

function validatePasswordLowercase(value: string, _allValues: ChangePasswordFormValues, props: ChangePasswordFormProps) {
    const numLower = value.length - value.replace(/[a-z]/g, '').length;
    if (numLower < props.minimumLowercasePassword) {
        return props.minimumLowercaseErrorLabel;
    }
    return undefined;
}

function validatePasswordSpecialChar(value: string, _allValues: ChangePasswordFormValues, props: ChangePasswordFormProps) {
    const numSpecial = value.length - value.replace(/[$@$!%*#?&]/g, '').length;
    if (numSpecial < props.minimumSpecialCharPassword) {
        return props.minimumSpecialCharErrorLabel;
    }
    return undefined;
}

function validatePasswordDigit(value: string, _allValues: ChangePasswordFormValues, props: ChangePasswordFormProps) {
    const numDigit = value.length - value.replace(/[0-9]/g, '').length;
    if (numDigit < props.minimumDigitPassword) {
        return props.minimumDigitErrorLabel;
    }
    return undefined;
}

const ChangePasswordWithTheme: React.ComponentType<ChangePasswordFormProps & InjectedFormProps<ChangePasswordFormValues, ChangePasswordFormProps>> =
    withTheme()(ChangePasswordFormBase);

/**
 * A form to ask old password and confirm a new password.
 * The old password format is not checked, the new password must respect format.
 * Password can be checked with , length, number of uppercase, lowercase, digits and special characters
 */
export const ChangePasswordForm: React.ComponentType<ChangePasswordFormProps & InjectedFormProps<ChangePasswordFormValues, ChangePasswordFormProps>> = (ChangePasswordWithTheme);
