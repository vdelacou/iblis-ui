import { Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

export const style = (theme: Theme): Record<string, Partial<CSSProperties>> => {
    return {
        titleContainer: {
            paddingTop: theme.spacing.unit * 2,
            borderBottom: `1px solid ${theme.palette.grey[300]}`,
        },
        contentContainer: {
            paddingTop: theme.spacing.unit * 4,
            paddingBottom: theme.spacing.unit * 4,
        },
    };
};
