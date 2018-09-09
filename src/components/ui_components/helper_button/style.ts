import { Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

export const style = (theme: Theme): Record<string, Partial<CSSProperties>> => {
    return {
        helpPaper: {
            background: theme.palette.grey.A400,
            padding: theme.spacing.unit * 2,
            maxWidth: '600px',
        },
        helpIcon: {
            fontSize: theme.spacing.unit * 2.5,
        },
        helpButton: {
            height: theme.spacing.unit * 5,
            width: theme.spacing.unit * 5,
        },
        helpTitle: {
            paddingBottom: theme.spacing.unit,
        },
        helpContentContainer: {
            paddingTop: theme.spacing.unit * 2,
        },
        helpLineContainer: {
            borderBottom: `1px solid ${theme.palette.primary.main}`,
        },
    };
};
