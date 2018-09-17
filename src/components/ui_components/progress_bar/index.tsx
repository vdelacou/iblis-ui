import { ButtonBase, Grid, Paper, Typography, withTheme, WithTheme } from '@material-ui/core';
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
    /**
     * The Function to launch when step is clicked
     */
    action?: (index: number) => void;
}

const ProgressBarBase: React.StatelessComponent<ProgressBarProps & WithTheme> = (props) => {

    const { menuList, activeIndex, action, theme } = props;


    const renderMenu = () => {
        return menuList.map((menuItem, index) => {
            if (index === activeIndex) {
                return (
                    <ButtonBase style={style(theme).buttonBase} onClick={() => action ? action(index) : undefined} >
                        <Grid key={menuItem} item={true} style={style(theme).activeItemContainer}>
                            <Paper style={style(theme).activeContainer} elevation={5}>
                                <Typography variant={'subheading'} color={'inherit'} >{menuItem.toUpperCase()}</Typography>
                            </Paper>
                        </Grid >
                    </ButtonBase>
                );
            }
            return (
                <ButtonBase style={style(theme).buttonBase} onClick={() => action ? action(index) : undefined} >
                    <Grid key={menuItem} item={true} style={style(theme).inActiveItemContainer}>
                        <Paper style={style(theme).inActiveContainer} elevation={0}>
                            < Typography variant={'subheading'} >{menuItem.toUpperCase()}</Typography>
                        </Paper>
                    </Grid >
                </ButtonBase>
            );
        });
    };


    return (
        <Grid container={true} style={style(theme).mainContainer} alignItems={'center'}>
            {renderMenu()}
        </Grid >
    );
};

const ProgressBarWithTheme: React.ComponentType<ProgressBarProps> = withTheme()(ProgressBarBase);

/**
 * Display aprogress bar of different steps
 */
export const ProgressBar: React.ComponentType<ProgressBarProps> = (ProgressBarWithTheme);
