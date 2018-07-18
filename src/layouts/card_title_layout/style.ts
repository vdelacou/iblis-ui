import { Theme } from '@material-ui/core';
import { CSSProperties, StyleRules } from '@material-ui/core/styles/withStyles';

export const style = (theme: Theme): Record<string, Partial<CSSProperties>> => {
    return {
        contentContainer: {
            padding: theme.spacing.unit * 3,
        },
    };
};

//  CSS class name to extend the style applied to components.
export type ClassKey = 'appBarMenuRoot' | 'toolBarMenuRoot';

// create component style with the style that can be exported
export const createSytle = (theme: Theme): StyleRules<ClassKey> => {

    const appBarMenuRoot: CSSProperties = {
        borderTop: 'none',
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        paddingTop: theme.spacing.unit / 2,
        paddingLeft: theme.spacing.unit / 4,
        paddingBottom: theme.spacing.unit / 2,
    };
    const toolBarMenuRoot: CSSProperties = {
        minHeight: theme.spacing.unit * 5,
    };

    return {
        appBarMenuRoot: appBarMenuRoot,
        toolBarMenuRoot: toolBarMenuRoot,
    };
};
