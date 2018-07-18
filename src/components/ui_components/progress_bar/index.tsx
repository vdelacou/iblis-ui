import { Grid, Paper, Theme, Typography, withTheme, WithTheme } from '@material-ui/core';
import * as React from 'react';
import { style } from './style';

export interface ProgressBarProps {
    /**
     * The list of text to display the steps
     */
    menuList: string[];
    /**
     * The active index to show (first one is zero)
     */
    activeIndex: number;
}

const ProgressBarBase: React.StatelessComponent<ProgressBarProps & WithTheme> = (props) => {

    const { menuList, activeIndex, theme } = props;

    return (
        <Grid container={true} style={style(theme).mainContainer} alignItems={'center'}>
            {renderMenu(menuList, activeIndex, theme)}
        </Grid >
    );
};

const renderMenu = (menuList: string[], activeIndex: number, theme: Theme) => {
    return menuList.map((menuItem, index) => {
        if (index === activeIndex) {
            return (
                <Grid key={menuItem} item={true} style={style(theme).activeItemContainer}>
                    <Paper style={style(theme).activeContainer} elevation={5}>
                        <Typography variant={'subheading'} color={'inherit'} >{menuItem.toUpperCase()}</Typography>
                    </Paper>
                </Grid >
            );
        }
        return (
            <Grid key={menuItem} item={true} style={style(theme).inActiveItemContainer}>
                <Paper style={style(theme).inActiveContainer} elevation={0}>
                    < Typography variant={'subheading'} >{menuItem.toUpperCase()}</Typography>
                </Paper>
            </Grid >
        );
    });
};

const ProgressBarWithTheme: React.ComponentClass<ProgressBarProps> = withTheme()(ProgressBarBase);

/**
 * Display aprogress bar of different steps
 */
export const ProgressBar: React.ComponentClass<ProgressBarProps> = (ProgressBarWithTheme);
