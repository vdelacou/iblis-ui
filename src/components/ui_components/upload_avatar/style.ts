import { Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

export const style = (theme: Theme): Record<string, Partial<CSSProperties>> => {
    return {
        inputUploadFile: {
            display: 'none',
        },
        bigAvatar: {
            width: theme.spacing.unit * 12,
            height: theme.spacing.unit * 12,
        },
    };
};
