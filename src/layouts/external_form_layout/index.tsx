import { AppBar, Paper, Tab, Tabs, Typography, withTheme, WithTheme } from '@material-ui/core';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import * as React from 'react';
import { style } from './style';

export interface ExternalFormLayoutProps {
    /**
     * The title to display on the top of the center
     */
    title: string;
    /**
     * The title to display on the top of the center
     */
    icon: React.ReactElement<SvgIconProps>;
    /**
     * The title to display on the top of the center
     */
    tabLabel: string;
    /**
     * The text to write under the box
     */
    copyright: string;
}

const ExternalFormLayoutBase: React.StatelessComponent<ExternalFormLayoutProps & WithTheme & { children?: React.ReactNode }> = (props) => {

    const { title, icon, tabLabel, copyright, children, theme } = props;

    return (
        <div style={style(theme).mainContainer} >
            <div>
                <Typography variant="headline" align="center" color="inherit" style={style(theme).titleTypo} >
                    {title}
                </Typography>
                <Paper >
                    <AppBar position="static" color="default">
                        <Tabs
                            value={-1}
                            textColor={'primary'}
                            centered={true}
                            fullWidth={true}
                        >
                            <Tab label={tabLabel} icon={icon} selected={false} />
                        </Tabs>
                    </AppBar>
                    <div style={style(theme).childrenContainer}>
                        {children}
                    </div>
                </Paper >
                <Typography variant="subheading" align="center" color="inherit" style={style(theme).copyrightTypo}>
                    {copyright}
                </Typography>
            </div>

        </div>
    );
};

const ExternalFormLayoutWithTheme: React.ComponentType<ExternalFormLayoutProps> = withTheme()(ExternalFormLayoutBase);

/**
 * Layout design to show a form for login or signup
 */
export const ExternalFormLayout: React.ComponentType<ExternalFormLayoutProps> = (ExternalFormLayoutWithTheme);
