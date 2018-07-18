import { AccountBox } from '@material-ui/icons';
import { withInfo } from '@storybook/addon-info';
import { RenderFunction, storiesOf } from '@storybook/react';
import * as React from 'react';
import { ExternalFormLayout } from '../../../src';
import { injectThemeWithoutLimitWidth } from '../../decorators';

export default storiesOf('1.2 External Form Layout', module)
  .addDecorator((story: RenderFunction) => {
    return (
      injectThemeWithoutLimitWidth(story)
    );
  })
  //
  .add('ExternalFormLayout', withInfo({ source: true })(() => (
    <ExternalFormLayout
      title={'Sign up to our Iblis App'}
      icon={<AccountBox />}
      tabLabel={'Login'}
      copyright={`© ${new Date().getFullYear()} Iblis`}
    >
      <div>Place Content Here</div>
    </ExternalFormLayout>
  )))
  //
  ;
