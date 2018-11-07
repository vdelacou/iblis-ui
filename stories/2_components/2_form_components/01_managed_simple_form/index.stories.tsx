import { Store, withState } from '@dump247/storybook-state';
import { action } from '@storybook/addon-actions';
import { RenderFunction, storiesOf } from '@storybook/react';
import * as React from 'react';
import { ManagedSimpleForm, ManagedSimpleFormData, ManagedSimpleFormProps } from '../../../../src';
import { injectProvider, injectTheme } from '../../../decorators';
interface State {
    isLoading: boolean;
    data: Array<ManagedSimpleFormData<{ id: string | number; name: string }>>;
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
    .add('ManagedSimpleForm', (() => {

        const data = [
            {
                entity: { id: '1', name: 'Marketing' },
            },
            {
                entity: { id: '2', name: 'Legal' },
            },
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
                {
                    entity: { id: '1', name: 'Marketing' },
                    hasDelete: false,
                    leftComponent: <img src="https://image.freepik.com/free-photo/cute-cat-picture_1122-449.jpg" style={{ maxHeight: '100%' }} />,
                    menuAction: [
                        { label: 'Disabled', action: action('Disabled clicked') },
                    ],
                },
                {
                    entity: { id: '2', name: 'Legal' },
                    hasEdit: false,
                },
                {
                    entity: { id: '3', name: 'Sales' },
                },
                {
                    entity: { id: '4', name: 'Human ressources' },
                    hasEdit: false,
                    hasDelete: false,
                },
                {
                    entity: { id: '5', name: 'Operations' },
                    hasEdit: false,
                    hasDelete: false,
                    menuAction: [
                        { label: 'Enabled', action: action('Enabled clicked') },
                    ],
                },
                {
                    entity: { id: '6', name: 'Marketing' },
                    hasEdit: false,
                    hasDelete: false,
                    menuAction: [
                        { label: 'Up', action: action('Enabled clicked') },
                        { label: 'Down', disabled: true, action: action('Enabled clicked') },
                    ],
                },
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
                newData.push({ entity: value });
                store.set({ data: newData, isLoading: false });
            }, 1000);
        };
        const editAction = (value: { id: string | number; name: string }) => {
            store.set({ isLoading: true });
            setTimeout(() => {
                const indexObjectToUpdate: number = state.data.findIndex((objectToFind) => objectToFind.entity.id === value.id);
                const objectToUpdate = state.data[indexObjectToUpdate];
                objectToUpdate.entity.name = value.name;
                const updateData = state.data;
                updateData[indexObjectToUpdate] = objectToUpdate;
                store.set({ data: updateData, isLoading: false });
            }, 1000);
        };
        const deleteAction = (id: string | number) => {
            store.set({ isLoading: true });
            setTimeout(() => {
                const indexObjectToDelete: number = state.data.findIndex((objectToFind) => objectToFind.entity.id === id);
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
