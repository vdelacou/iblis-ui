import { action } from '@storybook/addon-actions';
import { RenderFunction, storiesOf } from '@storybook/react';
import * as React from 'react';
import { ConfigProps, reduxForm } from 'redux-form';
import { ManagedSimpleListForm, ManagedSimpleListFormProps, ManagedSimpleListFormValues } from '../../../../src';
import { injectProvider, injectTheme } from '../../../decorators';

const requiredTextField = (value: string, _allValues: ManagedSimpleListFormValues, _props: ManagedSimpleListFormProps) => {
    return value && value.trim() !== '' ? undefined : 'Required';
};

export default storiesOf('2.2.3 Managed Simple List Form', module)
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
    .add('ManagedSimpleListForm', (() => {
        // configure the form
        const config = (): ConfigProps<ManagedSimpleListFormValues, ManagedSimpleListFormProps> => {
            const configForm: ConfigProps<ManagedSimpleListFormValues, ManagedSimpleListFormProps> = {
                form: 'ManagedSimpleListForm',
            };
            return configForm;
        };
        // connect the form
        const ConnectedForm = reduxForm(config())(ManagedSimpleListForm);
        const dataValue: ManagedSimpleListFormValues = { entityId: '234234', entityName: 'Marketing is the best in the world' };
        return (
            <ConnectedForm
                initValues={dataValue}
                editLabel={'Edit'}
                deleteLabel={'Delete'}
                validateFunctions={[requiredTextField]}
                editAction={action('Update')}
                deleteAction={action('Delete')}
            />
        );
    }))
    //
    ;
