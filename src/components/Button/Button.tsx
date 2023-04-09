import React from "react";

const Button = (props: any) => {
    let className = "btn-default";
    if (props.type === 'primary') {
        className = "btn-primary";
    }
    if (props.type === 'default') {
        className = "btn-default";
    }
    if (props.type === 'link') {
        className = "btn-link";
    }
    if (props.type === 'secondary') {
        className = "btn-secondary";
    }


    return (
        <>
            <button type="button" className={`btn ${className} ${props.className}`} onClick={props.onClick} disabled={props.disabled}>{props.label}</button>
        </>
    )
}