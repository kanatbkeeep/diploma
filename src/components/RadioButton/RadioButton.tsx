import React from 'react';

const RadioButton = (props:any) =>{

    return(
    <label className="radio-group">
        <div style={{width:10,marginRight:21}}>
            <input
                defaultChecked={props.defaultChecked}
                checked={props.checked}
                type="radio"
                onChange={props.onChange}
                id={props.id}
                value={props.value}
                name={props.name}
                className="radio-control"
                disabled={props.disabled}
            />
            <span className="checkmark"></span>
        </div>
        {props.label}
    </label>
    )
}

export default RadioButton;