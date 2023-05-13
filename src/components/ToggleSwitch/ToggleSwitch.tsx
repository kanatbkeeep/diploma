import React, {useEffect, useState} from "react";
import {observer} from 'mobx-react';
import t, {l} from "../../utils/Lang";
import FilePicker from "../FilePicker/FilePicker";
import Cross from "../../assets/icon/cross.svg";
import CrossWhite from "../../assets/icon/crossWhite.svg";
import TickWhite from "../../assets/icon/tickWhite.svg";
import Input from "../Input/Input";
import EditProfileStore from "../../store/EditProfileStore";
import Dropdown from "../Dropdown/Dropdown";
import Button from "../Button/Button";
import Profile from "../../pages/profile/Profile";
import AppStore from "../../store/AppStore";
import ApproveStore from "../../store/ApproveStore";

const ToggleSwitch = (props: any) => {
    return (
        <div className='toggleSwitch'>
            <span>Plans to approve</span>
            <input type="checkbox" id="switch" checked={props.checked} onChange={props.onChange}/><label htmlFor="switch">Toggle</label>
            <span style={{marginLeft: "7px"}}>My plans</span>
        </div>
    )
}

export default observer(ToggleSwitch);