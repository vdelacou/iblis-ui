import { Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

export const style = (theme: Theme): Record<string, Partial<CSSProperties>> => {
    return {
        textFieldContainer: {
            display: 'flex',
        },
        buttonWithIcon: {
            margin: theme.spacing.unit,
        },
        rightIcon: {
            marginLeft: theme.spacing.unit,
        },
    };
};
