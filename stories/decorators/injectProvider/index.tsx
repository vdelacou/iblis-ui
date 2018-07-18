import { RenderFunction } from '@storybook/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, compose, createStore, ReducersMapObject, Store, StoreEnhancerStoreCreator } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { logger } from 'redux-logger';

// Combine all app Reducers
const reducersList: ReducersMapObject = {
    form: formReducer,
};

// Combine all app Reducers
const reducers = combineReducers(reducersList);

// create redux store with all app reducers amd all the middleware
const store: Store<{}> = createStore(
    // reducers
    reducers,
    // preload state
    {},
    // enhancers
    compose<StoreEnhancerStoreCreator<{}>>(
        // add list of needed middleWare
        applyMiddleware(
            // logger
            logger
        ),
    )
);

export const injectProvider = (story: RenderFunction) => {
    return (
        <Provider store={store}>
            {story()}
        </Provider>
    );
};
