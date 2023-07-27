/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { CircularProgress, LinearProgress } from '@mui/material';
import App from './App';
import { store } from './store/store';
import muiTheme from './config/muiTheme';
import './config/i18next';
import registerServiceWorker from './serviceWorker';

// eslint-disable-next-line import/prefer-default-export
export const persistor = persistStore(store as any);

<link rel="preconnect" href="https://fonts.googleapis.com" />;
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />;
<link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;600;700&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap"
    rel="stylesheet"
/>;
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />;
<link
    href="https://fonts.cdnfonts.com/css/sf-pro-display?styles=98774,98777,98772,98773,98775,98770,98771"
    rel="stylesheet"
/>;

/* ###### CONSOLE FOR TEST / STAGING ENV ######## */
if (window?._env_?.NODE_ENV === 'Test') {
    console.log('########## RUNNING TEST ENVIRONMENT #########');
}
if (window?._env_?.NODE_ENV === 'Staging') {
    console.log('########## RUNNING STAGING ENVIRONMENT #########');
}

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<CircularProgress />} persistor={persistor}>
            <ThemeProvider theme={muiTheme}>
                <Suspense fallback={<LinearProgress />}>
                    <App />
                </Suspense>
            </ThemeProvider>
        </PersistGate>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
