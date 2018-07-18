import { Theme } from '@material-ui/core';
import { CSSProperties } from 'react';

export const style = (theme: Theme): Record<string, Partial<CSSProperties>> => {
    return {
        bigAvatar: {
            width: theme.spacing.unit * 12,
            height: theme.spacing.unit * 12,
        },
        rightContainer: {
            height: '100%',
        },
    };
};
