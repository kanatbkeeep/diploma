import {observer} from 'mobx-react';
import React, {useCallback, useEffect, useState} from 'react';
import Logo from '../../assets/icon/logoSmall.svg'
import '../../style/profilePage.scss';
import iconHouse from '../../assets/icon/house.svg'
import iconBell from '../../assets/icon/bell.svg'
import iconLogout from '../../assets/icon/logout.svg'
import Button from "../../components/Button/Button";
import Table from "../../components/Table/Table";
import Navigation from "../../components/Navigation/Navigation";
import AppStore from "../../store/AppStore";
import t, {l} from "../../utils/Lang";
import Edit from "../../assets/icon/edit.svg";
import EditWhite from "../../assets/icon/editWhtie.svg";
import Copy from "../../assets/icon/copy.svg";
import {useNavigate} from "react-router-dom";
import Dropdown from "../../components/Dropdown/Dropdown";
import EditProfile from "../../components/EditProfile/EditProfile";
import EditProfileStore from "../../store/EditProfileStore";
import Plus from '../../assets/icon/plus.svg'
import TickWhite from "../../assets/icon/tickWhite.svg";
import CrossWhite from "../../assets/icon/crossWhite.svg";
import EyeBlack from "../../assets/icon/eyeBlack.svg";
import DownloadWhite from "../../assets/icon/downloadWhite.svg";
import Approve from "../../components/Approve/Approve";
import ApproveStore from "../../store/ApproveStore";
import DirectorPlanList from "../../components/DirectorPlanList/DirectorPlanList";
import Notification from "../../components/Notification/Notification";
import TeacherPlanList from "../../components/TeacherPlanList/TeacherPlanList";

function Profile() {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalOpen2, setModalOpen2] = useState<boolean>(false);
    const [approveOpen, setApproveOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const handleModalStateChanged = useCallback((state: boolean) => {
        setModalOpen(state);
    }, []);
    const handleModalStateChanged2 = useCallback((state: boolean) => {
        setModalOpen2(state);
    }, []);
    const handleApproveOpenChanged = useCallback((state: boolean) => {
        setApproveOpen(state)
    }, []);

    useEffect(() => {
        AppStore.getUser().then(() => {
            if (!AppStore.currentUser) {
                window.location.replace('/login')
            }

            if (AppStore.isTeacher()) {
                AppStore.getDepartmentByTeacher().then(() => {
                    EditProfileStore.editModel({
                        firstName: AppStore.currentUser.firstName,
                        lastName: AppStore.currentUser.lastName,
                        middleName: AppStore.currentUser.middleName,
                        position: AppStore.currentUser.position,
                        degree: AppStore.currentUser.degree,
                        rate: AppStore.currentUser.rate,
                        fileBase64: AppStore.currentUser.photo,
                        department: AppStore.department,
                    })
                });
                AppStore.getMyPlans();
                EditProfileStore.getPositions();
                EditProfileStore.getDegrees();
                EditProfileStore.getDepartmentList();
            } else {
                AppStore.getDepartmentByDirector().then(() => {
                    EditProfileStore.editModel({
                        firstName: AppStore.currentUser.firstName,
                        lastName: AppStore.currentUser.lastName,
                        middleName: AppStore.currentUser.middleName,
                        position: AppStore.currentUser.position,
                        degree: AppStore.currentUser.degree,
                        rate: AppStore.currentUser.rate,
                        fileBase64: AppStore.currentUser.photo,
                        department: AppStore.department,
                    })
                });
                AppStore.getMyPlans();
                AppStore.getMyPlansToApproveAwaiting();
                EditProfileStore.getPositions();
                EditProfileStore.getDegrees();
                EditProfileStore.getDepartmentList();
            }

        }).catch(() => {
            if (!AppStore.currentUser) {
                window.location.replace('/login')
            }
        });
    }, [])

    return (AppStore.currentUser &&
        <>
            <EditProfile store={EditProfileStore} open={modalOpen2} handleChange={handleModalStateChanged2}/>
            <main className={modalOpen || modalOpen2 || approveOpen ? 'darker' : ''}>
                <Navigation onModalStateChanged={handleModalStateChanged}/>

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
                                    <span>{AppStore.currentUser?.position[l('name')]}</span>
                                </div>
                                {AppStore.isTeacher() ? <div>
                                    <div>
                                        <h4 className="mt-24">{t('degree')}</h4>
                                        <span>{AppStore.currentUser?.degree[l('name')]}</span>
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
                                    <span>{AppStore.department?.director.firstName + ' ' + AppStore.department?.director.lastName}</span>
                                </div> : null}
                            </div>
                            <div className="column profileEditBtnParent">
                                <Button
                                    className={'profileEditBtn'}
                                    icon={EditWhite}
                                    onClick={() => {
                                        setModalOpen2(true);
                                    }}
                                />
                            </div>
                        </div>
                    </aside>
                </section>

                {AppStore.isTeacher() ? <>
                    <TeacherPlanList/>

                    <section className={'createPlan'}>
                        <Button
                            icon={Plus}
                            label={t('createPlan')}
                            type={'secondaryButtonAdd'}
                            onClick={async () => {
                                await AppStore.createPlan();
                                navigate('/creation-plan');
                            }}
                        />
                    </section>
                </> : null}

                {AppStore.isDirector() ? <>
                    <DirectorPlanList onModalStateChanged={handleApproveOpenChanged}/>
                </> : null}

            </main>

            <Notification open={modalOpen} onModalStateChanged={handleModalStateChanged}/>
            <Approve open={approveOpen} onModalStateChanged={handleApproveOpenChanged}/>
        </>
    )
}

export default observer(Profile);