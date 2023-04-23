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
import CreationPlan from "./pages/creation_plan/CreationPlan";
import Test from "./pages/test/Test";


function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Profile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/creation-plan" element={<CreationPlan/>}/>
                    <Route path="/test" element={<Test/>} />
                </Routes>
            </Router>
        </>
    )
}

export default App;
