import { applyMiddleware, createStore, compose } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage';
import rootSaga from '../server/sagas/rootSaga';
import reducers from './reducers';

const persistConfig = {
    key: 'root',
    storage: sessionStorage,
};
const persistedReducer = persistReducer(persistConfig, reducers);

const sagaMiddleware = createSagaMiddleware();
const middlewares: any = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

const initialState = {
    authentication: {},
    layout: {},
};

export const store = createStore(persistedReducer, initialState, compose(applyMiddleware(...middlewares)));
sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
