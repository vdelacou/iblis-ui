import { Theme } from '@material-ui/core';
import { CSSProperties } from 'react';

export const style = (theme: Theme, size: number = 60): Record<string, Partial<CSSProperties>> => {
    return {
        mainContainer: {
            height: size,
            display: 'flex',
            alignItems: 'center',
            paddingTop: '14px',
        },
        mainContainerEdit: {
            height: size,
            display: 'flex',
            alignItems: 'center',
        },
        valueContainer: {
            paddingLeft: theme.spacing.unit + theme.spacing.unit / 8,
        },
        formContainer: {
            paddingTop: theme.spacing.unit + theme.spacing.unit * 4 / 4,
        },
        renderValueContainerFlex: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
        },
        renderValueContainer: {
            width: '100%',
        },
        leftComponentContainerPresent: {
            height: size - (theme.spacing.unit + theme.spacing.unit * 3 / 4),
            paddingRight: theme.spacing.unit * 2,
        },
        leftComponentContainer: {
            height: size - (theme.spacing.unit + theme.spacing.unit * 3 / 4),
        },
        iconMenuContainer: {
            textAlign: 'right',
            paddingTop: theme.spacing.unit * 2,
            paddingRight: theme.spacing.unit,
        },
    };
};
