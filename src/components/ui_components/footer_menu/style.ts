import { Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

export const style = (theme: Theme): Record<string, Partial<CSSProperties>> => {
    return {
        toolBar: {
            width: '100%',
            maxWidth: theme.breakpoints.values.lg,
            paddingLeft: theme.spacing.unit,
            paddingRight: theme.spacing.unit,
            margin: 'auto',
        },
        textLinkRight: {
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            flexDirection: 'row',
            alignItems: 'center',
        },
        menuItem: {
            paddingRight: theme.spacing.unit * 2,
        },
    };
};
