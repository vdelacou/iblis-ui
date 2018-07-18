import { AppBar, Grid, Paper, Toolbar, Typography, withStyles, WithStyles, WithTheme, withTheme } from '@material-ui/core';
import * as React from 'react';
import { ClassKey, createSytle, style } from './style';

export interface CardTitleLayoutProps {
    /**
     * The text to display in the top of the card
     */
    title: string;
}

const CardTitleLayoutBase: React.StatelessComponent<CardTitleLayoutProps & WithStyles<ClassKey> & WithTheme & { children?: React.ReactNode }> = (props) => {

    const { title, classes, theme, children } = props;

    return (
        <Paper>
            <AppBar
                position={'static'}
                color={'inherit'}
                elevation={0}
                classes={{ root: classes.appBarMenuRoot }}
            >
                <Toolbar
                    classes={{ root: classes.toolBarMenuRoot }}
                >
                    <Typography variant="button" color={'primary'}  >
                        {title}
                    </Typography>

                </Toolbar>
            </AppBar>
            <Grid container={true}>
                <Grid item={true} xs={12} style={style(theme).contentContainer}>
                    {children}
                </Grid>
            </Grid>
        </Paper >
    );
};

const CardTitleLayoutWithStyle: React.ComponentType<CardTitleLayoutProps & WithTheme> = withStyles(createSytle)(CardTitleLayoutBase);
const CardTitleLayoutWithTheme: React.ComponentClass<CardTitleLayoutProps> = withTheme()(CardTitleLayoutWithStyle);

/**
 * Card with a title
 */
export const CardTitleLayout: React.ComponentClass<CardTitleLayoutProps> = (CardTitleLayoutWithTheme);
