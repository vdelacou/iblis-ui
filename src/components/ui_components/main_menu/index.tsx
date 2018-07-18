import {
    AppBar, Avatar, Button, ClickAwayListener, Grid, Hidden, Popper, Tab, Tabs, Theme, Toolbar, Typography, //
    WithStyles, withStyles, WithTheme, withTheme, withWidth
} from '@material-ui/core';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { WithWidthProps } from '@material-ui/core/withWidth';
import * as React from 'react';
import { ClassKey, createSytle, style } from './style';

export interface MainMenuLevelProps {
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

export interface MainMenuProps {
    /**
     * The main title
     * @default Iblis
     */
    mainTitle?: string;
    /**
     * The main logo element (can be img, svg, ...)
     */
    mainLogo?: React.ReactNode;
    /**
     * The menu tree (2 levels)
     */
    menu: Array<
    {
        firstLevel: MainMenuLevelProps;
        sublevel: MainMenuLevelProps[];
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
    secondLevelActive: number;
    /**
     * The component to display in modal when lastMenuOpen is true
     */
    lastMenuComponent: React.ReactNode;
    /**
     * The last main menu url of pic to display, if undefined, then use the menu icon
     */
    lastMenuPicUrl?: string;
    /**
     * The main title action
     */
    mainTitleAction?: () => void;
}

class MainMenuState {
    /**
     * on which element show the menu. if undefined the menu is not show
     */
    readonly anchorEl?: any = undefined;
}

class MainMenuBase extends React.PureComponent<MainMenuProps & WithStyles<ClassKey> & WithTheme & WithWidthProps, MainMenuState>  {

    readonly state = new MainMenuState();

    tabs: any;

    renderLogo = (logoSrc?: React.ReactNode) => {
        // if no logo we return nothing
        if (logoSrc) {
            return (<div>{logoSrc}</div>);
        }
        return null;
    }

    renderMenu = () => {
        return this.props.menu.map((
            menuItem: {
                firstLevel: MainMenuLevelProps;
                sublevel: MainMenuLevelProps[];
            },
            index: number) => {
            // we render all the menu with text and icon
            if (this.props.menu.length - 1 !== index) {
                return (
                    <Tab
                        key={index}
                        label={menuItem.firstLevel.name}
                        icon={this.props.width !== 'xs' ? menuItem.firstLevel.icon : undefined}
                        onClick={() => menuItem.firstLevel.action()}
                    />
                );
            } else {

                // if mobile we don't display the icon, if we have pic url we display it, if not we display the menu icon
                const iconToDisplay = this.props.width !== 'xs' ?
                    this.props.lastMenuPicUrl ?
                        (<Avatar src={this.props.lastMenuPicUrl} classes={{ root: this.props.classes.appBarLastMenuAvatar }} />) : menuItem.firstLevel.icon : undefined;
                // for the last menu, we render it differently (pop up)
                return (
                    <Tab
                        key={index}
                        label={menuItem.firstLevel.name + '\u25BE'} // display the ▾
                        icon={iconToDisplay}
                        onClick={(event) => { const ref = event.currentTarget; this.setState(() => { return { anchorEl: ref }; }); }}
                    />
                );

            }
        });
    }

    renderTabMenu = (level: MainMenuLevelProps[]) => {
        return level.map((menuItem: MainMenuLevelProps, index: number) => {
            return (
                <Tab
                    key={index}
                    label={this.renderTabSubMenu(menuItem.name, this.props.theme, menuItem.icon)}
                    style={style(this.props.theme).tabSubMenu}
                    classes={{ labelContainer: this.props.classes.tabLabelContainer }}
                    onClick={() => menuItem.action()}
                />
            );
        });
    }

    renderTabSubMenu = (textName: string, theme: Theme, icon?: React.ReactElement<SvgIconProps>) => {
        // we want to display the icon besides the text and not under like in nornam tabs
        return (
            <Grid container={true} alignContent={'center'} alignItems={'center'}>
                {icon && React.createElement(icon.type, { style: style(theme).tabSubIcon })}
                {textName}
            </Grid >
        );
    }

