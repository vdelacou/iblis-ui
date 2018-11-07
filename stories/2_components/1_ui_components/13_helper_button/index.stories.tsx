import { Typography } from '@material-ui/core';
import { RenderFunction, storiesOf } from '@storybook/react';
import * as React from 'react';
import { HelperButton } from '../../../../src';
import { injectTheme } from '../../../decorators';

export default storiesOf('2.1.13 Helper Button', module)
  .addDecorator((story: RenderFunction) => {
    return (
      injectTheme(story)
    );
  })
  //
  .add('FilterButton', (() => {

    const contentComponent = () => {
      return (
        <Typography variant={'body2'}>
          {'If we notice any strange activity on your account, we’ll reset your password and log everyone out (including you). '}
        </Typography>
      );
    };

    return (
      <HelperButton
        helperTitle={'Account'}
        contentComponent={contentComponent()}
      />
    );
  }
  ))
  //
  ;
