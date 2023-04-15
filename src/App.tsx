import React from 'react';
import './App.css';
import './style/common.scss';
import {store} from './store/store'
import {Provider} from 'react-redux'
import Button from './components/Button/Button'
import Table from "./components/Table/Table";

function App() {
    const arr = Array.from({ length: 40 }, (_, i) => ({
        firstname: `Firstname${Math.floor(i / 4) + 1}`,
        lastname: "Myrzasary",
        middlename: "Timurylu",
        age: 20,
    }));


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
            <br/>
            <br/>
            <Table
                data={arr}
                rowsPerPage={4}
                renderHead={() => {
                    return <tr>
                        <th>Имя</th>
                        <th>Фамилия</th>
                        <th>Отчество</th>
                        <th></th>
                    </tr>
                }}
                renderRow={(item, index) => {
                    return (
                        <tr key={index}>
                            <td>{item.firstname}</td>
                            <td>{item.lastname}</td>
                            <td>{item.middlename}</td>
                            <td><Button
                                type={'smallDark'}
                                style={{marginLeft:10, display: "flex", flexDirection:"row"}}
                            />
                                <Button
                                    type={'smallRed'}
                                />
                            </td>
                        </tr>
                    );
                }}
            />

            <br/>

        </Provider>
    );
}

export default App;
