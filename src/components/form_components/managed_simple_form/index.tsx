import * as React from 'react';
import { ConfigProps, reduxForm } from 'redux-form';
import { ManagedAddSimpleForm, ManagedAddSimpleFormProps, ManagedAddSimpleFormValues } from '../../../components/form_components/managed_simple_add_form';
import { ManagedSimpleListForm, ManagedSimpleListFormProps, ManagedSimpleListFormValues } from '../../../components/form_components/managed_simple_list_form';
import { readObjectProp } from '../../../utils';

export interface ManagedSimpleFormData<T> {
    /**
     * The entity to manage
     */
    entity: T;
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
     * The component to display if needed at the left of the form
     */
    leftComponent?: React.ReactNode;
    /**
     * A list of label and action to add to the menu
     * @default []
     */
    menuAction?: Array<{
        /**
         * The label to display on the menu
         */
        label: string;
        /**
         * The Function to call to when click on menu
         */
        action(id: string | number): void;
    }>;
}

export interface ManagedSimpleFormProps {
    /**
     * The data to manage
     */
    data: Array<ManagedSimpleFormData<object>>;
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
     * @default [(value: string, allValues: ManagedAddSimpleFormValues, props: ManagedAddSimpleFormProps) => {return value && value.trim() !== '' ? undefined : 'Required';}]
     */
    validateAddFunctions?: Array<(value: string, allValues: ManagedAddSimpleFormValues, props: ManagedAddSimpleFormProps) => string | undefined>;
    /**
     * To show error if add validation function is not satisfied
     * @default [(value: string, allValues: ManagedSimpleListFormValues, props: ManagedSimpleListFormProps) => {return value && value.trim() !== '' ? undefined : 'Required';}]
     */
    validateEditFunctions?: Array<(value: string, allValues: ManagedSimpleListFormValues, props: ManagedSimpleListFormProps) => string | undefined>;
    /**
     * To show to user that the action is loading
     * @default false
     */
    isLoading?: boolean;
    /**
     * The name of the form to use in redux-form, if multiple form in the same component is used, it could be useful to change the name
     * @default ManagedSimpleForm
     */
    formName?: string;
    /**
     * The height of the component form in the list
     * @default 60
     */
    componentHeight?: number;
    /**
     * The Function to call to add new entity, you need to give the new data to the components after add it to pass the id
     */
    addAction(value: object): void;
    /*
     * The Function to call to edit entity
     */
    editAction(value: object): void;
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
        formName = 'ManagedSimpleForm',
        componentHeight = 60,
    } = props;

    const addData = (values: ManagedAddSimpleFormValues) => {
        const fieldToAdd = {
            [displayFieldName]: values.entityName,
        };
        props.addAction(fieldToAdd);
    };

    const updateData = (values: ManagedSimpleListFormValues) => {
        const dataConverted: ManagedSimpleListFormValues[] = props.data.map((value) => {
            return {
                entityId: readObjectProp(value.entity, idFieldName),
                entityName: readObjectProp(value.entity, displayFieldName),
            };
        });
        const indexObjectToUpdate: number = dataConverted.findIndex((entity) => entity.entityId === values.entityId);
        const objectFound = props.data[indexObjectToUpdate];
        const fieldToUpdate = {
            [displayFieldName]: values.entityName,
        };
        const objectToUpdate = Object.assign({}, objectFound.entity, fieldToUpdate);
        props.editAction(objectToUpdate);
    };

    const deleteData = (id: string | number) => {
        props.deleteAction(id);
    };

    const renderFormList = () => {

        return data.map((value) => {

            const {
                entity,
                editLabel = 'Edit',
                deleteLabel = 'Delete',
                hasEdit = true,
                hasDelete = true,
                leftComponent,
                menuAction = [],
            } = value;

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
                        leftComponent={leftComponent}
                        menuAction={menuAction}
                        componentHeight={componentHeight}
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
    return value && value.trim() !== '' ? undefined : 'Required';
};
const requiredEditTextField = (value: string, _allValues: ManagedSimpleListFormValues, _props: ManagedSimpleListFormProps) => {
    return value && value.trim() !== '' ? undefined : 'Required';
};

/**
 * A component form with full management of an entity list.
 * This component doesn't put the entity list in a state, to add element to the list, you need change the data properties
 */
export const ManagedSimpleForm: React.StatelessComponent<ManagedSimpleFormProps> = ManagedSimpleFormBase;
