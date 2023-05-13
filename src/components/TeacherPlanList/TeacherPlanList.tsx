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
import Edit from "../../assets/icon/edit.svg";
import Copy from "../../assets/icon/copy.svg";
import {useNavigate} from "react-router-dom";

const TeacherPlanList = (props: any) => {
    const navigate = useNavigate();
    const validation = (item: any) => {
        let obj = {
            step1: item.year ? item.year : 'Not filled',
            step2: item?.academicWorks?.length > 0 ? 'Filled' : 'Not filled',
            step3: item?.academicMethods?.length > 0 ? 'Filled' : 'Not filled',
            step4: item?.researchWorks?.length > 0 ? 'Filled' : 'Not filled',
            step5: item?.educationalWorks?.length > 0 ? 'Filled' : 'Not filled',
            step6: item?.socialWorks?.length > 0 ? 'Filled' : 'Not filled',
            step8: item.status ? item.status : 'Not sent',
        }

        return obj;
    }

    return (
        <section className="tableProfile">
            {AppStore.myPlans ? <>
                <Table
                    array={AppStore.myPlans}
                    rowsPerPage={4}
                    maxWidthTable={1150}
                    maxWidthColumns={[120, 120, 150, 120, 130, 100, 100, 120, 140]}
                    haveDelete={true}
                    onDelete={() => {
                        console.log("deleted");
                    }}
                    renderHead={(maxWidthColumns) => {
                        return <div>
                            <div style={{maxWidth: 50}}></div>
                            <div style={{maxWidth: maxWidthColumns[0]}}>{t('academicYear')}</div>
                            <div style={{maxWidth: maxWidthColumns[1]}}>{t('academicWork')}</div>
                            <div style={{maxWidth: maxWidthColumns[2]}}>{t('academicMethods')}</div>
                            <div style={{maxWidth: maxWidthColumns[3]}}>{t('academicResearchWork')}</div>
                            <div style={{maxWidth: maxWidthColumns[4]}}>{t('academicEducationalWork')}</div>
                            <div style={{maxWidth: maxWidthColumns[5]}}>{t('academicSocialWork')}</div>
                            <div style={{maxWidth: maxWidthColumns[6]}}>{'KPI'}</div>
                            <div style={{maxWidth: maxWidthColumns[7]}}>{t('status')}</div>
                        </div>
                    }}
                    renderBody={(item, index, maxWidthColumns, checkbox) => {
                        return (
                            <div key={index}>
                                <div style={checkbox ? {maxWidth: 50} : {}}>{checkbox}</div>
                                <div style={{maxWidth: maxWidthColumns[0]}}>{validation(item).step1}</div>
                                <div style={{maxWidth: maxWidthColumns[1]}}>{validation(item).step2}</div>
                                <div style={{maxWidth: maxWidthColumns[2]}}>{validation(item).step3}</div>
                                <div style={{maxWidth: maxWidthColumns[3]}}>{validation(item).step4}</div>
                                <div style={{maxWidth: maxWidthColumns[4]}}>{validation(item).step5}</div>
                                <div style={{maxWidth: maxWidthColumns[5]}}>{validation(item).step6}</div>
                                <div style={{maxWidth: maxWidthColumns[6]}}>{'0%'}</div>
                                <div style={{maxWidth: maxWidthColumns[7]}}>{validation(item).step8}</div>
                                <div style={{maxWidth: maxWidthColumns[8]}}>
                                    <div style={{width: 54, marginRight: 10}}>
                                        <Button
                                            className="secondaryButton"
                                            icon={Edit}
                                            onClick={() => {
                                                navigate(`/plan/${item.id}`);
                                            }}
                                        />
                                    </div>
                                    <div style={{width: 54}}>
                                        <Button
                                            icon={Copy}
                                            onClick={() => {
                                                AppStore.editModel({selectedPlan: item});
                                                delete AppStore.model.selectedPlan.id;
                                                AppStore.copyPlan().then(() => AppStore.editModel({selectedPlan: null}));
                                            }}
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

export default observer(TeacherPlanList);