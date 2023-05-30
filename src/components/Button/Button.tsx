import React from "react"

const Button = (props: any) => {
    //типы которые возможны primaryButton, secondaryButton, secondaryButtonBlack
    //типы с плюсом primaryButtonAdd, secondaryButtonAdd
    //типы small smallBlue, smallRed, smallDark, whiteDark
    let classname: string = props.type;
    return (
        <>
            <button type="button" className={`${classname ? classname : 'primaryButton'} ${props.className}`}
                    onClick={props.onClick}
                    disabled={props.disabled}>
                {classname === 'primaryButtonAdd' || classname === 'secondaryButtonAdd' ||
                classname === 'smallBlue' || classname === 'smallRed' || classname === 'smallDark' ?
                    <><img src={props.icon} alt={'icon'}/> {props.label}</> : props.icon ?
                    <><img src={props.icon} alt={'icon'} className='icon'/> {props.label}</> : props.label
                }
            </button>
        </>
    )
}

export default Button;