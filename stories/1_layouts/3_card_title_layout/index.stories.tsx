import { Grid, Typography } from '@material-ui/core';
import { action } from '@storybook/addon-actions';
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
  .add('CardTitleLayout', (() => (
    <CardTitleLayout title={'Account'}>
      {'Place Content Here'}
    </CardTitleLayout>
  )))
  //
  .add('Card Title Layout With Button', (() => (
    <CardTitleLayout
      title={'Account'}
      rightComponent={<IblisButton onClick={action('Button Clicked')} buttonLabel={'Publish'} buttonType={'primary'} icon={<Publish />} />}
    >
      {'Place Content Here'}
    </CardTitleLayout>
  )))
  //
  .add('Card Title Layout With Helper', (() => {

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
  .add('Card Title Layout With Helper and Button', (() => {

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
        <Grid container={true} direction={'row'} alignItems={'center'} spacing={24}>
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
