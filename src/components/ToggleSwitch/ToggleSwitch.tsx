import React from "react";
import {observer} from 'mobx-react';

const ToggleSwitch = (props: any) => {
    return (
        <div className={props.checked ? 'toggleSwitch checkedToggleSwitch' : 'toggleSwitch'}>
            <span>{props.text1}</span>
            <input id={props.id} key={props.key} type="checkbox" checked={props.checked} onChange={props.onChange}/><label htmlFor={props.id}>Toggle</label>
            <span style={{marginLeft: "7px"}}>{props.text2}</span>
        </div>
    )
}

export default observer(ToggleSwitch);