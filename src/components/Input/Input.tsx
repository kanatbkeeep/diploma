import React, {useState} from "react";

const Input = (props:any) => {
    const [visible,setVisible] = useState(false);


    if (props.type === "area") {
        return (
            <div className="forms-group">
                <label htmlFor="forInput">{props.label}</label>
                <textarea
                    rows={4}
                    style={{maxWidth: props.maxWidth}}
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
          return <div className="forms-group">
              <label htmlFor="forInput">{props.label}</label>
              <input
                  style={{maxWidth: props.maxWidth}}
                  type={visible ? "text" : "password"}
                  onChange={props.onChange}
                  placeholder={props.placeholder}
                  id="forInput"
                  disabled={props.disabled}
                  value={props.value}
              />
          </div>
    }

    return(
            <div className="forms-group">
                <label htmlFor="forInput">{props.label}</label>
                <input
                    style={{maxWidth: props.maxWidth}}
                    type="text"
                    onChange={props.onChange}
                    placeholder={props.placeholder}
                    id="forInput"
                    disabled={props.disabled}
                    value={props.value}
                />
            </div>
        )

}

export default Input;