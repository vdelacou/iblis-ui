import { ManagedAddSimpleForm, ManagedAddSimpleFormProps, ManagedAddSimpleFormValues } from '@src/components/form_components/managed_simple_add_form';
import { ManagedSimpleListForm, ManagedSimpleListFormProps, ManagedSimpleListFormValues } from '@src/components/form_components/managed_simple_list_form';
import { readObjectProp } from '@src/utils';
import * as React from 'react';
import { ConfigProps, reduxForm } from 'redux-form';

export interface ManagedSimpleFormProps {
    /**
     * The data to manage
     */
    data: object[];
    /**
     * The id field name in the data object
     */
    idFieldName: string;
    /**
     * The field name of the attribute to display in the data object
     */
    displayFieldName: string;
    /**
     * The placeholder label for the entityName field
     */
    namePlaceHolder: string;
    /**
     * The button label to launch main action
     * @default Add
     */
    buttonLabelAdd?: string;
    /**
     * To show error if add validation function is not satisfied
     * @default [(value: string, allValues: ManagedAddSimpleFormValues, props: ManagedAddSimpleFormProps) => {return value ? undefined : 'Required';}]
     */
    validateAddFunctions?: Array<(value: string, allValues: ManagedAddSimpleFormValues, props: ManagedAddSimpleFormProps) => string | undefined>;
    /**
     * To show error if add validation function is not satisfied
     * @default [(value: string, allValues: ManagedSimpleListFormValues, props: ManagedSimpleListFormProps) => {return value ? undefined : 'Required';}]
     */
    validateEditFunctions?: Array<(value: string, allValues: ManagedSimpleListFormValues, props: ManagedSimpleListFormProps) => string | undefined>;
    /**
     * To show to user that the action is loading
     * @default false
     */
    isLoading?: boolean;
    /**
     * The text to display on edit menu button
     * @default Edit
     */
    editLabel?: string;
    /**
     * The text to display on delete menu button
     * @default Delete
     */
    deleteLabel?: string;
    /**
     * To show in the menu the edit button
     * @default true
     */
    hasEdit?: boolean;
    /**
     * To show in the menu the deletee button
     * @default true
     */
    hasDelete?: boolean;
    /**
     * The name of the form to use in redux-form, if multiple form in the same component is used, it could be useful to change the name
     * @default ManagedSimpleForm
     */
    formName?: string;
    /**
     * The Function to call to add new entity, you need to give the new data to the components after add it to pass the id
     */
    addAction(values: object): void;
    /*
     * The Function to call to edit entity
     */
    editAction(values: object): void;
    /*
     * The Function to call to delete entity
     */
    deleteAction(id: string | number): void;
}

const ManagedSimpleFormBase: React.StatelessComponent<ManagedSimpleFormProps> = (props) => {

    const {
        data,
        idFieldName, displayFieldName,
        namePlaceHolder,
        buttonLabelAdd = 'Add',
        validateAddFunctions = [requiredAddTextField],
        validateEditFunctions = [requiredEditTextField],
        isLoading = false,
        editLabel = 'Edit',
        deleteLabel = 'Delete',
        hasEdit = true,
        hasDelete = true,
        formName = 'ManagedSimpleForm',
    } = props;

    const addData = (values: ManagedAddSimpleFormValues) => {
        const fieldToAdd = {
            [displayFieldName]: values.entityName,
        };
        props.addAction(fieldToAdd);
    };

    const updateData = (values: ManagedSimpleListFormValues) => {
        const dataConverted: ManagedSimpleListFormValues[] = props.data.map((entity) => {
            return {
                entityId: readObjectProp(entity, idFieldName),
                entityName: readObjectProp(entity, displayFieldName),
            };
        });
        const indexObjectToUpdate: number = dataConverted.findIndex((entity) => entity.entityId === values.entityId);
        const objectFound = props.data[indexObjectToUpdate];
        const fieldToUpdate = {
            [displayFieldName]: values.entityName,
        };
        const objectToUpdate = Object.assign({}, objectFound, fieldToUpdate);
        props.editAction(objectToUpdate);
    };

    const deleteData = (id: string | number) => {
        props.deleteAction(id);
    };

    const renderFormList = () => {

        return data.map((entity) => {

            // convert to ManagedSimpleListFormValues
            const dataConverted: ManagedSimpleListFormValues = {
                entityId: readObjectProp(entity, idFieldName),
                entityName: readObjectProp(entity, displayFieldName),
            };
            const config = (): ConfigProps<ManagedSimpleListFormValues, ManagedSimpleListFormProps> => {
                const configForm: ConfigProps<ManagedSimpleListFormValues, ManagedSimpleListFormProps> = {
                    form: formName + dataConverted.entityId,
                };
                return configForm;
            };
            const ConnectedForm = reduxForm(config())(ManagedSimpleListForm);

            return (
                <div key={readObjectProp(entity, idFieldName)} >
                    <ConnectedForm
                        initValues={dataConverted}
                        editLabel={editLabel}
                        deleteLabel={deleteLabel}
                        validateFunctions={validateEditFunctions}
                        isLoading={isLoading}
                        editAction={(values: ManagedSimpleListFormValues) => updateData(values)}
                        deleteAction={(id: string | number) => deleteData(id)}
                        hasEdit={hasEdit}
                        hasDelete={hasDelete}
                    />
                </div >
            );
        });
    };

    const renderAddForm = () => {

        // configure the form
        const config = (): ConfigProps<ManagedAddSimpleFormValues, ManagedAddSimpleFormProps> => {
            const configForm: ConfigProps<ManagedAddSimpleFormValues, ManagedAddSimpleFormProps> = {
                form: formName,
            };
            return configForm;
        };
        // connect the form
        const ConnectedForm = reduxForm(config())(ManagedAddSimpleForm);
        return (
            <ConnectedForm
                namePlaceHolder={namePlaceHolder}
                buttonLabelAdd={buttonLabelAdd}
                validateFunctions={validateAddFunctions}
                isLoading={isLoading}
                addAction={(values: ManagedSimpleListFormValues) => addData(values)}
            />
        );
    };

    return (
        <div>
            {renderAddForm()}
            {renderFormList()}
        </div>
    );
};

const requiredAddTextField = (value: string, _allValues: ManagedAddSimpleFormValues, _props: ManagedAddSimpleFormProps) => {
    return value ? undefined : 'Required';
};
const requiredEditTextField = (value: string, _allValues: ManagedSimpleListFormValues, _props: ManagedSimpleListFormProps) => {
    return value ? undefined : 'Required';
};

/**
 * A component form with full management of an entity list.
 * This component doesn't put the entity list in a state, to add element to the list, you need change the data properties
 */
export const ManagedSimpleForm: React.StatelessComponent<ManagedSimpleFormProps> = ManagedSimpleFormBase;
