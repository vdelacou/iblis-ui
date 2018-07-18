import { Avatar, Grid, Theme, Typography, WithTheme, withTheme } from '@material-ui/core';
import { capitalize } from '@material-ui/core/utils/helpers';
import { IblisButton } from '@src/components';
import * as React from 'react';
import { style } from './style';

export interface AccountCardProps {
    /**
     * The first name of the user
     */
    firstName?: string;
    /**
     * The last name of the user
     */
    lastName?: string;
    /**
     * The email of the user
     */
    email: string;
    /**
     * The avatar url
     */
    avatarUrl?: string;
    /**
     * The text to display on the button
     */
    buttonText: string;
    /**
     * The Function to launch when button is clicked
     */
    buttonAction: () => void;
}

const AccountCardBase: React.StatelessComponent<AccountCardProps & WithTheme> = (props) => {

    const { firstName, lastName, email, buttonText, buttonAction, avatarUrl, theme } = props;

    // if no name we display email
    let fullName: string = email;
    // display full name or just firstname or lastname
    if (firstName && lastName) {
        fullName = `${capitalize(firstName)}  ${capitalize(lastName)}`;
    } else {
        if (firstName) {
            fullName = capitalize(firstName);
        }
        if (lastName) {
            fullName = capitalize(lastName);
        }
    }

    return (
        <Grid container={true} spacing={16}>
            {renderAvatar(fullName, theme, avatarUrl)}
            <Grid item={true}>
                <Grid container={true} direction="column" justify={'space-between'} style={style(theme).rightContainer}>
                    <Grid item={true}>
                        <Grid container={true} direction="column">
                            <Grid item={true}>
                                <Typography variant="subheading">
                                    {fullName}
                                </Typography>
                            </Grid>
                            <Grid item={true}>
                                <Typography variant="caption">
                                    {email}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item={true}>
                        <IblisButton
                            buttonType={'default'}
                            buttonLabel={buttonText}
                            onClick={() => buttonAction()}
                        />
                    </Grid>
                </Grid>
            </Grid >
        </Grid >
    );
};

const renderAvatar = (fullName: string, theme: Theme, avatarUrl?: string) => {
    if (avatarUrl) {
        return (
            <Grid item={true}>
                <Avatar alt={fullName} src={avatarUrl} style={style(theme).bigAvatar} />
            </Grid>
        );
    }
    return null;
};

const AccountCardWithTheme: React.ComponentClass<AccountCardProps> = withTheme()(AccountCardBase);
/**
 * Component to display an account with an image url, firstName, LastName and email.
 * If no picture display only name and email.
 * If no firstname or lastname then display the email twice.
 */
export const AccountCard: React.ComponentClass<AccountCardProps> = (AccountCardWithTheme);
