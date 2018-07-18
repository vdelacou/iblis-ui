import { Store, withState } from '@dump247/storybook-state';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { RenderFunction, storiesOf } from '@storybook/react';
import * as React from 'react';
import { ManagedSimpleForm, ManagedSimpleFormProps } from '../../../../src';
import { injectProvider, injectTheme } from '../../../decorators';

interface State {
    isLoading: boolean;
    data: Array<{ id: string | number; name: string }>;
}

export default storiesOf('2.2.1 Managed Simple Form', module)
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
    .add('ManagedSimpleForm', withInfo({ source: true })(() => {

        const data = [
            { id: '1', name: 'Marketing' },
            { id: '2', name: 'Legal' },
        ];

        const ManagedSimpleFormOwnProps: ManagedSimpleFormProps = {
            data: data,
            idFieldName: 'id',
            displayFieldName: 'name',
            namePlaceHolder: 'Enter your name',
            addAction: action('Add Clicked'),
            editAction: action('Edit Clicked'),
            deleteAction: action('Delete Clicked'),
        };
        return (
            <ManagedSimpleForm
                {...ManagedSimpleFormOwnProps}
            />
        );
    }))
    //
    .add('Example', (withState(
        {
            data: [
                { id: '1', name: 'Marketing' },
                { id: '2', name: 'Legal' },
            ],
            isLoading: false,
        }
    )((story: any) => {
        const store: Store<State> = story.store as Store<State>;
        const state: State = store.state;

        const addAction = (value: { id: string | number; name: string }) => {
            store.set({ isLoading: true });
            setTimeout(() => {
                const newData = state.data;
                const entityId = Math.floor(Math.random() * 1000);
                value.id = entityId;
                newData.push(value);
                store.set({ data: newData, isLoading: false });
            }, 1000);
        };
        const editAction = (value: { id: string | number; name: string }) => {
            store.set({ isLoading: true });
            setTimeout(() => {
                const indexObjectToUpdate: number = state.data.findIndex((entity) => entity.id === value.id);
                const objectToUpdate = state.data[indexObjectToUpdate];
                objectToUpdate.name = value.name;
                const updateData = state.data;
                updateData[indexObjectToUpdate] = objectToUpdate;
                store.set({ data: updateData, isLoading: false });
            }, 1000);
        };
        const deleteAction = (id: string | number) => {
            store.set({ isLoading: true });
            setTimeout(() => {
                const indexObjectToDelete: number = state.data.findIndex((entity) => entity.id === id);
                const deleteData = state.data;
                deleteData.splice(indexObjectToDelete, 1);
                store.set({ data: deleteData, isLoading: false });
            }, 1000);
        };

        const ManagedSimpleFormOwnProps: ManagedSimpleFormProps = {
            data: state.data,
            idFieldName: 'id',
            displayFieldName: 'name',
            namePlaceHolder: 'Enter your name',
            addAction: (value) => addAction(value as { id: string | number; name: string }),
            editAction: (value) => editAction(value as { id: string | number; name: string }),
            deleteAction: (id) => deleteAction(id),
            isLoading: state.isLoading,
        };
        return (
            <ManagedSimpleForm
                {...ManagedSimpleFormOwnProps}
            />
        );
    })))
    //
    ;
