import { Grid, IconButton, Menu, MenuItem, Tooltip, Typography, WithTheme, withTheme } from '@material-ui/core';
import { Cancel, DeleteForever, Done, MoreVert } from '@material-ui/icons';
import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { IblisTextField } from '../../../components';
import { style } from './style';

export interface ManagedSimpleListFormValues {
    /**
     * The id of the entity
     */
    entityId?: string | number;
    /**
     * The name of the entity
     */
    entityName?: string;
}

export interface ManagedSimpleListFormProps {
    /**
     * The initial form values
     */
    initValues: ManagedSimpleListFormValues;
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
     * The text to display on tooltip on icon for confirm edit
     * @default Edit
     */
    editConfirmLabel?: string;
    /**
     * The text to display on tooltip on icon for cancel edit
     * @default Cancel
     */
    editCancelLabel?: string;
    /**
     * The text to display on tooltip on icon for confirm delete
     * @default Delete
     */
    deleteConfirmLabel?: string;
    /**
     * The text to display on tooltip on icon for cancel delete
     * @default Cancel
     */
    deleteCancelLabel?: string;
    /**
     * The message to show to confirm to really delete a entity
     * @default Do you confirm you want to delete this?
     */
    confirmDeleteLabel?: string;
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
     * To show to user that the action is loading
     * @default false
     */
    isLoading?: boolean;
    /**
     * To show error if validation function is not satisfied
     */
    validateFunctions: Array<(value: string, allValues: ManagedSimpleListFormValues, props: ManagedSimpleListFormProps) => string | undefined>;
    /**
     * The component to display if needed at the left of the form
     */
    leftComponent?: React.ReactNode;
    /**
     * The height of the component
     * @default 60
     */
    componentHeight?: number;
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
         * If the menu is disabled
         * @default false
         */
        disabled?: boolean;
        /**
         * The Function to call to when click on menu
         */
        action(id: string | number): void;
    }>;
    /*
     * The Function to call to edit entity
     */
    editAction(values: ManagedSimpleListFormValues): void;
    /*
     * The Function to call to delete entity
     */
    deleteAction(id: string | number): void;
}

class ManagedSimpleListFormState {
    /**
     * on which element show the menu. if undefined the menu is not show
     */
    readonly element?: EventTarget & HTMLElement = undefined;
    /**
     * When we display the form to allow edit
     * @default false
     */
    readonly editItem: boolean = false;
    /**
     * When we display the button to confirm delete
     * @default false
     */
    readonly deleteItem: boolean = false;
}

