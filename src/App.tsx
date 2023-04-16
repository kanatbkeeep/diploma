import React from 'react';
import './App.css';
import './style/common.scss';
import {store} from './store/store'
import {Provider} from 'react-redux'
import Button from './components/Button/Button'
import Table from "./components/Table/Table";

function App() {
    const arr = Array.from({ length: 4 }, (_, i) => ({
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
                maxWidthTable={800}
                maxWidthColumns={[200, 200, 200, 200]}
                haveDelete={true}
                renderHead={(maxWidthColumns) => {
                    return <div>
                        <div style={{maxWidth:50}}></div>
                        <div style={{maxWidth: maxWidthColumns[0]}}>Имя</div>
                        <div style={{maxWidth: maxWidthColumns[1]}}>Фамилия</div>
                        <div style={{maxWidth: maxWidthColumns[2]}}>Отчество</div>
                        <div style={{maxWidth: maxWidthColumns[3]}}>Возраст</div>
                    </div>
                }}
                renderBody={(item, index, maxWidthColumns, checkbox) => {
                    return (
                        <div key={index}>
                            <div style={checkbox ? {maxWidth:50} : {}}>{checkbox}</div>
                            <div style={{maxWidth: maxWidthColumns[0]}}>{item.firstname}</div>
                            <div style={{maxWidth: maxWidthColumns[1]}}>{item.lastname}</div>
                            <div style={{maxWidth: maxWidthColumns[2]}}>{item.middlename}</div>
                            <div style={{maxWidth: maxWidthColumns[3]}}>{item.age}</div>
                        </div>
                    );
                }}
            />

            <br/>

        </Provider>
    );
}

export default App;
