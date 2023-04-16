import React from "react";

const Input = (props:any) => {

    if (props.type === "area") {
        return (
            <div className="forms-group">
                <label htmlFor="forInput">{props.label}</label>
                <textarea
                    rows={4}
                    style={{maxWidth: props.maxWidth}}
                    onChange={props.onChange}
                    id="forInput"
                    className="forms-control"
                    placeholder={props.placeholder}
                    disabled={props.disabled}
                />
            </div>
        );
    }

    return(
            <div className="forms-group">
                <label htmlFor="forInput">{props.label}</label>
                <input
                    style={{maxWidth: props.maxWidth}}
                    type="text"
                    onChange={props.onChange}
                    required={props.required ? props.required : false}
                    placeholder={props.placeholder}
                    id="forInput"
                    className="forms-control"
                    disabled={props.disabled}
                />
            </div>
        )

}

export default Input;