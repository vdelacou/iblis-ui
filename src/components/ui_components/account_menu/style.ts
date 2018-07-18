import { Theme } from '@material-ui/core';
import { CSSProperties, StyleRules } from '@material-ui/core/styles/withStyles';

export const style = (theme: Theme): Record<string, Partial<CSSProperties>> => {
    return {
        lastMenuPortalContainer: {
            padding: theme.spacing.unit,
        },
        lastMenuPortalPaper: {
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing.unit,
            borderTopLeftRadius: '2px',
            borderTopRightRadius: '2px',
        },
        lastMenuPortalPaperList: {
            paddingTop: 0,
            paddingBottom: 0,
        },
    };
};

//  CSS class name to extend the style applied to components.
export type ClassKey = 'signOutButton';

// create component style with the style that can be exported
export const createSytle = (theme: Theme): StyleRules<ClassKey> => {

    const signOutButton: CSSProperties = {
        color: theme.palette.secondary.main,
    };
    return {
        signOutButton: signOutButton,
    };
};
