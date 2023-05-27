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
import EditWhite from "../../assets/icon/editWhtie.svg";

const TeacherPlanList = (props: any) => {
    return (
        <section className={'userInfo mt-38'}>
            <aside className={'userAvatar'}>
                <img src={AppStore.currentUser?.photo}/>
            </aside>
            <aside className={'userData'}>
                <h2>{AppStore.currentUser?.lastName + ' ' + AppStore.currentUser?.firstName + ' ' + AppStore.currentUser?.middleName}</h2>
                <div className="row">
                    <div className="column mr-58 space-between">
                        <div>
                            <h4 className="mt-24">{t('position')}</h4>
                            <span>{AppStore.currentUser?.position?.nameEn ? AppStore.currentUser?.position[l('name')] : ""}</span>
                        </div>
                        {AppStore.isTeacher() ? <div>
                            <div>
                                <h4 className="mt-24">{t('degree')}</h4>
                                <span>{AppStore.currentUser?.degree?.nameEn ? AppStore.currentUser?.degree[l('name')] : ""}</span>
                            </div>
                        </div> : null}
                        <div>
                            <h4 className={AppStore.isTeacher() ? "mt-24" : "mt-96"}>{t('department')}</h4>
                            <span>{AppStore.department?.name}</span>
                        </div>
                    </div>
                    <div className="column mr-58 space-between">
                        {AppStore.isTeacher() ? <div>
                            <h4 className="mt-24">{t('rate')}</h4>
                            <span>{AppStore.currentUser?.rate}</span>
                        </div> : null}
                        {AppStore.isTeacher() ? <div>
                            <h4 className="mt-24">{t('departmentDirector')}</h4>
                            <span>{AppStore.department?.director?.firstName && AppStore.department?.director?.lastName ?
                                AppStore.department?.director?.firstName + ' ' + AppStore.department?.director?.lastName : ""}</span>
                        </div> : null}
                    </div>
                    <div className="column profileEditBtnParent">
                        <Button
                            className={'profileEditBtn'}
                            icon={EditWhite}
                            onClick={() => {
                                props.onModalStateChanged(true);
                            }}
                        />
                    </div>
                </div>
            </aside>
        </section>
    )
}

export default observer(TeacherPlanList);