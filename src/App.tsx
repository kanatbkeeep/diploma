import React from 'react';
import './App.css';
import './style/common.scss';
import {store} from './store/store'
import {Provider} from 'react-redux'
import Button from './components/Button/Button'
import Table from "./components/Table/Table";
import Dropdown from "./components/Dropdown/Dropdown";

function App() {
    const arr = Array.from({ length: 40 }, (_, i) => ({
        id:i,
        firstname: `Firstname${i}`,
        lastname: "Myrzasary",
        middlename: "Timurylu",
        age: 20,
    }));


    return (
        <Provider store={store}>

            <Dropdown
            maxWidth={300}
            value="Select"
            >
                <ul>
                    <li>
                        react
                    </li>
                    <li>
                        vue
                    </li>
                    <li>
                        vue
                    </li>
                    <li>
                        vue
                    </li>
                    <li>
                        vue
                    </li>
                    <li>
                        vue
                    </li>
                    <li>
                        vue
                    </li>
                    <li>
                        vue
                    </li>
                    <li>
                        vue
                    </li>
                </ul>
            </Dropdown>

        </Provider>
    );
}

export default App;
