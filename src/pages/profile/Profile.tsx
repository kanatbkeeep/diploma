import {observer} from 'mobx-react';
import React, {useCallback, useEffect, useState} from 'react';
import '../../style/profilePage.scss';
import Button from "../../components/Button/Button";
import Navigation from "../../components/Navigation/Navigation";
import AppStore from "../../store/AppStore";
import t, {l} from "../../utils/Lang";
import {useNavigate} from "react-router-dom";
import EditProfile from "../../components/EditProfile/EditProfile";
import EditProfileStore from "../../store/EditProfileStore";
import Plus from '../../assets/icon/plus.svg'
import Approve from "../../components/Approve/Approve";
import DirectorPlanList from "../../components/DirectorPlanList/DirectorPlanList";
import Notification from "../../components/Notification/Notification";
import TeacherPlanList from "../../components/TeacherPlanList/TeacherPlanList";
import UserData from "../../components/UserData/UserData";
import Revision from "../../components/Revision/Revision";

function Profile() {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalOpen2, setModalOpen2] = useState<boolean>(false);
    const [approveOpen, setApproveOpen] = useState<boolean>(false);
    const [revisionOpen, setRevisionOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const handleModalStateChanged = useCallback((state: boolean) => {setModalOpen(state);}, []);
    const handleModalStateChanged2 = useCallback((state: boolean) => {setModalOpen2(state);}, []);
    const handleApproveOpenChanged = useCallback((state: boolean) => {setApproveOpen(state)}, []);
    const handleRevisionOpenChanged = useCallback((state: boolean) => {setRevisionOpen(state)}, []);

    const setDataForUpdate = () => {
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
    }

    useEffect(() => {
        AppStore.getUser().then(() => {
            if (!AppStore.currentUser) {
                window.location.replace('/login')
            }
            if (AppStore.isTeacher()) {
                AppStore.getDepartmentByTeacher().then(() => {setDataForUpdate();});
            } else {
                AppStore.getDepartmentByDirector().then(() => {setDataForUpdate();});
                AppStore.getMyPlansToApproveAwaiting();
            }
            AppStore.getMyPlans();
            EditProfileStore.getPositions();
            EditProfileStore.getDegrees();
            EditProfileStore.getDepartmentList();

        }).catch(() => {
            if (!AppStore.currentUser) {
                window.location.replace('/login')
            }
        });
    }, [])

    return (AppStore.currentUser &&
        <>
            <EditProfile store={EditProfileStore} open={modalOpen2} handleChange={handleModalStateChanged2}/>
            <main className={modalOpen || modalOpen2 || approveOpen || revisionOpen ? 'darker' : ''}>
                <Navigation onModalStateChanged={handleModalStateChanged}/>
                <UserData onModalStateChanged={handleModalStateChanged2}/>
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
                    <DirectorPlanList onModalStateChangedApprove={handleApproveOpenChanged} onModalStateChangedRevision={handleRevisionOpenChanged}/>
                </> : null}
            </main>

            <Notification open={modalOpen} onModalStateChanged={handleModalStateChanged}/>
            <Approve open={approveOpen} onModalStateChanged={handleApproveOpenChanged}/>
            <Revision open={revisionOpen} onModalStateChanged={handleRevisionOpenChanged}/>
        </>
    )
}

export default observer(Profile);