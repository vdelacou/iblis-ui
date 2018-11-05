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
export type ClassKey = 'textFieldRoot' | 'textFieldInput';

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
        'width': `calc(100% - ${theme.spacing.unit * 2}px)`,
        '&:focus': {
            borderColor: theme.palette.primary.main,
        },
    };

    return {
        textFieldRoot: textFieldRoot,
        textFieldInput: textFieldInput,
    };
};
