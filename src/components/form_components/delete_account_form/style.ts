import { Theme } from '@material-ui/core';
import { CSSProperties } from 'react';

export const style = (theme: Theme): Record<string, Partial<CSSProperties>> => {
    return {
        containerEmailForm: {
            paddingTop: theme.spacing.unit * 4,
        },
    };
};
