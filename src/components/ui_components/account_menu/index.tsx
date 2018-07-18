import { Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, WithStyles, withStyles, WithTheme, withTheme } from '@material-ui/core';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import * as React from 'react';
import { ClassKey, createSytle, style } from './style';

export interface AccountMenuLevelProps {
    /**
     * The text to display in the menu item
     */
    name: string;
    /**
     * The icon to display for the menu item
     */
    icon?: React.ReactElement<SvgIconProps>;
    /**
     * The action when click on menu item
     */
    action: () => void;
}

export interface AccountMenuProps {
    /**
     * The account card Component to display
     */
    accountComponent: React.ReactNode;
    /**
     * The account menu between the account card and sign out button
     */
    accountMenu?: AccountMenuLevelProps[];
    /**
     * The sign out text
     */
    signOutText: string;
    /**
     * The sign out icon
     */
    signOutIcon?: React.ReactElement<SvgIconProps>;
    /**
     * The sign out action
     */
    signOutAction: () => void;
}

const AccountMenuBase: React.StatelessComponent<AccountMenuProps & WithTheme & WithStyles<ClassKey>> = (props) => {

    const { accountComponent, accountMenu, signOutText, signOutIcon, signOutAction, classes, theme } = props;

    return (
        <Grid container={true} style={style(theme).lastMenuPortalContainer}>
            <Paper>
                <div style={style(theme).lastMenuPortalPaper}>
                    {accountComponent}
                </div>
                <Divider />
                <List style={style(theme).lastMenuPortalPaperList}>
                    {/* Display all the menus if needed*/}
                    {renderMenu(accountMenu)}
                    {/* Display the logout button */}
                    <ListItem button={true} onClick={() => signOutAction()} >
                        {renderLogoutIcon(classes, signOutIcon)}
                        <ListItemText primary={signOutText} />
                    </ListItem>
                </List>
            </Paper>
        </Grid>
    );
};

const renderMenu = (accountMenu?: AccountMenuLevelProps[]) => {
    if (accountMenu) {
        return accountMenu.map((
            menuItem: AccountMenuLevelProps,
            index: number) => {
            return (
                <div key={index}>
                    <ListItem button={true} onClick={() => menuItem.action()}>
                        {renderMenuItemIcon(menuItem)}
                        <ListItemText primary={menuItem.name} />
                    </ListItem>
                    <Divider />
                </div>
            );
        });
    }
    return null;
};

const renderMenuItemIcon = (menuItem: AccountMenuLevelProps) => {
    if (menuItem.icon) {
        return (
            <ListItemIcon>
                {menuItem.icon}
            </ListItemIcon>
        );
    }
    return null;
};

const renderLogoutIcon = (classes: Record<ClassKey, string>, signOutIcon?: React.ReactElement<SvgIconProps>) => {
    if (signOutIcon) {
        return (
            <ListItemIcon classes={{ root: classes.signOutButton }}>
                {signOutIcon}
            </ListItemIcon>
        );
    }
    return null;
};

const AccountMenuWithStyle: React.ComponentType<AccountMenuProps & WithTheme> = withStyles(createSytle)(AccountMenuBase);
const AccountMenuWithTheme: React.ComponentClass<AccountMenuProps> = withTheme()(AccountMenuWithStyle);
/**
 * Display a menu with account card and logout button
 */
export const AccountMenu: React.ComponentClass<AccountMenuProps> = (AccountMenuWithTheme);
