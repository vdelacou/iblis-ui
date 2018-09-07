import { withInfo } from '@storybook/addon-info';
// storyBook
import { RenderFunction, storiesOf } from '@storybook/react';
import * as React from 'react';
// components
import { WizardForm } from '../../../../src';
// Redux Form
import { injectProvider, injectTheme } from '../../../decorators';

storiesOf('2.2.7 Wizard Form', module)
    .addDecorator((story: RenderFunction) => {
        return (
            injectTheme(story)
        );
    })
    .addDecorator((story: RenderFunction) => {
        return (
            injectProvider(story)
        );
    })
    //
    .add('WizardForm',
        withInfo({
            source: true,
        })
            (() => {
                return (
                    <WizardForm
                        menuList={['Campaign', 'Pictures', 'Concept', 'Panel']}
                    />
                );
            }
            )
        //
    );

//
