import { Theme } from '@material-ui/core';
import { CSSProperties, StyleRules } from '@material-ui/core/styles/withStyles';

export const style = (theme: Theme): Record<string, Partial<CSSProperties>> => {
    return {
        toolBar: {
            width: '100%',
            maxWidth: theme.breakpoints.values.lg,
            paddingLeft: theme.spacing.unit,
            paddingRight: theme.spacing.unit,
            margin: 'auto',
        },
        tabsFirstMenuContainer: {
            width: '100%',
        },
        tabSubMenu: {
            padding: 0,
            minWidth: theme.spacing.unit,
            marginRight: theme.spacing.unit * 2,
            paddingLeft: theme.spacing.unit / 2,
            paddingRight: theme.spacing.unit / 2,
        },
        tabSubIcon: {
            paddingRight: theme.spacing.unit,
            fontSize: theme.typography.headline.fontSize,
        },
    };
};

//  CSS class name to extend the style applied to components.
export type ClassKey = 'titleButton' | 'appBarFirstMenuRoot' | 'appBarSubMenuRoot' | 'appBarLastMenuAvatar' | 'toolBarSubMenuRoot' |
    'tabsFlexContainer' | 'tabsFlexContainerXs' | 'tabLabelContainer';

// create component style with the style that can be exported
export const createSytle = (theme: Theme): StyleRules<ClassKey> => {

    const titleButton: CSSProperties = {
        padding: 0,
        paddingLeft: theme.spacing.unit / 2,
        minWidth: 'auto',
    };
    const appBarFirstMenuRoot: CSSProperties = {
        borderBottom: 'none',
    };
    const appBarLastMenuAvatar: CSSProperties = {
        width: '1em',
        height: '1em',
        fontSize: theme.typography.pxToRem(24),
    };
    const appBarSubMenuRoot: CSSProperties = {
        borderTop: 'none',
    };
    const toolBarSubMenuRoot: CSSProperties = {
        minHeight: theme.spacing.unit * 5,
    };
    const tabsFlexContainer: CSSProperties = {
        justifyContent: 'flex-end',
    };
    const tabsFlexContainerXs: CSSProperties = {
        alignItems: 'center',
        flexDirection: 'column',
    };
    const tabLabelContainer: CSSProperties = {
        padding: 0,
    };
    return {
        titleButton: titleButton,
        appBarFirstMenuRoot: appBarFirstMenuRoot,
        appBarLastMenuAvatar: appBarLastMenuAvatar,
        appBarSubMenuRoot: appBarSubMenuRoot,
        toolBarSubMenuRoot: toolBarSubMenuRoot,
        tabsFlexContainer: tabsFlexContainer,
        tabsFlexContainerXs: tabsFlexContainerXs,
        tabLabelContainer: tabLabelContainer,
    };
};
