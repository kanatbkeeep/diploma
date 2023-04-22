import React, {useCallback, useState} from "react";
import Logo from '../../assets/icon/logoWhite.svg'
import '../../style/creationPlanPage.scss';
import Button from "../../components/Button/Button";
import Home from "../../assets/icon/home.svg";
import Bell from "../../assets/icon/bellWhite.svg";
import Navigation from "../../components/Notification/Notification";

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
        <main className="main-container">

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
                        type='secondaryLightButton'
                        icon={Bell}
                        label="Notification"
                    />
                    <Button
                        type='secondaryLightButton'
                        icon={Bell}
                        label="Notification"
                    />
                    <Button
                        type='secondaryLightButton'
                        icon={Bell}
                        label="Notification"
                    />
                </div>
            </aside>

            <section>

            </section>
            <Navigation open={modalOpen} onModalStateChanged={handleModalStateChanged}/>
        </main>
    )
}

export default CreationPlan;