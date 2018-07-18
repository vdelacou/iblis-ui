import { Grid, Icon, WithTheme, withTheme } from '@material-ui/core';
import withWidth, { WithWidthProps } from '@material-ui/core/withWidth';
import classNames from 'classnames';
import * as React from 'react';
import { style } from './style';

const EmptyPageBase: React.StatelessComponent<WithTheme & WithWidthProps> = (props) => {

    const { theme, width } = props;

    return (
        <Grid container={true}>
            <Grid item={true} xs={12} style={style(theme).logoContainer}>
                <Icon className={classNames('iblis-rocket')} style={width !== 'xs' ? style(theme).logoFont : style(theme).logoFontSmall} />
            </Grid>
        </Grid >
    );
};

const EmptyPageWithTheme: React.ComponentClass<WithWidthProps> = withTheme()(EmptyPageBase);
const EmptyPageWithWidth: React.ComponentClass<{}> = withWidth()(EmptyPageWithTheme);

/**
 * Page to display when it's empty, display a logo in svg
 */
export const EmptyPage: React.ComponentClass<{}> = (EmptyPageWithWidth);
