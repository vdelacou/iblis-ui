import { Grid, Paper, Typography, withTheme, WithTheme } from '@material-ui/core';
import * as React from 'react';
import { IblisButton, ProgressBar } from '../../../components/ui_components';
import { style } from './style';

export interface WizardFormOwnProps {
    /**
     * The list of text to display
     */
    menuList: string[];
}

class WizardFormState {
    /**
     * The active index to show (first one is zero)
     * @default 0
     */
    readonly activeIndex: number = 0;
}

export interface WizardFormProps extends WizardFormOwnProps { }

class WizardFormComponent extends React.PureComponent<WizardFormProps & WithTheme, WizardFormState> {

    readonly state = new WizardFormState();

    render(): React.ReactNode {

        const { menuList, theme } = this.props;
        const { activeIndex } = this.state;

        return (
            <Paper elevation={1}>
                {/* Title */}
                <Grid container={true} justify={'center'} style={style(theme).container}>
                    <Grid item={true} >
                        <Typography variant={'title'} align={'center'}>
                            {'Build Your Campaign'}
                        </Typography>
                        <Typography variant={'subheading'} align={'center'}>
                            {'This information will let us build the best campaign for you.'}
                        </Typography>
                    </Grid>
                </Grid>
                {/* Progress Bar */}
                <ProgressBar menuList={menuList} activeIndex={activeIndex} />
                {/* SubTitle */}
                <Grid container={true} justify={'center'} style={style(theme).container}>
                    <Grid item={true} >
                        <Typography variant={'subheading'} align={'center'}>
                            {'Add the pictures you want to test.'}
                        </Typography>
                    </Grid>
                </Grid>
                {/* Children */}
                <Grid container={true} justify={'center'} style={style(theme).container}>
                    <Grid item={true} xs={6}>
                        {'Form'}
                    </Grid>
                </Grid>
                {/* Buttons */}
                <Grid container={true} justify={'space-between'} style={style(theme).container}>
                    <Grid item={true} >
                        <IblisButton
                            buttonType="default"
                            buttonLabel={'Previous'}
                            onClick={() => this.setState({ activeIndex: activeIndex - 1 })}
                        />
                    </Grid>
                    <Grid item={true} >
                        <IblisButton
                            buttonType="primary"
                            buttonLabel={'Next'}
                            onClick={() => this.setState({ activeIndex: activeIndex + 1 })}
                        />
                    </Grid>
                </Grid>
            </Paper >
        );
    }

}

const WizardFormWithTheme: React.ComponentType<WizardFormProps> = withTheme()(WizardFormComponent);

/**
 * A simple form for update or delete an entity with only one element
 * If no edit or delete button asked, then the menu is not displayed
 */
export const WizardForm: React.ComponentType<WizardFormProps> = (WizardFormWithTheme);
