import React, {useState} from "react";
import visiblePass from "../../assets/icon/visible_pass.svg";
import hiddenPass from "../../assets/icon/hidden_pass.svg";

const Input = (props:any) => {
    const [visible,setVisible] = useState(false);

    if (props.type === "area") {
        return (
            <div className="forms-group" style={{maxWidth: props.maxWidth}}>
                <label htmlFor="forInput" style={props.login ? {marginLeft:20} : {}}>{props.label}</label>
                <textarea
                    rows={4}
                    onChange={props.onChange}
                    id="forInput"
                    placeholder={props.placeholder}
                    disabled={props.disabled}
                    value={props.value}
                />
            </div>
        );
    }

    else if (props.type === "password"){
          return <div className="forms-group" style={{maxWidth: props.maxWidth}}>
              <label htmlFor="forInput" style={props.login ? {marginLeft:20} : {}}>{props.label}</label>
              <div className="container-password">
                  <input
                      className="input-password"
                      type={visible ? "text" : "password"}
                      onChange={props.onChange}
                      placeholder={props.placeholder}
                      id="forInput"
                      disabled={props.disabled}
                      value={props.value}
                  />
                  <button onClick={()=>{setVisible(!visible)}}>
                      <img src={visible ? hiddenPass : visiblePass}/>
                  </button>
              </div>
          </div>
    }

    else if (props.type === "date"){
        return(
            <div className="forms-group" style={{maxWidth: props.maxWidth}}>
                <label htmlFor="forInput" style={props.login ? {marginLeft:20} : {}}>{props.label ? props.label : "ㅤ"}</label>
                <input
                    type="date"
                    onChange={props.onChange}
                    placeholder={props.placeholder}
                    id="forInput"
                    disabled={props.disabled}
                    value={props.value}
                    style={props.login ? {border:"2px solid black"} : {}}
                />

            </div>
        )
    }

    return(
            <div className="forms-group" style={{maxWidth: props.maxWidth}}>
                <label htmlFor="forInput" style={props.login ? {marginLeft:20} : {}}>{props.label ? props.label : "ㅤ"}</label>
                <input
                    type="text"
                    onChange={props.onChange}
                    placeholder={props.placeholder}
                    id="forInput"
                    disabled={props.disabled}
                    value={props.value}
                    style={props.login ? {border:"2px solid black"} : {}}
                />

            </div>
        )

}

export default Input;