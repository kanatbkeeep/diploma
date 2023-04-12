import React from "react";
import Plus from '../../assets/icon/plus.svg'

const Button = (props: any) => {
    //типы которые возможны primaryButton, secondaryButton
    //типы с плюсом primaryButtonAdd, secondaryButtonAdd
    let classname: string = props.type;
    return (
        <>
            <button type="button" className={`${classname ? classname : 'primaryButton'} ${props.className}`}
                    onClick={props.onClick}
                    disabled={props.disabled}>{classname === 'primaryButtonAdd' || classname === 'secondaryButtonAdd' ? <>
                <img src={Plus} alt={'icon'}/> {props.label}</> : props.label}
            </button>
        </>
    )
}

export default Button;