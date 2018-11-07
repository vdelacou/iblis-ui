import { TextField, Typography, withStyles, WithStyles, WithTheme, withTheme } from '@material-ui/core';
import { InputProps } from '@material-ui/core/Input';
import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';
import { ClassKey, createSytle, style } from './style';

export interface IblisTextFieldProps {
    /**
     * Type attribute of the Input element. It should be a valid HTML5 input type
     */
    type: string;
    /**
     * The default value of the Input element.
     */
    iblisDefaultValue?: string | number;
    /**
     * If true, the label is displayed as required with a star
     * @default false
     */
    required?: boolean;
    /**
     * If true, a textarea element will be rendered instead of an input.
     * @default false
     */
    multiline?: boolean;
    /**
     * Number of rows to display when multiline option is set to true.
     */
    rows?: number;
    /**
     * Maximum number of rows to display when multiline option is set to true.
     */
    rowsMax?: number;
    /**
     * If true, the input will be focused during the first mount.
     * @default false
     */
    autoFocus?: boolean;
    /**
     * If true, the input will be disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * The short hint displayed in the input before the user enters a value.
     */
    placeholder?: string;
    /**
     * Use that property to pass a ref callback to the native input component.
     */
    inputRef?: React.Ref<any>;
}

const IblisTextFieldBase: React.StatelessComponent<IblisTextFieldProps & WrappedFieldProps & WithStyles<ClassKey> & WithTheme> = (props) => {
    const { type, iblisDefaultValue, required = false, multiline = false, rows, rowsMax, autoFocus = false, disabled = false, placeholder,
        inputRef, input, meta, theme, classes } = props;

    const inputProps: Partial<InputProps> = {
        disableUnderline: true,
        classes: {
            input: classes.textFieldInput,
        },
    };

    return (
        <div>
            <div style={style(theme).textFieldContainer}>
                <TextField
                    type={type}
                    InputProps={inputProps}
                    classes={{ root: classes.textFieldRoot }}
                    onChange={input.onChange}
                    onBlur={input.onBlur}
                    onFocus={input.onFocus}
                    value={input.value}
                    defaultValue={iblisDefaultValue}
                    required={required}
                    multiline={multiline}
                    rows={rows}
                    rowsMax={rowsMax}
                    autoFocus={autoFocus}
                    disabled={disabled}
                    placeholder={placeholder}
                    fullWidth={true}
                    inputRef={inputRef}
                />
                {/* display a star if the field is required */}
                {type !== 'hidden' && required && <Typography variant="caption" color="error">*</Typography>}
                {type !== 'hidden' && !required && <Typography variant="caption" color="error">&nbsp;</Typography>}
            </div >
            {type !== 'hidden' && renderError(meta.touched, meta.error)}
        </div >
    );
};

const renderError = (touched: boolean, error: object) => {
    if (touched && error) {
        return (
            <Typography variant="caption" color="error">{error}</Typography>
        );
    } else {
        return (
            <Typography variant="caption" color="error">&nbsp;</Typography>
        );
    }
};

const IblisTextFieldWithStyle: React.ComponentType<WrappedFieldProps & IblisTextFieldProps> = withStyles(createSytle)(IblisTextFieldBase);
const IblisTextFieldWithTheme: React.ComponentType<WrappedFieldProps & IblisTextFieldProps> = withTheme()(IblisTextFieldWithStyle);

/**
 * Display a text field with border and star if required.
 */
export const IblisTextField: React.ComponentType<WrappedFieldProps & IblisTextFieldProps> = (IblisTextFieldWithTheme);
