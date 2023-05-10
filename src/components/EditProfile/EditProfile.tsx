import React from "react";
import t from "../../utils/Lang";
import FilePicker from "../FilePicker/FilePicker";

const EditProfile = (props: any) => {
    return (
        <>
            <div className="editProfileBox">
                <div className='editProfileData'>
                    <h1>Edit</h1>
                    <section>
                        <FilePicker
                            accept={"image/*"}
                            sublabel={t('uploadPhoto')}
                            value={props.store.model.fileName ? props.store.model.fileName?.length > 50 ? props.store.model.fileName.substring(0,45)+ "..." : props.store.model.fileName : ""}
                            onChange={async (e: any) => {
                                props.store.editModel({
                                    fileName: e.target.files[0].name,
                                })
                                let selectedFile = e.target.files;
                                if (selectedFile.length > 0) {
                                    let fileToLoad = selectedFile[0];
                                    let fileReader = new FileReader();
                                    let base64;
                                    fileReader.onload = function (fileLoadedEvent: any) {
                                        base64 = fileLoadedEvent.target.result;
                                        // props.store.editModel({fileBase64:base64.substring(28,base64.length-1)});
                                        props.store.editModel({fileBase64: base64});
                                        console.log(props.store.model.fileName);
                                        console.log(props.store.model.fileBase64);
                                    };
                                    fileReader.readAsDataURL(fileToLoad);
                                }
                            }}
                        />
                    </section>
                    <section></section>
                    <section></section>
                    <section></section>
                    <section></section>
                </div>
            </div>
        </>
    )
}

export default EditProfile;