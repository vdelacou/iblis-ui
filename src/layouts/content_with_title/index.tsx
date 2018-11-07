import { Grid, Typography, WithTheme, withTheme } from '@material-ui/core';
import * as React from 'react';
import { style } from './style';

export interface ContentWithTitleProps {
    /**
     * The title to display
     */
    title: string;
    /**
     * The component to display if needed at the right of the title
     */
    rightComponent?: React.ReactNode;
}

const ContentWithTitleBase: React.StatelessComponent<ContentWithTitleProps & WithTheme & { children?: React.ReactNode }> = (props) => {

    const { title, rightComponent, theme, children } = props;

    return (
        <div>
            <div style={style(theme).titleContainer}>
                <Grid container={true} justify={'space-between'} alignItems={'center'}>
                    <Grid item={true} >
                        <Typography variant={'subheading'} gutterBottom={true}>
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item={true} >
                        {rightComponent}
                    </Grid>
                </Grid>
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
