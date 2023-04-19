import React from 'react';

const Checkbox = (props:any) =>{
    return(
        <label className="checkbox-group">
            <input type="checkbox"
                   onChange={props.onChange}
                   id={`checkbox${props.id ? props.id : ""}`}
                   defaultChecked={props.defaultChecked}
                   checked={props.checked}
                   disabled={props.disabled}
            />
                <span className="checkmark"></span>
                {props.label}
        </label>
        // <div className="checkbox-group">
        //     <input
        //         type="checkbox"
        //         onChange={props.onChange}
        //         id={`checkbox${props.id ? props.id : ""}`}
        //         defaultChecked={props.defaultChecked}
        //         checked={props.checked}
        //         disabled={props.disabled}
        //     />
        //     <label htmlFor={`checkbox${props.label}`}>{props.label}</label>
        // </div>
    )
}

export default Checkbox;