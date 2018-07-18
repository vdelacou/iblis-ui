import { AppBar, ButtonBase, Hidden, Theme, Toolbar, Typography, WithTheme, withTheme } from '@material-ui/core';
import * as React from 'react';
import { style } from './style';

export interface FooterMenuLevelProps {
    /**
     * The text to display in the menu item
     */
    name: string;
    /**
     * The action when click on menu item
     */
    action: () => void;
}

export interface FooterMenuProps {
    /**
     * The text on the right (could be use for copyright)
     */
    rightText: string;
    /**
     * The menu on the left
     */
    menu: FooterMenuLevelProps[];
}

const FooterMenuBase: React.StatelessComponent<FooterMenuProps & WithTheme> = (props) => {

    const { menu, rightText, theme } = props;
    return (
        <div>
            <AppBar position="static" color="inherit" elevation={0}>
                <Toolbar style={style(theme).toolBar}>
                    <Hidden only={['xs']}>
                        {renderMenu(menu, theme)}
                    </Hidden>
                    <div style={style(theme).textLinkRight}>
                        <Typography variant="caption"  >
                            {rightText}
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>
        </div >
    );
};

const renderMenu = (menu: FooterMenuLevelProps[], theme: Theme) => {
    return menu.map((
        menuItem: FooterMenuLevelProps,
        index: number) => {
        return (
            <Typography key={index} variant="subheading" align="center" style={style(theme).menuItem}>
                <ButtonBase onClick={() => menuItem.action()}>
                    {menuItem.name}
                </ButtonBase>
            </Typography>
        );
    });
};

const FooterMenuWithTheme: React.ComponentClass<FooterMenuProps> = withTheme()(FooterMenuBase);
/**
 * Component to display the footer menu. This menu is responsive.
 * On mobile only the copyright part stay.
 */
export const FooterMenu: React.ComponentClass<FooterMenuProps> = (FooterMenuWithTheme);
