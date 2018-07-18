import { Theme } from '@material-ui/core';
import { CSSProperties } from 'react';

export const style = (theme: Theme): Record<string, Partial<CSSProperties>> => {
    return {
        icon: {
            padding: theme.spacing.unit / 2,
            marginTop: theme.spacing.unit,
        },
    };
};
