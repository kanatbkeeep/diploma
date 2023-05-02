import React, {useCallback, useEffect, useState} from "react";
import Logo from '../../assets/icon/logoWhite.svg'
import '../../style/creationPlanPage.scss';
import '../../style/common.scss';
import Button from "../../components/Button/Button";
import Home from "../../assets/icon/home.svg";
import Bell from "../../assets/icon/bellWhite.svg";
import Send from '../../assets/icon/arrowSend.svg';
import Download from '../../assets/icon/download.svg';
import Logout from '../../assets/icon/logout.svg';
import Navigation from "../../components/Notification/Notification";
import Step1 from "../../components/CreationPlan/steps/Step1";
import Step2 from "../../components/CreationPlan/steps/Step2";
import Step3 from "../../components/CreationPlan/steps/step3/Step3";
import { observer } from 'mobx-react';
import CreationPlanStore from '../../store/CreationPlanStore'
import {useNavigate} from "react-router-dom";
import AppStore from "../../store/AppStore";
import t from "../../utils/Lang";

export enum Steps {
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
    Step6
}

const CreationPlan = (props: any) => {
    const [step, setStep] = useState(Steps.Step1);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const planStore:any = CreationPlanStore;
    const navigation = useNavigate();

    useEffect(() => {
        AppStore.getUser().then(() => {
            if (!AppStore.currentUser) {
                window.location.replace('/login')
            }

            if (AppStore.currentUser?.roles[0].roleName === "TEACHER") {
                AppStore.getDepartmentByTeacher();
                AppStore.getMyPlans();
            }

        }).catch(() => {
            if (!AppStore.currentUser) {
                window.location.replace('/login')
            }
        });
        // planStore.getAcademicWorks();
    }, [])

    const handleModalStateChanged = useCallback((state: boolean) => {
        setModalOpen(state);
    }, []);

    function eraseCookie(name: any) {
        document.cookie = name+'=; Max-Age=-99999999;';
    }

    return (
        <>
        <div className={modalOpen ? "main-container darker" : "main-container"}>

            <aside>
                <img className="logo" src={Logo}/>
                <div className="list-btn">
                    <Button
                        type='secondaryLightButton'
                        icon={Home}
                        label={t('home')}
                        onClick={()=> navigation("/")}
                    />
                    <Button
                        onClick={()=>{
                            setModalOpen(true);
                        }}
                        type='secondaryLightButton'
                        icon={Bell}
                        label={t('notifications')}
                    />
                    <Button
                        type='secondaryButton'
                        icon={Send}
                        label={t('send')}
                    />
                    <Button
                        type='secondaryButton'
                        icon={Download}
                        label={t('getExcel')}
                    />
                    <Button
                        type='primaryButton'
                        icon={Logout}
                        label={t('logOut')}
                        onClick={() => {
                            eraseCookie('Authorization');
                            window.location.reload();
                        }}
                    />
                </div>
            </aside>

            <section>
                <div className="nav-steps mt-42">
                    <div className="nav-step" onClick={()=>{setStep(Steps.Step1)}}>
                        <div style={step === Steps.Step1 ? {boxShadow:"0px 5px 6px -3px #007EA7",color:"#007EA7"} : {}}>1</div>
                         <p style={step === Steps.Step1 ? {color:"#007EA7"} : {}}>{t('academicWork')}</p>
                    </div>
                    <div className="nav-step" onClick={()=>{setStep(Steps.Step2)}}>
                        <div style={step === Steps.Step2 ? {boxShadow:"0px 5px 6px -3px #007EA7",color:"#007EA7"} : {}}>2</div>
                        <p style={step === Steps.Step2 ? {color:"#007EA7"} : {}}>{t('academicMethods')}</p>
                    </div>
                    <div className="nav-step" onClick={()=>{setStep(Steps.Step3)}}>
                        <div style={step === Steps.Step3 ? {boxShadow:"0px 5px 6px -3px #007EA7",color:"#007EA7"} : {}}>3</div>
                        <p style={step === Steps.Step3 ? {color:"#007EA7"} : {}}>{t('academicResearchWork')}</p>
                    </div>
                    <div className="nav-step" onClick={()=>{setStep(Steps.Step4)}}>
                        <div style={step === Steps.Step4 ? {boxShadow:"0px 5px 6px -3px #007EA7",color:"#007EA7"} : {}}>4</div>
                        <p style={step === Steps.Step4 ? {color:"#007EA7"} : {}}>{t('academicEducationalWork')}</p>
                    </div>
                    <div className="nav-step" onClick={()=>{setStep(Steps.Step5)}}>
                        <div style={step === Steps.Step5 ? {boxShadow:"0px 5px 6px -3px #007EA7",color:"#007EA7"} : {}}>5</div>
                        <p style={step === Steps.Step5 ? {color:"#007EA7"} : {}}>{t('academicSocialWork')}</p>
                    </div>
                    <div className="nav-step" onClick={()=>{setStep(Steps.Step6)}}>
                        <div style={step === Steps.Step6 ? {boxShadow:"0px 5px 6px -3px #007EA7",color:"#007EA7"} : {}}>6</div>
                        <p style={step === Steps.Step6 ? {color:"#007EA7"} : {}}>KPI</p>
                    </div>

                </div>
                <div className="step">
                    {
                        step === Steps.Step1 ? <Step1 planStore={planStore}/> : null
                    }
                    {
                        step === Steps.Step2 ? <Step2 planStore={planStore}/> : null
                    }
                    {
                        step === Steps.Step3 ? <Step3 planStore={planStore}/> : null
                    }
                </div>
            </section>
        </div>
            <Navigation open={modalOpen} onModalStateChanged={handleModalStateChanged}/>
            </>
    )
}

export default observer(CreationPlan);