import React from 'react';
import './App.css';
import { store } from './store/store'
import { Provider } from 'react-redux'

function App() {
  return (
      <Provider store={store}>
        test test
      </Provider>
  );
}

export default App;
