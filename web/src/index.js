import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from 'shared';
import App from './App';

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

import { enableHMR } from 'nodeblues/browser';

enableHMR('localhost', 1338);