class ManagedSimpleListFormBase extends
    React.PureComponent<ManagedSimpleListFormProps & InjectedFormProps<ManagedSimpleListFormValues, ManagedSimpleListFormProps> & WithTheme, ManagedSimpleListFormState> {

    readonly state = new ManagedSimpleListFormState();

    focusInputField = (input?: HTMLInputElement) => {
        //  dirty hack to force focus (need to find a way to make it cleaner)
        setTimeout(() => { if (input) { input.focus(); } }, 100);
    }

    submitForm = (values: ManagedSimpleListFormValues) => {
        this.props.editAction(values);
        this.setState(() => { return { editItem: false }; });
    }

    delete = () => {
        if (this.props.initValues && this.props.initValues.entityId) {
            this.props.deleteAction(this.props.initValues.entityId);
            this.setState(() => { return { deleteItem: false }; });
        }
    }

    renderMenu = (
        editLabel: string, deleteLabel: string, hasEdit: boolean, hasDelete: boolean,
        optionalMenu: Array<{ label: string; disabled?: boolean; action(id: string | number): void }> = [], element?: HTMLElement) => {
        return (
            <Menu
                elevation={1}
                anchorEl={element}
                open={Boolean(element)}
                disableEnforceFocus={true}
                disableRestoreFocus={true}
                onClose={() => { this.setState(() => { return { element: undefined }; }); }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                {this.renderEditMenuItem(editLabel, hasEdit)}
                {this.renderDeleteMenuItem(deleteLabel, hasDelete)}
                {this.renderOptionalMenuItem(optionalMenu)}
            </Menu >
        );
    }

    renderEditMenuItem = (editLabel: string, hasEdit: boolean) => {
        if (hasEdit) {
            return (
                <MenuItem onClick={() => { this.setState(() => { return { editItem: true, element: undefined }; }); }}>
                    {editLabel}
                </MenuItem>
            );
        } else {
            return null;
        }
    }

    renderDeleteMenuItem = (deleteLabel: string, hasDelete: boolean) => {
        if (hasDelete) {
            return (
                <MenuItem onClick={() => { this.setState(() => { return { deleteItem: true, element: undefined }; }); }}>
                    {deleteLabel}
                </MenuItem>
            );
        } else {
            return null;
        }
    }

    renderOptionalMenuItem = (optionalMenu: Array<{ label: string; disabled?: boolean; action(id: string | number): void }> = []) => {
        if (optionalMenu.length !== 0) {
            return optionalMenu.map((menu, index) => {
                if (this.props.initValues && this.props.initValues.entityId) {
                    const id = this.props.initValues.entityId;
                    return (
                        <MenuItem disabled={menu.disabled} key={index} onClick={() => menu.action(id)}>
                            {menu.label}
                        </MenuItem>
                    );
                } else {
                    return null;
                }
            });
        } else {
            return null;
        }
    }

    renderValue = (editItem: boolean, deleteItem: boolean, confirmDeleteLabel: string) => {
        if (deleteItem) {
            return (
                <Typography variant="subheading" color="primary" style={style(this.props.theme).valueContainer}  >
                    {confirmDeleteLabel}
                </Typography>
            );
        }
        if (!editItem) {
            return (
                <Typography variant="subheading" color={this.props.isLoading ? 'textSecondary' : 'default'} style={style(this.props.theme).valueContainer} noWrap={true} >
                    {this.props.initValues && this.props.initValues.entityName}
                </Typography >
            );
        } else {
            return (
                <div style={style(this.props.theme).formContainer}>
                    <Field
                        type="text"
                        name="entityName"
                        component={IblisTextField}
                        disabled={this.props.submitting || this.props.isLoading}
                        validate={this.props.validateFunctions}
                        required={true}
                        autoFocus={true}
                        withRef={true}
                        fullWidth={true}
                        inputRef={(ref: HTMLInputElement) => this.focusInputField(ref)}
                    />
                </div>
            );
        }
    }

    renderIconMenu = (
        editItem: boolean, deleteItem: boolean, //
        editConfirmLabel: string, editCancelLabel: string, deleteConfirmLabel: string, deleteCancelLabel: string, //
        isLoading: boolean, hasEdit: boolean, hasDelete: boolean, optionalMenu: Array<{ label: string; disabled?: boolean; action(id: string | number): void }> = [],
    ) => {
        if (deleteItem) {
            return (
                <div >
                    <Tooltip title={deleteConfirmLabel} >
                        <IconButton
                            disabled={isLoading}
                            onClick={() => { this.delete(); }}
                            color={'inherit'}
                        >
                            <DeleteForever color={'primary'} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={deleteCancelLabel}>
                        <IconButton
                            disabled={isLoading}
                            onClick={() => this.setState(() => { return { deleteItem: false }; })}
                        >
                            <Cancel />
                        </IconButton>
                    </Tooltip>
                </div >
            );
        }
        if (editItem) {
            return (
                <div>
                    <Tooltip title={editConfirmLabel}>
                        <IconButton
                            disabled={isLoading}
                            type="submit"
                        >
                            <Done color={'primary'} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={editCancelLabel}>
                        <IconButton
                            disabled={isLoading}
                            onClick={() => this.setState(() => { return { editItem: false }; })}
                        >
                            <Cancel />
                        </IconButton>
                    </Tooltip>
                </div>
            );
        }
        if (hasEdit || hasDelete || (optionalMenu.length > 0)) {
            return (
                <div >
                    <IconButton
                        disabled={isLoading}
                        onClick={(event: React.MouseEvent<HTMLElement>) => { const el = event.currentTarget; this.setState(() => { return { element: el }; }); }}
                    >
                        <MoreVert />
                    </IconButton>
                </div >
            );
        }
        return null;
    }

    render(): React.ReactNode {

        const {
            editLabel = 'Edit', deleteLabel = 'Delete', confirmDeleteLabel = 'Do you confirm you want to delete this?', leftComponent, componentHeight = 60,
            isLoading = false, menuAction = [], hasEdit = true, hasDelete = true, theme }
            = this.props;
        const editCfrmLbl = this.props.editConfirmLabel ? this.props.editConfirmLabel : 'Edit';
        const editCncLbl = this.props.editCancelLabel ? this.props.editCancelLabel : 'Cancel';
        const dltCfrmLbl = this.props.deleteConfirmLabel ? this.props.deleteConfirmLabel : 'Delete';
        const dltCncLbl = this.props.deleteCancelLabel ? this.props.deleteCancelLabel : 'Cancel';
        const { editItem, deleteItem, element } = this.state;

        if (this.props.initValues && !this.props.initialized) {
            this.props.initialize(this.props.initValues);
        }
        return (
            <div>
                <form
                    onSubmit={this.props.handleSubmit(this.submitForm)}
                    noValidate={true}
                >
                    <Grid container={true} alignItems={'center'}>
                        <Grid item={true} xs={8} sm={10} >
                            <div style={style(theme, componentHeight).mainContainer}>
                                <div
                                    style={leftComponent ? style(theme, componentHeight).leftComponentContainerPresent : style(theme, componentHeight).leftComponentContainer}
                                >
                                    {leftComponent}
                                </div>
                                <div style={style(theme, componentHeight).renderValueContainerFlex} >
                                    <div style={style(theme, componentHeight).renderValueContainer}>
                                        {this.renderValue(editItem, deleteItem, confirmDeleteLabel)}
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item={true} xs={4} sm={2} style={style(this.props.theme).iconMenuContainer}>
                            {this.renderIconMenu(editItem, deleteItem, editCfrmLbl, editCncLbl, dltCfrmLbl, dltCncLbl, isLoading, hasEdit, hasDelete, menuAction)}
                        </Grid>
                    </Grid>
                </form>
                {/* Render Menu */}
                {this.renderMenu(editLabel, deleteLabel, hasEdit, hasDelete, menuAction, element)}
            </div >
        );
    }
}

const ManagedSimpleListFormWithTheme: React.ComponentType<ManagedSimpleListFormProps & InjectedFormProps<ManagedSimpleListFormValues, ManagedSimpleListFormProps>> =
    withTheme()(ManagedSimpleListFormBase);

/**
 * A simple form for update or delete an entity with only one element
 * If no edit or delete button asked, then the menu is not displayed
 */
export const ManagedSimpleListForm: React.ComponentType<ManagedSimpleListFormProps & InjectedFormProps<ManagedSimpleListFormValues, ManagedSimpleListFormProps>> =
    (ManagedSimpleListFormWithTheme);
