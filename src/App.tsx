import React from 'react';
import './App.css';
import './style/common.scss';
import {observer} from "mobx-react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Login from "./pages/authorization/Login";
import Profile from "./pages/profile/Profile";
import CreationPlan from "./pages/creation_plan/CreationPlan";
import Test from "./pages/test/Test";
import Registration from "./pages/authorization/Registration";
import AppStore from "./store/AppStore";
import LoadingSpinner from "./components/LoadingSpinner/LaodingSpinner";
import ForgetPassword from "./pages/authorization/ForgetPassword";
import ResetPassword from "./pages/authorization/ResetPassword";

function App() {

    return (
        <>
            {AppStore.isLoading ? <LoadingSpinner/> : null}
            <Router>
                <Routes>
                    <Route path="/" element={<Profile/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/creation-plan" element={<CreationPlan/>}/>
                    <Route path="/plan/:id" element={<CreationPlan/>}/>
                    <Route path="/forget" element={<ForgetPassword/>}/>
                    <Route path="/reset" element={<ResetPassword/>}/>
                    <Route path="/test" element={<Test/>} />
                </Routes>
            </Router>
        </>
    )
}

export default observer(App);
