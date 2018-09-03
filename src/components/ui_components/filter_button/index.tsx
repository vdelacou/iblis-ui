import { ButtonBase, Grid, Theme, Typography, WithTheme, withTheme } from '@material-ui/core';
import * as React from 'react';
import { style } from './style';

export interface FilterButtonMenuProps {
    /**
     * The text to display in the filter item
     */
    name: string;
    /**
     * The count to display in the filter item
     */
    count?: string;
    /**
     * The action when click on filter item
     */
    action: () => void;
}

export interface FilterButtonProps {
    /**
     * The list of button
     */
    listFilter: FilterButtonMenuProps[];
    /**
     * The index of filter button to be active
     * If more than the level possible fallback to 0
     */
    activeIndex: number;
}

const FilterButtonBase: React.StatelessComponent<FilterButtonProps & WithTheme> = (props) => {

    const { activeIndex, listFilter, theme } = props;
    // we fallback to zero if try to activate unknown menu
    const activeFilter = listFilter.length > activeIndex ? activeIndex : 0;

    return (
        <Grid item={true} direction={'row'} >
            {renderButtonFilter(listFilter, activeFilter, theme)}
        </Grid >
    );
};

const renderButtonFilter = (menuItem: FilterButtonMenuProps[], activeFilter: number, theme: Theme) => {
    return menuItem.map((
        item: FilterButtonMenuProps,
        index: number) => {
        // the first button
        if (index === 0) {
            const computeStyleLeft = activeFilter === index ? { ...style(theme).filterActive, ...style(theme).filterLeft } : { ...style(theme).filterLeft };
            return (
                <ButtonBase key={index} style={computeStyleLeft} onClick={() => item.action()} >
                    <Typography
                        align={'center'}
                        gutterBottom={false}
                        variant={'body1'}
                        style={activeFilter === index ? style(theme).filterLabelActive : undefined}
                    >
                        {item.name}
                    </Typography>
                    {renderCount(theme, item.count)}
                </ButtonBase>
            );
        }
        // the last button
        if (index === menuItem.length - 1) {
            const computeStyleRight = activeFilter === index ? { ...style(theme).filterActive, ...style(theme).filterRight } : { ...style(theme).filterRight };
            return (
                <ButtonBase key={index} style={computeStyleRight} onClick={() => item.action()} >
                    <Typography
                        align={'center'}
                        gutterBottom={false}
                        variant={'body1'}
                        style={activeFilter === index ? style(theme).filterLabelActive : undefined}
                    >
                        {item.name}
                    </Typography>
                    {renderCount(theme, item.count)}
                </ButtonBase>
            );
        }
        const computeStyleCenter = activeFilter === index ? { ...style(theme).filterActive, ...style(theme).filterCenter } : { ...style(theme).filterCenter };
        return (
            <ButtonBase key={index} style={computeStyleCenter} onClick={() => item.action()} >
                <Typography
                    align={'center'}
                    gutterBottom={false}
                    variant={'body1'}
                    style={activeFilter === index ? style(theme).filterLabelActive : undefined}
                >
                    {item.name}
                </Typography>
                {renderCount(theme, item.count)}
            </ButtonBase>
        );
    });
};

const renderCount = (theme: Theme, count?: string) => {
    if (count) {
        return (
            <Typography align={'center'} gutterBottom={false} variant={'caption'} style={style(theme).filterCount} >
                {count}
            </Typography>
        );
    } else {
        return null;
    }
};

const FilterButtonWithTheme: React.ComponentType<FilterButtonProps> = withTheme()(FilterButtonBase);

/**
 * A button to be used to filtered entities list
 * The count can be hide or displayed
 */
export const FilterButton: React.ComponentType<FilterButtonProps> = (FilterButtonWithTheme);
