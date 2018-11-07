import { withTheme, WithTheme } from '@material-ui/core';
import * as React from 'react';
import { style } from './style';

export interface MainLayoutProps {
    /**
     * The menu component
     */
    menuComponent: React.ReactNode;
    /**
     * The footer component
     */
    footerComponent: React.ReactNode;
}

const MainLayoutBase: React.StatelessComponent<MainLayoutProps & WithTheme & { children?: React.ReactNode }> = (props) => {

    const { menuComponent, footerComponent, children, theme } = props;

    return (
        <div style={style(theme).mainContainer}>
            <div>
                {menuComponent}
            </div>
            <div style={style(theme).childrenContainer}>
                {children}
            </div>
            <div>
                {footerComponent}
            </div>
        </div>
    );
};

const MainLayoutWithTheme: React.ComponentType<MainLayoutProps> = withTheme()(MainLayoutBase);

/**
 * Layout with the header and footer.
 * The footer is always is sticky on bottom
 */
export const MainLayout: React.ComponentType<MainLayoutProps> = (MainLayoutWithTheme);
