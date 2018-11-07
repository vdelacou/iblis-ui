import { Grid, Hidden, Typography } from '@material-ui/core';
import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { IblisButton, IblisSelectField, IblisTextField } from '../../../components/ui_components';

export interface UserProfileFormValues {
    /**
     * The firstName of the user
     */
    firstName?: string;
    /**
     * The lastName of the user
     */
    lastName?: string;
    /**
     * The email of the user
     */
    email?: string;
    /**
     * The language of the user
     */
    language?: string;
    /**
     * The id of the file to use for avatar
     */
    avatarFileId?: string | number;
}

export interface UserProfileFormProps {
    /**
     * The initial form values
     */
    initValues?: UserProfileFormValues;
    /**
     * The firstName label for the firstName field
     */
    firstNameLabel: string;
    /**
     * The lastName label for the lastName field
     */
    lastNameLabel: string;
    /**
     * The email label for the email field
     */
    emailLabel: string;
    /**
     * The language label for the language field
     */
    languageLabel: string;
    /**
     * The button label to launch main action
     */
    buttonLabelConfirm: string;
    /**
     * The error to show when form have no email
     */
    requiredErrorLabel: string;
    /**
     * The error to show when email is not correct
     */
    emailNotValidErrorLabel: string;
    /**
     * The list of possible language
     */
    languagePossibleValues: Array<{ id: string | number; value: string }>;
    /**
     * The component to display avatar
     */
    avatarComponent: React.ReactNode;
    /**
     * To show to user that the action is loading
     */
    isLoading?: boolean;
    /*
     * The function to call to login the user
     */
    updateUser(values: UserProfileFormValues): void;
}

const UserProfileFormBase: React.StatelessComponent<UserProfileFormProps & InjectedFormProps<UserProfileFormValues, UserProfileFormProps>> = (props) => {

    const {
        initValues, //
        firstNameLabel, lastNameLabel, emailLabel, languageLabel, //
        buttonLabelConfirm, languagePossibleValues, avatarComponent, isLoading, //
        updateUser, handleSubmit, submitting, initialize, initialized,
    } = props;

    if (initValues && !initialized) {
        initialize(initValues);
    }

    const submitForm = (values: UserProfileFormValues) => {
        updateUser(values);
    };

    return (
        <div>
            <Grid container={true} >
                <Grid item={true} sm={2} xs={12}>
                    {avatarComponent}
                </Grid>
                <Grid item={true} sm={1} xs={12}>&nbsp;</Grid>
                <Grid item={true} sm={9} xs={12}>
                    <form
                        onSubmit={handleSubmit(submitForm)}
                        noValidate={true}
                    >
                        {/* firstName */}
                        <Grid container={true} >
                            <Grid item={true} sm={2} xs={12}>
                                <Typography variant="body2">
                                    {firstNameLabel}
                                </Typography>
                            </Grid>
                            <Grid item={true} sm={6} xs={12}>
                                <Field
                                    type="text"
                                    name="firstName"
                                    component={IblisTextField}
                                    disabled={submitting || isLoading}
                                    validate={[requiredTextField]}
                                    required={true}
                                />
                            </Grid>
                        </Grid>
                        {/* lastName */}
                        <Grid container={true} >
                            <Grid item={true} sm={2} xs={12}>
                                <Typography variant="body2">
                                    {lastNameLabel}
                                </Typography>
                            </Grid>
                            <Grid item={true} sm={6} xs={12}>
                                <Field
                                    type="text"
                                    name="lastName"
                                    component={IblisTextField}
                                    disabled={submitting || isLoading}
                                    validate={[requiredTextField]}
                                    required={true}
                                />
                            </Grid>
                        </Grid>
                        {/* email */}
                        <Grid container={true} >
                            <Grid item={true} sm={2} xs={12}>
                                <Typography variant="body2">
                                    {emailLabel}
                                </Typography>
                            </Grid>
                            <Grid item={true} sm={6} xs={12}>
                                <Field
                                    type="text"
                                    name="email"
                                    component={IblisTextField}
                                    disabled={submitting || isLoading}
                                    validate={[requiredTextField, validateEmail]}
                                    required={true}
                                />
                            </Grid>
                        </Grid>
                        {/* lang */}
                        <Grid container={true} >
                            <Grid item={true} sm={2} xs={12}>
                                <Typography variant="body2">
                                    {languageLabel}
                                </Typography>
                            </Grid>
                            <Grid item={true} sm={6} xs={12}>
                                <Field
                                    type="text"
                                    name="language"
                                    component={IblisSelectField}
                                    disabled={submitting || isLoading}
                                    validate={[requiredTextField]}
                                    required={true}
                                    values={languagePossibleValues}
                                />
                            </Grid>
                        </Grid>
                        {/* hidden id file */}
                        <Field
                            type="hidden"
                            name="avatarFileId"
                            component={IblisTextField}
                        />
                        {/* button */}
                        <Grid container={true} >
                            <Hidden only={'xs'}>
                                <Grid item={true} sm={2} >
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
                </Grid>
            </Grid>
        </div>
    );
};

function requiredTextField(value: string, _allValues: UserProfileFormValues, props: UserProfileFormProps) {
    return value && value.trim() !== '' ? undefined : props.requiredErrorLabel;
}

function validateEmail(value: string, _allValues: UserProfileFormValues, props: UserProfileFormProps) {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return props.emailNotValidErrorLabel;
    }
    return undefined;
}

/**
 * A form to manage an user profile.
 */
export const UserProfileForm: React.StatelessComponent<UserProfileFormProps & InjectedFormProps<UserProfileFormValues, UserProfileFormProps>> = (UserProfileFormBase);
