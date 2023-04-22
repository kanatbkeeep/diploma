import React, {useState} from "react";


export enum Steps{
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
    Step6
}

const CreationPlan = (props:any) => {
    const [step, setStep] = useState(Steps.Step1);

    return(
        <div>
        </div>
    )
}

export default CreationPlan;