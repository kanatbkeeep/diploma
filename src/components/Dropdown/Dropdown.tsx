import React, {useState} from "react";
import arrow from '../../assets/icon/arrow.svg'

const Dropdown = (props: any) => {
    const [isActive, setIsActive] = useState(false)


    return (
        <div className="dropdown" style={{maxWidth: props.maxWidth}} onClick={props.onClick && props.onClick()}>
            <div className={isActive ? "dropdown-btn dropdown-btn-active" : "dropdown-btn"} onClick={()=>{setIsActive(!isActive)}}>
                {props.value}
                <img src={arrow} style={{transform: isActive ? "rotate(180deg)" : ""}}/>
            </div>
            {isActive && (
                props.children
            )}
        </div>
    )
}


export default Dropdown;