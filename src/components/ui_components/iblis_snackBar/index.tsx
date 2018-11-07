import { Snackbar, Typography, withTheme, WithTheme } from '@material-ui/core';
import * as React from 'react';

export interface IblisSnackbarProps {
    /**
     * If need to display the error
     */
    isError: boolean;
    /**
     * The label to display in the center of the button
     */
    errorText?: string;
    /**
     * The number of milliseconds to wait before automatically calling the hide Function.
     * @default 3000
     */
    autoHideDuration?: number;
    /**
     * The Function to leave the form
     */
    hide: () => void;

}

const IblisSnackbarBase: React.StatelessComponent<IblisSnackbarProps & WithTheme> = (props) => {

    const { isError, errorText, autoHideDuration = 3000, hide } = props;

    return (
        <Snackbar
            open={isError}
            message={<Typography variant="subheading" color="inherit" align="center">{errorText}</Typography>}
            onClose={() => hide()}
            autoHideDuration={autoHideDuration}
        />
    );
};

const IblisSnackbarWithTheme: React.ComponentType<IblisSnackbarProps> = withTheme()(IblisSnackbarBase);

/**
 * Display a snackbar auto close it automatically after some times
 */
export const IblisSnackbar: React.ComponentType<IblisSnackbarProps> = (IblisSnackbarWithTheme);
