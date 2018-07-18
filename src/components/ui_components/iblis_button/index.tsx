import { Button } from '@material-ui/core';
import * as React from 'react';

export interface IblisButtonProps {
    /**
     * The label to display in the center of the button
     */
    buttonLabel: string;
    /**
     * The variant of the button
     */
    buttonType: 'default' | 'primary';
    /**
     * If the button show action is loading
     *
     * @default false
     */
    isLoading?: boolean;
    /**
     * If the button is disabled
     *
     * @default false
     */
    disabled?: boolean;
    /**
     * The html type of the button
     *
     * @default false
     */
    type?: string;
    /**
     * The Function to launch when button is clicked
     */
    onClick?: () => void;
}

const IblisButtonBase: React.StatelessComponent<IblisButtonProps> = (props) => {

    const { buttonLabel, buttonType, isLoading = false, disabled = false, type, onClick } = props;

    return (
        <Button
            color={buttonType}
            variant={'raised'}
            disabled={isLoading ? true : disabled}
            onClick={onClick ? () => onClick() : undefined}
            type={type ? type : undefined}
        >
            {/* When loading we display the button with ... */}
            {isLoading ? (buttonLabel + '...') : buttonLabel}
        </Button >
    );
};

/**
 * Simple Button with loading and disabled Function. To keep button design constant around all components
 */
export const IblisButton: React.StatelessComponent<IblisButtonProps> = (IblisButtonBase);
