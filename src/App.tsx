import React from 'react';
import './App.css';
import './style/common.scss';
import {store} from './store/store'
import {Provider} from 'react-redux'
import Button from './components/Button/Button'
import Table from "./components/Table/Table";
import Dropdown from "./components/Dropdown/Dropdown";
import Login from "./pages/authorization/Login";
import Input from "./components/Input/Input";
import Checkbox from "./components/Checkbox/Checkbox";


function App() {
    // const arr = Array.from({ length: 40 }, (_, i) => ({
    //     id:i,
    //     firstname: i,
    //     lastname: "Myrzasary"+i,
    //     middlename: "Timurylu",
    //     age: 20,
    // }));

    const arr = [
        { id: 1, firstname: "Alice", lastname: "Smith", middlename: "Marie", age: 25 },
        { id: 2, firstname: "Bob", lastname: "Johnson", middlename: "William", age: 30 },
        { id: 3, firstname: "Charlie", lastname: "Brown", middlename: "Thomas", age: 40 },
        { id: 4, firstname: "David", lastname: "Lee", middlename: "Joseph", age: 20 },
        { id: 5, firstname: "Emma", lastname: "Lee", middlename: "Sophia", age: 35 },
    ];
    return (
           <>
            <Dropdown
            maxWidth={300}
            value='Select'
            >
                <ul>
                    <li>React</li>
                    <li>React</li>
                    <li>React</li><li>React</li>
                    <li>React</li>
                    <li>React</li>
                    <li>React</li>
                </ul>
            </Dropdown>
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
            <div style={{marginBottom: 16}}/>

            <Table
                search={true}
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
            <div style={{marginBottom: 16}}/>
            <Checkbox
                id="name"
            label="Daniyar"
            />
        </>
    )
}

export default App;
