import { Theme } from '@material-ui/core';
import { CSSProperties } from 'react';

export const style = (theme: Theme): Record<string, Partial<CSSProperties>> => {
    return {
        logoContainer: {
            maxWidth: '100%',
            height: 'auto',
            textAlign: 'center',
            padding: theme.spacing.unit * 8,
        },
        logoFont: {
            color: theme.palette.grey[300],
            fontSize: '45vh',
        },
        logoFontSmall: {
            color: theme.palette.grey[300],
            fontSize: '20vh',
        },
    };
};
