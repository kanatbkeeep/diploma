import React from 'react';
import './App.css';
import './style/common.scss';
import {store} from './store/store'
import {Provider} from 'react-redux'
import Button from './components/Button/Button'
import Table from "./components/Table/Table";
import Input from "./components/Input/Input";

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

            <Input
                label="Email"
            maxWidth={200}
            />

            <Input
                type="password"
                label="Passowrd"
                maxWidth={200}
            />

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
                array={arr}
                rowsPerPage={4}
                maxWidthTable={800}
                maxWidthColumns={[200, 200, 200, 200]}
                haveDelete={true}
                onDelete={()=>{
                    console.log("deleted");
                }}
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

            <div style={{backgroundColor:"black"}}>
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5537 7.55928L12.005 0.804521C12.3928 0.398493 13.0216 0.398493 13.4094 0.804521C13.7971 1.21055 13.7971 1.86885 13.4094 2.27488L5.5537 10.5L0.991038 5.72275C0.603248 5.31672 0.603248 4.65842 0.991038 4.25239C1.37883 3.84636 2.00756 3.84636 2.39535 4.25239L5.5537 7.55928Z" fill="white"/>
                </svg>
            </div>

        </Provider>
    );
}

export default App;
