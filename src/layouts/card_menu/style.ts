import { Theme } from '@material-ui/core';
import { CSSProperties, StyleRules } from '@material-ui/core/styles/withStyles';

export const style = (theme: Theme): Record<string, Partial<CSSProperties>> => {
    return {
        tabMenu: {
            padding: 0,
            minWidth: theme.spacing.unit,
            marginRight: theme.spacing.unit * 2,
            paddingLeft: theme.spacing.unit / 2,
            paddingRight: theme.spacing.unit / 2,
        },
        contentContainer: {
            padding: theme.spacing.unit * 3,
        },
        menuContainer: {
            borderRight: `1px solid ${theme.palette.grey[300]}`,
            height: '100%',
        },
        menuContainerSmall: {
            borderBottom: `1px solid ${theme.palette.grey[300]}`,
        },
    };
};

//  CSS class name to extend the style applied to components.
export type ClassKey = 'appBarMenuRoot' | 'toolBarMenuRoot' | 'tabLabelContainer';

// create component style with the style that can be exported
export const createSytle = (theme: Theme): StyleRules<ClassKey> => {

    const appBarMenuRoot: CSSProperties = {
        borderTop: 'none',
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
    };
    const toolBarMenuRoot: CSSProperties = {
        minHeight: theme.spacing.unit * 5,
    };
    const tabLabelContainer: CSSProperties = {
        padding: 0,
    };

    return {
        appBarMenuRoot: appBarMenuRoot,
        toolBarMenuRoot: toolBarMenuRoot,
        tabLabelContainer: tabLabelContainer,
    };
};
