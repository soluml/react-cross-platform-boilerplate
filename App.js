import { Provider } from 'react-redux';
import { store } from './shared/src/store';
import Counter from './native/src/components/Counter';
import CounterContainer from './shared/src/containers/CounterContainer';
import React from 'react';

const AppCounter = CounterContainer(Counter);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppCounter />
      </Provider>
    );
  }
}
