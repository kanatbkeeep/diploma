import React, { useState, useEffect } from 'react';

const Checkbox = (props:any) =>{
    const [isChecked, setIsChecked] = useState(props.checked);

    useEffect(() => {
        setIsChecked(props.checked);
    }, [props.checked]);

    return(
        <div className="checkbox-group">
            <input
                type="checkbox"
                onChange={(e) => {
                    setIsChecked(e.target.checked);
                    props.onChange && props.onChange(e);
                }}
                id={`checkbox${props.id ? props.id : ""}`}
                checked={isChecked}
                disabled={props.disabled}
            />
            <label htmlFor={`checkbox${props.label}`}>{props.label}</label>
        </div>
    )
}

export default Checkbox;