    renderLastMenuPortal = () => {
        const open = Boolean(this.state.anchorEl);
        const modifiers = {
            flip: {
                enabled: true,
            },
            preventOverflow: {
                enabled: true,
                boundariesElement: 'scrollParent',
            },
        };
        return (
            <Popper
                open={open}
                anchorEl={this.state.anchorEl}
                placement={this.props.width !== 'xs' ? 'bottom-end' : 'bottom'}
                modifiers={modifiers}
            >
                {() => this.renderPopperChildren()}
            </Popper>

        );
    }

    renderPopperChildren = () => {
        return (
            <ClickAwayListener
                onClickAway={() => this.setState(() => { return { anchorEl: undefined }; })}
            >
                <div onClick={() => this.setState(() => { return { anchorEl: undefined }; })}>
                    {this.props.lastMenuComponent}
                </div>
            </ClickAwayListener>
        );
    }

    render(): React.ReactNode {

        const { mainTitle = 'Iblis', firstLevelActive, secondLevelActive, classes, theme, width } = this.props;

        // we fallback to zero if try to activate unknown menu
        const firstLevelIndex = this.props.menu.length > firstLevelActive ? firstLevelActive : 0;
        const secondLevelIndex = this.props.menu[firstLevelIndex].sublevel.length > secondLevelActive ? secondLevelActive : 0;
        return (
            <div>
                {/* the main menu */}
                <AppBar
                    position="static"
                    elevation={0}
                    classes={{ root: classes.appBarFirstMenuRoot }}
                >
                    <Toolbar style={style(theme).toolBar} >
                        {/* Hide the title and logo and mobile */}
                        <Hidden only={['xs']}>
                            <Button
                                color="inherit"
                                classes={{ root: classes.titleButton }}
                                onClick={() => this.props.mainTitleAction ? this.props.mainTitleAction() : undefined}
                            >
                                {this.renderLogo(this.props.mainLogo)}
                                <Typography variant="title" color="inherit">
                                    {mainTitle.toUpperCase()}
                                </Typography>
                            </Button>
                        </Hidden>
                        <Tabs
                            value={firstLevelIndex}
                            indicatorColor="primary"
                            style={style(theme).tabsFirstMenuContainer}
                            classes={{ flexContainer: width === 'xs' ? classes.tabsFlexContainerXs : classes.tabsFlexContainer }}
                        >
                            {this.renderMenu()}
                        </Tabs>
                    </Toolbar>
                </AppBar>
                {/* the sub menu */}
                <AppBar
                    position={'static'}
                    color={'inherit'}
                    elevation={0}
                    classes={{ root: classes.appBarSubMenuRoot }}
                >
                    <Toolbar
                        style={style(theme).toolBar}
                        classes={{ root: classes.toolBarSubMenuRoot }}
                    >
                        <Tabs
                            value={secondLevelIndex}
                            textColor={'primary'}
                            indicatorColor={'primary'}
                            scrollable={true}
                            scrollButtons={'off'}
                        >
                            {this.renderTabMenu(this.props.menu[firstLevelIndex].sublevel)}
                        </Tabs>
                    </Toolbar>
                </AppBar>
                {/* the menu inside a portal */}
                {this.renderLastMenuPortal()}
            </div>
        );
    }
}

const MainMenuWithStyle: React.ComponentType<MainMenuProps & WithTheme & WithWidthProps> = withStyles(createSytle)(MainMenuBase);
const MainMenuWithTheme: React.ComponentClass<MainMenuProps & WithWidthProps> = withTheme()(MainMenuWithStyle);
const MainMenuWithWidth: React.ComponentClass<MainMenuProps> = withWidth()(MainMenuWithTheme);

/**
 * Component to display a menu. This menu is responsive.
 * On mobile the title and logo are hidden and the tabs are displayed in columns.
 * On mobile the sublevel menu can be scrolled horizontally.
 * The last menu item can show a popup modal.
 * All the icons or logos are optional
 */
export const MainMenu: React.ComponentClass<MainMenuProps> = (MainMenuWithWidth);
