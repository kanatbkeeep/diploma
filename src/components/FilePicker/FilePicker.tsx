import React from "react";
import Button from "../Button/Button";
import Plus from "../../assets/icon/blackPlus.svg";
import t from "../../utils/Lang";

const FilePicker = (props:any) =>{

    return(
        <label className="file-group">
            <div style={{display:"flex", flexDirection:"column"}}>
                <div className="file-label">{props.label}</div>
                <div className="file-input">
                    <img src={Plus}/>
                    {t('uploadPdf')}
                </div>
            </div>

            {props.value ?
                <div className="value">
                    {props.value}
                </div>
                :null
            }

            <input
                type="file"
                onChange={props.onChange}
                id="forInput"
                multiple={false}
                accept=".pdf"
            />
        </label>
    )
}

export default FilePicker;

// const file = e.target.files[0];
// const reader: any = new FileReader();
//
// reader.onload = () => {
//     const bytes = new Uint8Array(reader.result);
//     console.log('Bytes:', bytes);
// };
//
// reader.readAsArrayBuffer(file);