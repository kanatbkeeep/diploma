import React from "react";

const Button = (props: any) => {
    return (
        <>
            <button type="button" className={`${props.className}`} onClick={props.onClick} disabled={props.disabled}>{props.label}</button>
        </>
    )
}