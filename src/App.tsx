import React from 'react';
import './App.css';
import './style/common.scss';
import { store } from './store/store'
import { Provider } from 'react-redux'
import Button from './components/Button/Button'
function App() {
  return (
      <Provider store={store}>
        <Button
            label={'Button'}
        />
      </Provider>
  );
}

export default App;
