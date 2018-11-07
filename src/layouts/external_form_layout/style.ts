import { Theme } from '@material-ui/core';
import { CSSProperties } from 'react';

export const style = (theme: Theme): Record<string, Partial<CSSProperties>> => {
    return {
        mainContainer: {
            backgroundColor: theme.palette.primary.main,
            height: 'calc(100vh)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            minWidth: '375px',
        },
        childrenContainer: {
            padding: theme.spacing.unit,
            paddingTop: 2 * theme.spacing.unit,
        },
        titleTypo: {
            color: theme.palette.common.white,
            paddingBottom: 2 * theme.spacing.unit,
        },
        copyrightTypo: {
            color: theme.palette.common.white,
            paddingTop: 2 * theme.spacing.unit,
        },
    };
};
