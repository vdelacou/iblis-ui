
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { RenderFunction, storiesOf } from '@storybook/react';
import * as React from 'react';
import { ProgressBar } from '../../../../src';
import { injectTheme } from '../../../decorators';

export default storiesOf('2.1.3 Progress Bar', module)
    .addDecorator((story: RenderFunction) => {
        return (
            injectTheme(story)
        );
    })
    //
    .add('ProgressBar', withInfo({ source: true })(() => (
        <ProgressBar
            activeIndex={0}
            menuList={['Sourced', 'Applied', 'Interview', 'Hired']}
            action={action('step clicked')}
        />
    )))
    //
    .add('Progress Bar Middle', (() => (
        <ProgressBar
            activeIndex={2}
            menuList={['Sourced', 'Applied', 'Interview', 'Selection', 'Hired']}
        />
    )))
    //
    .add('Progress Bar End', (() => (
        <ProgressBar
            activeIndex={5}
            menuList={['Sourced', 'Applied', 'Interview', 'Selection', 'Probation', 'Hired']}
        />
    )))
    //
    ;
