import React from 'react';
import './App.css';
import './style/common.scss';
import {Provider} from 'react-redux'
import Button from './components/Button/Button'
import Table from "./components/Table/Table";
import Dropdown from "./components/Dropdown/Dropdown";
import Login from "./pages/authorization/Login";
import Input from "./components/Input/Input";
import Checkbox from "./components/Checkbox/Checkbox";
import Profile from "./pages/profile/Profile";


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
           <Profile/>
        </>
    )
}

export default App;
