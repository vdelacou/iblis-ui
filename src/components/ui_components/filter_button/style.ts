import { Theme } from '@material-ui/core';
import { CSSProperties } from 'react';

export const style = (theme: Theme): Record<string, Partial<CSSProperties>> => {
    return {
        filterLeft: {
            border: '1px solid' + theme.palette.grey[600],
            borderTopLeftRadius: '6px',
            borderBottomLeftRadius: '6px',
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            padding: theme.spacing.unit,
            paddingBottom: theme.spacing.unit - theme.spacing.unit * 1 / 4,
        },
        filterCenter: {
            borderTop: '1px solid' + theme.palette.grey[600],
            borderBottom: '1px solid' + theme.palette.grey[600],
            borderRight: '1px solid' + theme.palette.grey[600],
            borderRadius: 0,
            padding: theme.spacing.unit,
            paddingBottom: theme.spacing.unit - theme.spacing.unit * 1 / 4,
        },
        filterRight: {
            borderTop: '1px solid' + theme.palette.grey[600],
            borderBottom: '1px solid' + theme.palette.grey[600],
            borderRight: '1px solid' + theme.palette.grey[600],
            borderTopRightRadius: '6px',
            borderBottomRightRadius: '6px',
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            padding: theme.spacing.unit,
            paddingBottom: theme.spacing.unit - theme.spacing.unit * 1 / 4,
        },
        filterActive: {
            lineHeight: '0',
            background: theme.palette.grey[800],
        },
        filterLabelActive: {
            fontWeight: 'bold',
        },
        filterCount: {
            paddingLeft: theme.spacing.unit,
        },
    };
};
