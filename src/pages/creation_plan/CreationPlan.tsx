import React, {useCallback, useState} from "react";
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
import Step3 from "../../components/CreationPlan/steps/Step3";


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

    const handleModalStateChanged = useCallback((state: boolean) => {
        setModalOpen(state);
    }, []);

    return (
        <>
        <div className={modalOpen ? "main-container darker" : "main-container"}>

            <aside>
                <img className="logo" src={Logo}/>
                <div className="list-btn">
                    <Button
                        type='secondaryLightButton'
                        icon={Home}
                        label="Home"
                    />
                    <Button
                        onClick={()=>{
                            setModalOpen(true);
                        }}
                        type='secondaryLightButton'
                        icon={Bell}
                        label="Notification"
                    />
                    <Button
                        type='secondaryButton'
                        icon={Send}
                        label="Send"
                    />
                    <Button
                        type='secondaryButton'
                        icon={Download}
                        label="Get as Excel"
                    />
                    <Button
                        type='primaryButton'
                        icon={Logout}
                        label="Notification"
                    />
                </div>
            </aside>

            <section>
                <div className="nav-steps mt-42">
                    <div className="nav-step" onClick={()=>{setStep(Steps.Step1)}}>
                        <div style={step === Steps.Step1 ? {boxShadow:"0px 5px 6px -3px #007EA7",color:"#007EA7"} : {}}>1</div>
                         <p style={step === Steps.Step1 ? {color:"#007EA7"} : {}}>Academic work</p>
                    </div>
                    <div className="nav-step" onClick={()=>{setStep(Steps.Step2)}}>
                        <div style={step === Steps.Step2 ? {boxShadow:"0px 5px 6px -3px #007EA7",color:"#007EA7"} : {}}>2</div>
                        <p style={step === Steps.Step2 ? {color:"#007EA7"} : {}}>Educational Methodological work</p>
                    </div>
                    <div className="nav-step" onClick={()=>{setStep(Steps.Step3)}}>
                        <div style={step === Steps.Step3 ? {boxShadow:"0px 5px 6px -3px #007EA7",color:"#007EA7"} : {}}>3</div>
                        <p style={step === Steps.Step3 ? {color:"#007EA7"} : {}}>Research work</p>
                    </div>
                    <div className="nav-step" onClick={()=>{setStep(Steps.Step4)}}>
                        <div style={step === Steps.Step4 ? {boxShadow:"0px 5px 6px -3px #007EA7",color:"#007EA7"} : {}}>4</div>
                        <p style={step === Steps.Step4 ? {color:"#007EA7"} : {}}>Educational work</p>
                    </div>
                    <div className="nav-step" onClick={()=>{setStep(Steps.Step5)}}>
                        <div style={step === Steps.Step5 ? {boxShadow:"0px 5px 6px -3px #007EA7",color:"#007EA7"} : {}}>5</div>
                        <p style={step === Steps.Step5 ? {color:"#007EA7"} : {}}>Social work</p>
                    </div>
                    <div className="nav-step" onClick={()=>{setStep(Steps.Step6)}}>
                        <div style={step === Steps.Step6 ? {boxShadow:"0px 5px 6px -3px #007EA7",color:"#007EA7"} : {}}>6</div>
                        <p style={step === Steps.Step6 ? {color:"#007EA7"} : {}}>KPI</p>
                    </div>

                </div>
                <div className="step">
                    {
                        step === Steps.Step1 ? <Step1/> : null
                    }
                    {
                        step === Steps.Step2 ? <Step2/> : null
                    }
                    {
                        step === Steps.Step3 ? <Step3/> : null
                    }
                </div>
            </section>
        </div>
            <Navigation open={modalOpen} onModalStateChanged={handleModalStateChanged}/>
            </>
    )
}

export default CreationPlan;