import { AppBar, Grid, ListItemText, MenuItem, MenuList, Paper, Tab, Tabs, Theme, Toolbar, withStyles, WithStyles, WithTheme, withTheme, withWidth } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { WithWidth } from '@material-ui/core/withWidth';
import * as React from 'react';
import { ClassKey, createSytle, style } from './style';

export interface CardMenuLevelProps {
    /**
     * The text to display in the menu item
     */
    name: string;
    /**
     * The action when click on menu item
     */
    action: () => void;
}

export interface CardMenuProps {
    /**
     * The menu tree (2 levels)
     */
    menu: Array<
    {
        firstLevel: CardMenuLevelProps;
        sublevel?: CardMenuLevelProps[];
    }
    >;
    /**
     * The first level of menu to be active
     * If more than the level possible fallback to 0
     */
    firstLevelActive: number;
    /**
     * The second level of menu to be active
     * If more than the level possible fallback to 0
     */
    secondLevelActive?: number;
}

const CardMenuBase: React.StatelessComponent<CardMenuProps & WithStyles<ClassKey> & WithTheme & WithWidth & { children?: React.ReactNode }> = (props) => {

    const { menu, firstLevelActive, secondLevelActive, theme, classes, width, children } = props;
    // we fallback to zero if try to activate unknown menu
    const firstLevelIndex = menu.length > firstLevelActive ? firstLevelActive : 0;
    const subLevel = menu[firstLevelIndex].sublevel;
    const secondLevelIndex = secondLevelActive ? subLevel ? subLevel.length > secondLevelActive ? secondLevelActive : 0 : 0 : 0;

    const firstLevelMenu = menu.map((item) => { return item.firstLevel; });

    return (
        <Paper>
            {/* the menu */}
            <AppBar
                position={'static'}
                color={'inherit'}
                elevation={0}
                classes={{ root: classes.appBarMenuRoot }}
            >
                <Toolbar
                    classes={{ root: classes.toolBarMenuRoot }}
                >
                    <Tabs
                        value={firstLevelIndex}
                        textColor={'primary'}
                        indicatorColor={'primary'}
                        scrollable={true}
                        scrollButtons={'off'}
                    >
                        {renderTabMenu(firstLevelMenu, theme, classes)}
                    </Tabs>
                </Toolbar>
            </AppBar>
            {renderSubMenu(secondLevelIndex, children, theme, width, menu[firstLevelIndex].sublevel)}
        </Paper >
    );
};

const renderTabMenu = (level: CardMenuLevelProps[], theme: Theme, classes: Record<ClassKey, string>) => {
    return level.map((menuItem: CardMenuLevelProps, index: number) => {
        return (
            <Tab
                key={index}
                label={menuItem.name}
                style={style(theme).tabMenu}
                classes={{ labelContainer: classes.tabLabelContainer }}
                onClick={() => menuItem.action()}
            />
        );
    });
};

const renderSubMenu = (selectedIndex: number, children: React.ReactNode, theme: Theme, width: Breakpoint, level?: CardMenuLevelProps[]) => {
    if (level) {
        return (
            <Grid container={true}>
                <Grid item={true} xs={2} >
                    <MenuList style={width === 'xs' || width === 'sm' ? style(theme).menuContainerSmall : style(theme).menuContainer}>
                        {renderMenuItem(level, selectedIndex)}
                    </MenuList>
                </Grid>
                <Grid item={true} xs={10} style={style(theme).contentContainer}>
                    {children}
                </Grid >
            </Grid >
        );
    } else {
        return (
            <div style={style(theme).contentContainer}>
                {children}
            </div>
        );
    }
};

const renderMenuItem = (level: CardMenuLevelProps[], selectedIndex: number) => {
    return level.map((menuItem: CardMenuLevelProps, index: number) => {
        return (
            <MenuItem key={index} selected={selectedIndex === index} onClick={() => menuItem.action()} >
                <ListItemText primary={menuItem.name} />
            </MenuItem>
        );
    });
};

const CardMenuWithStyle: React.ComponentType<CardMenuProps & WithWidth> = withStyles(createSytle)(CardMenuBase);
const CardMenuWithTheme: React.ComponentType<CardMenuProps & WithWidth> = withTheme()(CardMenuWithStyle);
const CardMenuWithWidth: React.ComponentType<CardMenuProps> = withWidth()(CardMenuWithTheme);

/**
 * A card with menu on two levels.
 * If only one level, the content is directly displayed
 * If two level another vertical menu appears (horizontal on mobile)
 */
export const CardMenu: React.ComponentType<CardMenuProps> = (CardMenuWithWidth);
