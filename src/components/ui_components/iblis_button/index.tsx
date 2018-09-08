import { Button, withTheme, WithTheme } from '@material-ui/core';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import * as React from 'react';
import { style } from './style';

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
     * The icon for the button if needed
     */
    icon?: React.ReactElement<SvgIconProps>;
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

const IblisButtonBase: React.StatelessComponent<IblisButtonProps & WithTheme> = (props) => {

    const { buttonLabel, buttonType, icon, isLoading = false, disabled = false, type, onClick, theme } = props;

    return (
        <Button
            color={buttonType}
            variant={'raised'}
            disabled={isLoading ? true : disabled}
            onClick={onClick ? () => onClick() : undefined}
            type={type ? type : undefined}
            style={icon ? style(theme).buttonWithIcon : undefined}
        >
            {/* When loading we display the button with ... */}
            {isLoading ? (buttonLabel + '...') : buttonLabel}
            {icon && React.createElement(icon.type, { style: style(theme).rightIcon })}
        </Button >
    );
};

const IblisButtonWithTheme: React.ComponentType<IblisButtonProps> = withTheme()(IblisButtonBase);
/**
 * Simple Button with loading and disabled Function. To keep button design constant around all components
 */
export const IblisButton: React.ComponentType<IblisButtonProps> = (IblisButtonWithTheme);
