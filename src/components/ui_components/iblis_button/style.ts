import { Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

export const style = (theme: Theme): Record<string, Partial<CSSProperties>> => {
    return {
        textFieldContainer: {
            display: 'flex',
        },
        rightIcon: {
            marginLeft: theme.spacing.unit,
            height: theme.typography.subheading.fontSize,
        },
    };
};
