import { Grid, Typography, WithTheme, withTheme } from '@material-ui/core';
import * as React from 'react';
import { style } from './style';

export interface ContentWithTitleProps {
    title: string;
}

const ContentWithTitleBase: React.StatelessComponent<ContentWithTitleProps & WithTheme & { children?: React.ReactNode }> = (props) => {

    const { title, theme, children } = props;

    return (
        <div>
            <div style={style(theme).titleContainer}>
                <Typography variant={'subheading'} gutterBottom={true}>
                    {title}
                </Typography>
            </div>
            <Grid container={true}>
                <Grid item={true} xs={12} style={style(theme).contentContainer}>
                    {children}
                </Grid>
            </Grid>
        </div>
    );
};

const ContentWithTitleWithTheme: React.ComponentType<ContentWithTitleProps> = withTheme()(ContentWithTitleBase);

/**
 * Layout to display a title and content below
 */
export const ContentWithTitle: React.ComponentType<ContentWithTitleProps> = (ContentWithTitleWithTheme);
