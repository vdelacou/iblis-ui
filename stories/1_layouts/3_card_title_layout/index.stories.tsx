import { Grid, Typography } from '@material-ui/core';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { RenderFunction, storiesOf } from '@storybook/react';
import { Publish } from 'mdi-material-ui';
import * as React from 'react';
import { CardTitleLayout, HelperButton, IblisButton } from '../../../src';
import { injectTheme } from '../../decorators';

export default storiesOf('1.3 Card With Title Layout', module)
  .addDecorator((story: RenderFunction) => {
    return (
      injectTheme(story)
    );
  })
  //
  .add('CardTitleLayout', withInfo({ source: true })(() => (
    <CardTitleLayout title={'Account'}>
      {'Place Content Here'}
    </CardTitleLayout>
  )))
  //
  .add('Card Title Layout With Button', withInfo({ source: true })(() => (
    <CardTitleLayout
      title={'Account'}
      rightComponent={<IblisButton onClick={action('Button Clicked')} buttonLabel={'Publish'} buttonType={'primary'} icon={<Publish />} />}
    >
      {'Place Content Here'}
    </CardTitleLayout>
  )))
  //
  .add('Card Title Layout With Helper', withInfo({ source: true })(() => {

    const contentComponent = () => {
      return (
        <Typography variant={'body2'}>
          {'If we notice any strange activity on your account, we’ll reset your password and log everyone out (including you). '}
        </Typography>
      );
    };

    const renderHelperButton = () => {
      return (
        <HelperButton
          helperTitle={'Account'}
          contentComponent={contentComponent()}
        />
      );
    };

    return (
      <CardTitleLayout
        title={'Account'}
        rightComponent={renderHelperButton()}
      >
        {'Place Content Here'}
      </CardTitleLayout >
    );
  })
  )
  //
  .add('Card Title Layout With Helper and Button', withInfo({ source: true })(() => {

    const contentComponent = () => {
      return (
        <Typography variant={'body2'}>
          {'If we notice any strange activity on your account, we’ll reset your password and log everyone out (including you). '}
        </Typography>
      );
    };

    const renderHelperButton = () => {
      return (
        <HelperButton
          helperTitle={'Account'}
          contentComponent={contentComponent()}
        />
      );
    };

    const renderRightComponent = () => {
      return (
        <Grid container={true} direction={'row'} alignItems={'center'}>
          <Grid item={true}>
            {renderHelperButton()}
          </Grid>
          <Grid item={true}>
            <IblisButton onClick={action('Button Clicked')} buttonLabel={'Publish'} buttonType={'primary'} icon={<Publish />} />
          </Grid>
        </Grid>
      );
    };

    return (
      <CardTitleLayout
        title={'Account'}
        rightComponent={renderRightComponent()}
      >
        {'Place Content Here'}
      </CardTitleLayout >
    );
  })
  )
  //
  ;
