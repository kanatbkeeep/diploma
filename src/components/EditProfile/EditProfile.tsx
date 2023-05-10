import React, {useEffect, useState} from "react";
import {observer} from 'mobx-react';
import t, {l} from "../../utils/Lang";
import FilePicker from "../FilePicker/FilePicker";
import Cross from "../../assets/icon/cross.svg";
import Input from "../Input/Input";
import EditProfileStore from "../../store/EditProfileStore";
import Dropdown from "../Dropdown/Dropdown";

const EditProfile = (props: any) => {
    const [open, setOpen] = useState("");

    useEffect(() => {

    }, [props.open]);

    return (props.open &&
        <>
            <div className={"editProfileBox"}>
                <div className='editProfileData'>
                    <div className='editProfileHeader'>
                        <div><img src={Cross} alt={'cross'}/></div>
                        <h1>Edit</h1>
                        <div onClick={() => props.handleChange(false)}><img src={Cross} alt={'cross'}/></div>
                    </div>
                    <section>
                        <FilePicker
                            accept={"image/*"}
                            sublabel={t('uploadPhoto')}
                            value={EditProfileStore.model.fileName ? EditProfileStore.model.fileName?.length > 50 ? EditProfileStore.model.fileName.substring(0, 45) + "..." : EditProfileStore.model.fileName : ""}
                            onChange={async (e: any) => {
                                EditProfileStore.editModel({
                                    fileName: e.target.files[0].name,
                                })
                                let selectedFile = e.target.files;
                                if (selectedFile.length > 0) {
                                    let fileToLoad = selectedFile[0];
                                    let fileReader = new FileReader();
                                    let base64;
                                    fileReader.onload = function (fileLoadedEvent: any) {
                                        base64 = fileLoadedEvent.target.result;
                                        // EditProfileStore.editModel({fileBase64:base64.substring(28,base64.length-1)});
                                        EditProfileStore.editModel({fileBase64: base64});
                                    };
                                    fileReader.readAsDataURL(fileToLoad);
                                }
                            }}
                        />
                    </section>
                    <section>
                        <Input
                            label={'Last Name'}
                            value={EditProfileStore.model.lastName}
                            onChange={(e: any) => {
                                EditProfileStore.editModel({lastName: e.target.value})
                            }}
                        />
                        <Input
                            label={'First Name'}
                            value={EditProfileStore.model.firstName}
                            onChange={(e: any) => {
                                EditProfileStore.editModel({firstName: e.target.value})
                            }}
                        />
                        <Input
                            label={'Middle Name'}
                            value={EditProfileStore.model.middleName}
                            onChange={(e: any) => {
                                EditProfileStore.editModel({middleName: e.target.value})
                            }}
                        />
                    </section>
                    <section>
                        <Dropdown
                            onClick={() => {
                                if (open !== "position") {
                                    setOpen("position");
                                } else {
                                    setOpen("")
                                }
                            }}
                            open={open === "position"}
                            label={t('position')}
                            maxWidth={300}
                            value={EditProfileStore.model.position ? EditProfileStore.model.position[l('name')] : "---"}
                        >
                            <ul>
                                {EditProfileStore.positionList.map((item: any) => {
                                    return <li onClick={() => {
                                        EditProfileStore.editModel({position: item});
                                    }}>
                                        {item[l('name')]}
                                    </li>
                                })}
                            </ul>
                        </Dropdown>

                        <Dropdown
                            onClick={() => {
                                if (open !== "rate") {
                                    setOpen("rate");
                                } else {
                                    setOpen("")
                                }
                            }}
                            open={open === "rate"}
                            label={t('rate')}
                            maxWidth={100}
                            value={EditProfileStore.model.rate ? EditProfileStore.model.rate : "---"}
                        >
                            <ul>
                                {EditProfileStore.rateList.map((item: any) => {
                                    return <li onClick={() => {
                                        EditProfileStore.editModel({rate: item});
                                    }}>
                                        {item}
                                    </li>
                                })}
                            </ul>
                        </Dropdown>
                    </section>

                    <section>
                        <Dropdown
                            onClick={() => {
                                if (open !== "degree") {
                                    setOpen("degree");
                                } else {
                                    setOpen("")
                                }
                            }}
                            open={open === "degree"}
                            label={t('degree')}
                            maxWidth={300}
                            value={EditProfileStore.model.degree ? EditProfileStore.model.degree[l('name')] : "---"}
                        >
                            <ul>
                                {EditProfileStore.degreeList.map((item: any) => {
                                    return <li onClick={() => {
                                        EditProfileStore.editModel({degree: item});
                                    }}>
                                        {item[l('name')]}
                                    </li>
                                })}
                            </ul>
                        </Dropdown>
                    </section>
                    <section>
                        <Dropdown
                            onClick={() => {
                                if (open !== "department") {
                                    setOpen("department");
                                } else {
                                    setOpen("")
                                }
                            }}
                            open={open === "department"}
                            label={t('department')}
                            maxWidth={300}
                            value={EditProfileStore.model.department ? EditProfileStore.model.department[l('name')] : "---"}
                        >
                            <ul>
                                {EditProfileStore.departmentList.map((item: any) => {
                                    return <li onClick={() => {
                                        EditProfileStore.editModel({department: item});
                                    }}>
                                        {item[l('name')]}
                                    </li>
                                })}
                            </ul>
                        </Dropdown>
                    </section>
                </div>
            </div>
        </>
    )
}

export default observer(EditProfile);