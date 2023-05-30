import React, {useEffect, useState} from "react";
import arrow from '../../assets/icon/arrow.svg'

const Dropdown = (props: any) => {
    const [isActive, setIsActive] = useState(props.open)
    useEffect(() => {
        setIsActive(props.open);
        console.log(props.open)
    }, [props.open])

    return (
        <div className="dropdown-container" style={{maxWidth: props.maxWidth}}>
            <div className="dropdown-label">{props.label}</div>
            <div className="dropdown" onClick={props.onClick}>
                <div style={props?.lang ? {display: "flex", justifyContent: "center", padding: "0"} : {}} className={isActive ? "dropdown-btn dropdown-btn-active" : "dropdown-btn"} onClick={()=>{setIsActive(!isActive)}}>
                    {props.value}
                    {!props?.noIcon ? <img alt='arrowImg' src={arrow} style={{transform: isActive ? "rotate(180deg)" : ""}}/>: null}
                </div>

                {isActive && (
                    props.children
                )}
            </div>
        </div>
    )
}


export default Dropdown;