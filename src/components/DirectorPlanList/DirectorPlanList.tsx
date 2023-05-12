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
import Table from "../Table/Table";
import EyeBlack from "../../assets/icon/eyeBlack.svg";
import DownloadWhite from "../../assets/icon/downloadWhite.svg";

const DirectorPlanList = (props: any) => {
    return (
        <section className="tableProfile">
            {AppStore.myPlansToApprove ? <>
                <Table
                    array={AppStore.myPlansToApprove}
                    rowsPerPage={4}
                    maxWidthTable={1000}
                    maxWidthColumns={[400, 120, 120, 310]}
                    haveDelete={false}
                    onDelete={() => {
                        console.log("deleted");
                    }}
                    renderHead={(maxWidthColumns) => {
                        return <div>
                            <div style={{maxWidth: 50}}></div>
                            <div style={{maxWidth: maxWidthColumns[0]}}>{t('professor')}</div>
                            <div style={{maxWidth: maxWidthColumns[1]}}>{t('academicYear')}</div>
                            <div style={{maxWidth: maxWidthColumns[2]}}>{t('status')}</div>
                        </div>
                    }}
                    renderBody={(item, index, maxWidthColumns, checkbox) => {
                        return (
                            <div key={index}>
                                <div style={{maxWidth: 50}}></div>
                                <div style={{maxWidth: maxWidthColumns[0]}}>{item.createdBy.firstName + ' ' + item.createdBy.lastName + ' ' + item.createdBy.middleName}</div>
                                <div style={{maxWidth: maxWidthColumns[1]}}>{item.year}</div>
                                <div style={{maxWidth: maxWidthColumns[2]}}>{item.status}</div>
                                <div style={{maxWidth: maxWidthColumns[3], display: "flex", justifyContent: "space-between"}}>
                                    <div>
                                        <Button
                                            icon={EyeBlack}
                                            type={'smallWhite'}
                                        />
                                    </div>
                                    <div>
                                        <Button
                                            icon={DownloadWhite}
                                            type={'smallDark'}
                                        />
                                    </div>
                                    <div>
                                        <Button
                                            icon={TickWhite}
                                            type={'smallBlue'}
                                            disabled={item.status === 'APPROVED'}
                                            onClick={() => {
                                                props.onModalStateChanged(true);
                                                ApproveStore.editModel({selectedPlan: item});
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <Button
                                            icon={CrossWhite}
                                            type={'smallRed'}
                                            disabled={item.status === 'APPROVED'}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    }}
                    search={true}/>
            </> : null}
        </section>
    )
}

export default observer(DirectorPlanList);