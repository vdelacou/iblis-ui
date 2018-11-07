import { Theme } from '@material-ui/core';
import { CSSProperties } from 'react';

export const style = (theme: Theme): Record<string, Partial<CSSProperties>> => {
    return {
        mainContainer: {
            textAlign: 'center',
        },
        buttonBase: {
            flexGrow: 1,
        },
        activeItemContainer: {
            flexGrow: 1,
            zIndex: 1,
        },
        inActiveItemContainer: {
            flexGrow: 1,
        },
        activeContainer: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            paddingTop: theme.spacing.unit * 1.5,
            paddingBottom: theme.spacing.unit * 1.5,
            paddingLeft: theme.spacing.unit,
            paddingRight: theme.spacing.unit,
            marginLeft: - theme.spacing.unit * 1.5,
            marginRight: - theme.spacing.unit * 1.5,

        },
        inActiveContainer: {
            backgroundColor: theme.palette.grey[200],
            padding: theme.spacing.unit,
        },
    };
};
