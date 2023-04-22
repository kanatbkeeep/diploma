import React from 'react';
import './App.css';
import './style/common.scss';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Button from './components/Button/Button'
import Table from "./components/Table/Table";
import Dropdown from "./components/Dropdown/Dropdown";
import Login from "./pages/authorization/Login";
import Input from "./components/Input/Input";
import Checkbox from "./components/Checkbox/Checkbox";
import Profile from "./pages/profile/Profile";


function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Profile />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Router>
        </>
    )
}

export default App;
