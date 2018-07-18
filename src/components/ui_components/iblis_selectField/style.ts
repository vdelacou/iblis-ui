import { Theme } from '@material-ui/core';
import { CSSProperties, StyleRules } from '@material-ui/core/styles/withStyles';

export const style = (_theme: Theme): Record<string, Partial<CSSProperties>> => {
    return {
        textFieldContainer: {
            display: 'flex',
        },
    };
};

//  CSS class name to extend the style applied to components.
export type ClassKey = 'textFieldRoot' | 'textFieldInput' | 'iconSelectTextFieldInput';

// create component style with the style that can be exported
export const createSytle = (theme: Theme): StyleRules<ClassKey> => {

    const textFieldRoot: CSSProperties = {
        'padding': 0,
        'label + &': {
            marginTop: `${theme.spacing.unit * 3}px`,
        },
    };

    const textFieldInput: CSSProperties = {
        'borderRadius': 0,
        'backgroundColor': theme.palette.common.white,
        'border': `1px solid ${theme.palette.grey['500']}`,
        'fontSize': 16,
        'padding': `${theme.spacing.unit}px ${theme.spacing.unit}px`,
        'width': `calc(100% - ${theme.spacing.unit * 2.25}px)`,
        '&:focus': {
            borderColor: theme.palette.primary.main,
        },
    };

    const iconSelectTextFieldInput: CSSProperties = {
        // We use a position absolute over a flexbox in order to forward the pointer events
        // to the input.
        'position': 'absolute',
        'right': theme.spacing.unit / 2,
        'top': 'calc(50% - 12px)', // Center vertically
        'color': theme.palette.action.active,
        'pointer-events': 'none', // Don't block pointer events on the select under the icon.
    };

    return {
        textFieldRoot: textFieldRoot,
        textFieldInput: textFieldInput,
        iconSelectTextFieldInput: iconSelectTextFieldInput,
    };
};
