import React from 'react';
import './App.css';
import './style/common.scss';
import {store} from './store/store'
import {Provider} from 'react-redux'
import Button from './components/Button/Button'
import Table from "./components/Table/Table";
import Login from "./pages/authorization/Login";
import Input from "./components/Input/Input";
import Checkbox from "./components/Checkbox/Checkbox";

function App() {
    const arr = Array.from({ length: 40 }, (_, i) => ({
        id:i,
        firstname: `Firstname${i}`,
        lastname: "Myrzasary",
        middlename: "Timurylu",
        age: 20,
    }));
    return (
        // <Login/>

        <>
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
