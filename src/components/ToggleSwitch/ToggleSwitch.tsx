import React from "react";
import {observer} from 'mobx-react';

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