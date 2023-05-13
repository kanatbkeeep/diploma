import React, {useEffect, useState} from "react";
import {observer} from 'mobx-react';
import t, {l} from "../../utils/Lang";
import FilePicker from "../FilePicker/FilePicker";
import Cross from "../../assets/icon/cross.svg";
import CrossWhite from "../../assets/icon/crossWhite.svg";
import TickWhite from "../../assets/icon/tickWhite.svg";
import Input from "../Input/Input";
import EditProfileStore from "../../store/EditProfileStore";
import Dropdown from "../Dropdown/Dropdown";
import Button from "../Button/Button";
import Profile from "../../pages/profile/Profile";
import AppStore from "../../store/AppStore";
import ApproveStore from "../../store/ApproveStore";
import Checkbox from "../Checkbox/Checkbox";

const Revision = (props: any) => {
    useEffect(() => {

    }, [props.open]);

    return (props.open &&
        <div className={'approve'}>
            <div className="approveBlock">
                <p>Do you want to <span style={{color: "#590030"}}>return</span> <br/> <span style={{color: "#007EA7"}}>Berkinbayev Kanat Galymuly <br/> </span>for revision?</p>
                <section className="selectPartRevision">
                    <p>{t('revisionPart')}</p>

                    <div className='row'>
                        <div className='column'>
                            <Checkbox
                                label={t('academicWork')}
                                onChange={(e: any) => {
                                    if (e.target.checked) ApproveStore.model.parts.push("Academic Works");
                                    else ApproveStore.model.parts.remove("Academic Works");
                                }}
                                checked={ApproveStore.model.parts.includes("Academic Works")}
                            />

                            <Checkbox
                                label={t('academicEducationalWork')}
                                onChange={(e: any) => {
                                    if (e.target.checked) ApproveStore.model.parts.push("Educational work");
                                    else ApproveStore.model.parts.remove("Educational work");
                                }}
                                checked={ApproveStore.model.parts.includes("Educational work")}
                            />
                        </div>

                        <div className='column'>
                            <Checkbox
                                label={t('academicMethods')}
                                onChange={(e: any) => {
                                    if (e.target.checked) ApproveStore.model.parts.push("Ed. & Method. work");
                                    else ApproveStore.model.parts.remove("Ed. & Method. work");
                                }}
                                checked={ApproveStore.model.parts.includes("Ed. & Method. work")}
                            />

                            <Checkbox
                                label={t('academicSocialWork')}
                                onChange={(e: any) => {
                                    if (e.target.checked) ApproveStore.model.parts.push("Social work");
                                    else ApproveStore.model.parts.remove("Social work");
                                }}
                                checked={ApproveStore.model.parts.includes("Social work")}
                            />
                        </div>
                        <div className='column'>
                            <Checkbox
                                label={t('academicResearchWork')}
                                onChange={(e: any) => {
                                    if (e.target.checked) ApproveStore.model.parts.push("Research work");
                                    else ApproveStore.model.parts.remove("Research work");
                                }}
                                checked={ApproveStore.model.parts.includes("Research work")}
                            />

                            <Checkbox
                                label={'KPI'}
                                onChange={(e: any) => {
                                    if (e.target.checked) ApproveStore.model.parts.push("KPI");
                                    else ApproveStore.model.parts.remove("KPI");
                                }}
                                checked={ApproveStore.model.parts.includes("KPI")}
                            />
                        </div>
                    </div>
                </section>

                <section className="selectPartRevision">
                    <p>{t('addComment')}</p>
                    <Input
                        type='area'
                        placeholder={t('typeHere')}
                        onChange={(e: any) => {
                            ApproveStore.editModel({description: e.target.value})
                        }}
                        value={ApproveStore.model.description}
                    />
                </section>

                <div>
                    <Button
                        icon={TickWhite}
                        type={'smallBlue'}
                        disabled={!(ApproveStore.model.description && ApproveStore.model.parts.length > 0)}
                        onClick={() => {
                            ApproveStore.sendDenied(false).then(() => {
                                ApproveStore.nullifyModel();
                                AppStore.getMyPlansToApproveAwaiting();
                                props.onModalStateChanged(false);
                            });
                        }}
                    />
                    <Button
                        icon={CrossWhite}
                        type={'smallRed'}
                        onClick={() => {
                            props.onModalStateChanged(false);
                            ApproveStore.nullifyModel();
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default observer(Revision);