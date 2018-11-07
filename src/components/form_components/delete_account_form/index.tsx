import { Checkbox, FormControlLabel, Grid, Hidden, Typography, withTheme, WithTheme } from '@material-ui/core';
import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { IblisButton, IblisTextField } from '../../../components/ui_components';
import { style } from './style';

export interface DeleteAccountFormValues {
    /**
     * The comments why need leave
     */
    leaveComments?: string;
    /**
     * The email of the account to delete
     */
    email?: string;
}

export interface DeleteAccountFormProps {
    /**
     * The comments label for the comments field
     */
    leaveCommentsLabel: string;
    /**
     * The comments label for the comments field
     */
    checkboxLabel: string;
    /**
     * The email label for the email field
     */
    emailLabel: string;
    /**
     * The first button label to confirm delete
     */
    firstButtonLabelConfirm: string;
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
     * To show to user that the action is loading
     */
    isLoading?: boolean;
    /*
     * The function to call to delete the account
     */
    deleteAccount(values: DeleteAccountFormValues): void;
}

class DeleteAccountFormState {
    /**
     * When agreed checked button is enabled
     * @default false
     */
    readonly agreeChecked: boolean = false;
    /**
     * When we display the form to ask for email
     * @default false
     */
    readonly confirmWithEmail: boolean = false;
}

class DeleteAccountFormBase extends React.PureComponent<
    DeleteAccountFormProps & InjectedFormProps<DeleteAccountFormValues, DeleteAccountFormProps> & WithTheme,
    DeleteAccountFormState
    > {

    readonly state = new DeleteAccountFormState();

    renderCheckBox = () => {
        return (
            <Checkbox
                onChange={() => this.setState(() => { return { agreeChecked: !this.state.agreeChecked }; })}
                color={'primary'}
                disabled={this.state.confirmWithEmail || this.props.isLoading}
            />
        );
    }

    renderEmailForm = () => {
        if (this.state.confirmWithEmail) {
            return (
                <div style={style(this.props.theme).containerEmailForm}>
                    {/* email */}
                    <Grid container={true} >
                        <Grid item={true} sm={3} xs={12}>
                            <Typography variant="body2">
                                {' '}
                            </Typography>
                        </Grid>
                        <Grid item={true} sm={9} xs={12}>
                            <Typography variant="body2">
                                {this.props.emailLabel}
                            </Typography>
                        </Grid>
                        <Grid item={true} sm={12} xs={12}>
                            {' '}
                        </Grid>
                        <Grid item={true} sm={3} xs={12}>
                            {' '}
                        </Grid>
                        <Grid item={true} sm={8} xs={12}>
                            <Field
                                type="text"
                                name="email"
                                component={IblisTextField}
                                validate={[requiredTextField, validateEmail]}
                                required={true}
                                disabled={this.props.submitting || this.props.isLoading}
                            />
                        </Grid>
                    </Grid >
                    {/* button */}
                    < Grid container={true} >
                        <Hidden only={'xs'}>
                            <Grid item={true} sm={3} >
                                {' '}
                            </Grid>
                        </Hidden>
                        <Grid item={true} sm={8} xs={12} >
                            <IblisButton
                                buttonType={'primary'}
                                buttonLabel={this.props.buttonLabelConfirm}
                                type="submit"
                                isLoading={this.props.submitting || this.props.isLoading}
                            />
                        </Grid>
                    </Grid >
                </div >
            );
        } else {
            return null;
        }
    }

    render(): React.ReactNode {
        const {
            leaveCommentsLabel, checkboxLabel, firstButtonLabelConfirm,
            isLoading, handleSubmit, submitting, deleteAccount,
        } = this.props;

        const submitForm = (values: DeleteAccountFormValues) => {
            deleteAccount(values);
        };

        return (
            <div>
                <form
                    onSubmit={handleSubmit(submitForm)}
                    noValidate={true}
                >
                    {/* leaveComments */}
                    <Grid container={true} >
                        <Grid item={true} sm={3} xs={12}>
                            <Typography variant="body2">
                                {leaveCommentsLabel}
                            </Typography>
                        </Grid>
                        <Grid item={true} sm={8} xs={12}>
                            <Field
                                type="text"
                                name="leaveComments"
                                component={IblisTextField}
                                disabled={submitting || isLoading}
                                multiline={true}
                                rows={3}
                            />
                        </Grid>
                    </Grid>
                    {/* agree */}
                    <Grid container={true} >
                        <Grid item={true} sm={3} xs={12}>
                            <Typography variant="body2">
                                {' '}
                            </Typography>
                        </Grid>
                        <Grid item={true} sm={8} xs={12}>
                            <FormControlLabel
                                control={this.renderCheckBox()}
                                label={checkboxLabel}
                            />
                        </Grid>
                    </Grid>
                    {/* first button */}
                    <Grid container={true} >
                        <Hidden only={'xs'}>
                            <Grid item={true} sm={3} >
                                {' '}
                            </Grid>
                        </Hidden>
                        <Grid item={true} sm={8} xs={12} >
                            <IblisButton
                                buttonType={'default'}
                                buttonLabel={firstButtonLabelConfirm}
                                isLoading={submitting || isLoading}
                                disabled={!this.state.agreeChecked}
                                onClick={() => this.setState(() => { return { confirmWithEmail: !this.state.confirmWithEmail }; })}
                            />
                        </Grid>
                    </Grid>
                    {this.renderEmailForm()}
                </form>
            </div >
        );
    }
}

function requiredTextField(value: string, _allValues: DeleteAccountFormValues, props: DeleteAccountFormProps) {
    return value && value.trim() !== '' ? undefined : props.requiredErrorLabel;
}

function validateEmail(value: string, _allValues: DeleteAccountFormValues, props: DeleteAccountFormProps) {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return props.emailNotValidErrorLabel;
    }
    return undefined;
}

const DeleteAccountWithTheme: React.ComponentType<DeleteAccountFormProps & InjectedFormProps<DeleteAccountFormValues, DeleteAccountFormProps>>
    = withTheme()(DeleteAccountFormBase);

/* *
 * Form to delete an account.
 * User can leave comments and then to confirm the action the user need checked and then confirm it's email address
 */
export const DeleteAccountForm: React.ComponentType<DeleteAccountFormProps & InjectedFormProps<DeleteAccountFormValues, DeleteAccountFormProps>> = (DeleteAccountWithTheme);
