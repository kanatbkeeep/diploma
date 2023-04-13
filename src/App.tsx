import React from 'react';
import './App.css';
import './style/common.scss';
import {store} from './store/store'
import {Provider} from 'react-redux'
import Button from './components/Button/Button'
import Table from "./components/Table/Table";

function App() {
    return (
        <Provider store={store}>
            <Button
                type={'primaryButton'}
                label={'Button'}
            />
            <br/>
            <br/>
            <Button
                type={'secondaryButton'}
                label={'Button'}
            />
            <br/>
            <br/>
            <Button
                type={'primaryButtonAdd'}
                label={'Button'}
            />
            <br/>
            <Button
                type={'secondaryButtonAdd'}
                label={'Button'}
            />
            <br/>
            <Button
                type={'smallBlue'}
            />
            <br/>
            <br/>
            <Button
                type={'smallRed'}
            />
            <br/>
            <br/>
            <Button
                type={'smallDark'}
            />

                <Table/>
        </Provider>
    );
}

export default App;
