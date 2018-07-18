import { Theme } from '@material-ui/core';
import { CSSProperties } from 'react';

export const style = (theme: Theme): Record<string, Partial<CSSProperties>> => {
    return {
        mainContainer: {
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
        },
        childrenContainer: {
            width: '100%',
            maxWidth: theme.breakpoints.values.lg,
            paddingLeft: theme.spacing.unit,
            paddingRight: theme.spacing.unit,
            paddingTop: 3 * theme.spacing.unit,
            paddingBottom: 3 * theme.spacing.unit,
            margin: 'auto',
            flex: '1 0 auto',
        },
    };
};
