import { Grid, WithTheme, withTheme } from '@material-ui/core';
import { IblisButton, IblisTextField } from '@src/components';
import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { style } from './style';

export interface ManagedAddSimpleFormValues {
    /**
     * The value of the field in the form
     */
    entityName?: string;
}

export interface ManagedAddSimpleFormProps {
    /**
     * The placeholder label for the entityName field
     */
    namePlaceHolder: string;
    /**
     * The button label to launch main action
     */
    buttonLabelAdd: string;
    /**
     * To show to user that the action is loading
     * @default false
     */
    isLoading?: boolean;
    /**
     * To show error if validation function is not satisfied
     */
    validateFunctions: Array<(value: string, allValues: ManagedAddSimpleFormValues, props: ManagedAddSimpleFormProps) => string | undefined>;
    /**
     * The Function to call to add new entity
     */
    addAction(values: ManagedAddSimpleFormValues): void;
}

const ManagedAddSimpleFormBase:
    React.StatelessComponent<ManagedAddSimpleFormProps & InjectedFormProps<ManagedAddSimpleFormValues, ManagedAddSimpleFormProps> & WithTheme> = (props) => {

        const { namePlaceHolder, buttonLabelAdd, isLoading = false, validateFunctions, addAction, handleSubmit, submitting, reset, theme } = props;

        const submitForm = (values: ManagedAddSimpleFormValues) => {
            addAction(values);
            reset();
        };

        return (
            <div>
                <form
                    onSubmit={handleSubmit(submitForm)}
                    noValidate={true}
                >
                    <Grid container={true} >
                        {/* name */}
                        <Grid item={true} xs={8} style={style(theme).fieldContainer}>
                            <Field
                                type="text"
                                name="entityName"
                                component={IblisTextField}
                                disabled={submitting || isLoading}
                                validate={validateFunctions}
                                required={true}
                                placeholder={namePlaceHolder}
                                fullWidth={true}
                            />
                        </Grid>
                        {/* button */}
                        <Grid item={true} >
                            <IblisButton
                                buttonType="default"
                                buttonLabel={buttonLabelAdd}
                                type="submit"
                                isLoading={submitting || isLoading}
                            />
                        </Grid>
                    </Grid>
                </form>
            </div >
        );
    };

const ManagedAddSimpleFormWithTheme: React.ComponentClass<ManagedAddSimpleFormProps & InjectedFormProps<ManagedAddSimpleFormValues, ManagedAddSimpleFormProps>> =
    withTheme()(ManagedAddSimpleFormBase);

/**
 * Simple form with only one value to add
 */
export const ManagedAddSimpleForm: React.ComponentClass<ManagedAddSimpleFormProps & InjectedFormProps<ManagedAddSimpleFormValues, ManagedAddSimpleFormProps>> =
    (ManagedAddSimpleFormWithTheme);
