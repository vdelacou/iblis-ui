import { Typography } from '@material-ui/core';
import { withInfo } from '@storybook/addon-info';
import { RenderFunction, storiesOf } from '@storybook/react';
import * as React from 'react';
import { ContentWithTitle, HelperButton } from '../../../src';
import { injectTheme } from '../../decorators';

export default storiesOf('1.5 Content With Title Layout', module)
  .addDecorator((story: RenderFunction) => {
    return (
      injectTheme(story)
    );
  })
  //
  .add('ContentWithTitle', withInfo({ source: true })(() => (
    <ContentWithTitle
      title={'Change password'}
    >
      {'Place Content Here'}
    </ContentWithTitle>
  )))
  //
  .add('Content With Title and helper button', () => {

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
      <ContentWithTitle
        title={'Change password'}
        rightComponent={renderHelperButton()}
      >
        {'Place Content Here'}
      </ContentWithTitle>
    );
  })
  //
  ;
