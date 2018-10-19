import { Grid, IconButton, Paper, Popper, Typography, WithTheme, withTheme } from '@material-ui/core';
import { HelpCircle } from 'mdi-material-ui';
import * as React from 'react';
import { style } from './style';

export interface HelperButtonProps {
    /**
     * The text to display in the top of the helper popup
     */
    helperTitle: string;
    /**
     * The component to display in the pop up
     */
    contentComponent: React.ReactNode;
}
class CardTitleState {
    /**
     * on which element show the help menu. if undefined the menu is not show
     */
    readonly anchorEl?: null | HTMLElement | ((element: HTMLElement) => HTMLElement) = null;
    /**
     * open the help menu
     */
    readonly open: boolean = false;
    /**
     * open the help menu on Hober
     */
    readonly openHover: boolean = false;
}
class HelperButtonBase extends React.PureComponent<HelperButtonProps & WithTheme, CardTitleState> {

    readonly state = new CardTitleState();

    toggleHelpMenu = (event: React.MouseEvent<HTMLElement>) => {
        const { currentTarget } = event;
        this.setState((prevState) => {
            if (prevState.open) {
                return ({
                    anchorEl: null,
                    open: false,
                });
            } else {
                return ({
                    anchorEl: currentTarget,
                    open: true,
                });
            }
        });
    }

    openHelpMenuHover = (event: React.MouseEvent<HTMLElement>) => {
        if (!this.state.open) {
            const { currentTarget } = event;
            this.setState(() => ({
                anchorEl: currentTarget,
                openHover: true,
            }));
        }
    }

    closeHelpMenuHover = () => {
        if (!this.state.open) {
            this.setState(() => ({
                anchorEl: null,
                openHover: false,
            }));
        }
    }

    renderMenuHelp = (): React.ReactNode => {
        return (
            <Paper style={style(this.props.theme).helpPaper}>
                <Grid container={true} justify={'center'} style={style(this.props.theme).helpLineContainer} >
                    <Typography variant={'headline'} style={style(this.props.theme).helpTitle} >
                        {this.props.helperTitle}
                    </Typography>
                </Grid>
                <Grid container={true} style={style(this.props.theme).helpContentContainer}>
                    {this.props.contentComponent}
                </Grid>
            </Paper>
        );
    }

    render(): React.ReactNode {

        const { theme } = this.props;
        const id = open ? 'popper-helper' : undefined;

        const popperModifiers = {
            flip: {
                enabled: true,
            },
            preventOverflow: {
                enabled: true,
                boundariesElement: 'scrollParent',
            },
        };

        return (
            <div>
                <IconButton
                    onPointerEnter={(event) => this.openHelpMenuHover(event)}
                    onPointerLeave={() => this.closeHelpMenuHover()}
                    onClick={(event) => this.toggleHelpMenu(event)}
                    style={style(theme).helpButton}
                >
                    <HelpCircle color={this.state.open ? 'primary' : 'default'} style={style(theme).helpIcon} />
                </IconButton>
                <Popper
                    id={id}
                    placement="bottom-end"
                    open={this.state.open || this.state.openHover}
                    anchorEl={this.state.anchorEl}
                    modifiers={popperModifiers}
                >
                    {this.renderMenuHelp()}
                </Popper>
            </div>
        );
    }
}

const HelperButtonWithTheme: React.ComponentType<HelperButtonProps> = withTheme()(HelperButtonBase);

/**
 * Helper Button to display a popup
 */
export const HelperButton: React.ComponentType<HelperButtonProps> = (HelperButtonWithTheme);
