import React, {useState} from "react";
import arrow from '../../assets/icon/arrow.svg'

const Dropdown = (props: any) => {
    const [isActive, setIsActive] = useState(false)


    return (
        <div className="dropdown-container" style={{maxWidth: props.maxWidth}}>
            <div className="dropdown-label">{props.label}</div>
            <div className="dropdown" onClick={props.onClick && props.onClick()}>
                <div className={isActive ? "dropdown-btn dropdown-btn-active" : "dropdown-btn"} onClick={()=>{setIsActive(!isActive)}}>
                    {props.value}
                    <img src={arrow} style={{transform: isActive ? "rotate(180deg)" : ""}}/>
                </div>

                {isActive && (
                    props.children
                )}
            </div>
        </div>
    )
}


export default Dropdown;