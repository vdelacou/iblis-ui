import { MenuItem, TextField, Typography, WithStyles, withStyles, WithTheme, withTheme } from '@material-ui/core';
import { InputProps } from '@material-ui/core/Input';
import { SelectProps } from '@material-ui/core/Select';
import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';
import { ClassKey, createSytle, style } from './style';

export interface IblisSelectFieldProps {
    /**
     * Values to display in the select
     */
    values: Array<{ id: string | number; value: string }>;
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
     * If true, the input will take up the full width of its container
     * @default false
     */
    fullWidth?: boolean;
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

}

const IblisSelectFieldBase: React.StatelessComponent<IblisSelectFieldProps & WrappedFieldProps & WithStyles<ClassKey> & WithTheme> = (props) => {
    const { values, iblisDefaultValue, required = false, fullWidth = false, autoFocus = false, disabled = false, placeholder,
        input, meta, theme, classes } = props;

    const inputProps: Partial<InputProps> = {
        disableUnderline: true,
        classes: {
            input: classes.textFieldInput,
        },
    };

    const selectProps: Partial<SelectProps> = {
        disableUnderline: true,
        classes: {
            icon: classes.iconSelectTextFieldInput,
        },
    };

    return (
        <div>
            <div style={style(theme).textFieldContainer}>
                <TextField
                    type={'select'}
                    InputProps={inputProps}
                    SelectProps={selectProps}
                    classes={{ root: classes.textFieldRoot }}
                    onChange={input.onChange}
                    onBlur={input.onBlur}
                    onFocus={input.onFocus}
                    value={input.value ? input.value : iblisDefaultValue ? iblisDefaultValue : placeholder}
                    required={required}
                    fullWidth={fullWidth}
                    autoFocus={autoFocus}
                    disabled={disabled}
                    placeholder={placeholder}
                    select={true}
                >
                    {placeholder && <MenuItem value={placeholder} disabled={true} selected={true}>{`--- ${placeholder} ---`}</MenuItem>}
                    {values.map((value, index) => (<MenuItem key={index} value={value.id} >{value.value}</MenuItem>))}
                </TextField >

                {/* display a star if the field is required */}
                {required && <Typography variant="caption" color="error">*</Typography>}
                {!required && <Typography variant="caption" color="error">&nbsp;</Typography>}
            </div >
            {renderError(meta.touched, meta.error)}
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

const IblisButtonWithStyle: React.ComponentType<WithTheme & WrappedFieldProps & IblisSelectFieldProps> = withStyles(createSytle)(IblisSelectFieldBase);
const IblisButtonWithTheme: React.ComponentClass<WrappedFieldProps & IblisSelectFieldProps> = withTheme()(IblisButtonWithStyle);

/**
 * Display a select field with border and star if required.
 */
export const IblisSelectField: React.ComponentClass<WrappedFieldProps & IblisSelectFieldProps> = (IblisButtonWithTheme);
