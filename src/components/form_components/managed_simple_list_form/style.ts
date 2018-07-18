import { Theme } from '@material-ui/core';
import { CSSProperties } from 'react';

export const style = (theme: Theme): Record<string, Partial<CSSProperties>> => {
    return {
        valueContainer: {
            paddingLeft: theme.spacing.unit + theme.spacing.unit / 8,
            paddingTop: theme.spacing.unit * 2,
            paddingBottom: theme.spacing.unit,
        },
        formContainer: {
            paddingTop: theme.spacing.unit + theme.spacing.unit / 4,
        },
        iconMenuContainer: {
            textAlign: 'right',
            paddingTop: theme.spacing.unit / 2,
            paddingRight: theme.spacing.unit,
        },
    };
};
