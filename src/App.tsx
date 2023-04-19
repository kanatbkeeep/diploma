import React from 'react';
import './App.css';
import './style/common.scss';
import {store} from './store/store'
import {Provider} from 'react-redux'
import Button from './components/Button/Button'
import Table from "./components/Table/Table";
import Login from "./pages/authorization/Login";
import Input from "./components/Input/Input";

function App() {
    return (
        <Login/>
    )
}

export default App;
