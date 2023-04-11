import React from "react";

const Button = (props: any) => {
    let classname: string = props.type;
    return (
        <>
            <button type="button" className={`${classname? classname : 'primaryButton'} ${props.className}`} onClick={props.onClick} disabled={props.disabled}>{props.label}</button>
        </>
    )
}

export default Button;