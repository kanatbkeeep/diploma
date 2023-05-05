import React, {useState} from "react";
import Input from "../../../Input/Input";
import Dropdown from "../../../Dropdown/Dropdown";
import Button from "../../../Button/Button";
import Plus from "../../../../assets/icon/plus.svg";
import Delete from "../../../../assets/icon/delete.svg";
import Edit from "../../../../assets/icon/edit.svg";
import Copy from "../../../../assets/icon/copy.svg";
import Table from "../../../Table/Table";
import {observer} from "mobx-react";
import t from "../../../../utils/Lang";
import Option1 from "./Option1";
import Option2 from "./Option2";
import Option3 from "./Option3";
import Option4 from "./Option4";


export enum Options{
    OPTION_1 = "OPTION_1",
    OPTION_2 = "OPTION_2",
    OPTION_3 = "OPTION_3",
    OPTION_4 = "OPTION_4",
}

const Step3 = (props: any) => {
    const {planStore} = props;
    const [open, setOpen] = useState("");
    const [itemEdit, setItemEdit]: any = useState(null);



    return (
        <div className="step-component">
            <div className="years">2022-2023</div>
            <div className="inputs-step">
                <Dropdown
                    onClick={() => {
                        if (open === "") {
                            setOpen("work");
                        } else {
                            setOpen("")
                        }
                    }}
                    open={open === "work"}
                    label={t('typeOfWork')}
                    value={planStore.step3.typeWork ? planStore.step3.typeWork.name: t('select')}
                    maxWidth={300}
                >
                    <ul>
                        {
                            planStore.typeWork.map((item: any) => {
                                return <li
                                    onClick={() => planStore.editStep3Modal({typeWork: item})}>{item.name}</li>
                            })
                        }
                    </ul>
                </Dropdown>
                <div className="mb-16"/>
                {planStore.step3.typeWork?.id === 1 ? <Option1 planStore={planStore}/>:null}
                {planStore.step3.typeWork?.id === 2 ? <Option2 planStore={planStore}/>:null}
                {planStore.step3.typeWork?.id === 3 ? <Option3 planStore={planStore}/>:null}
                {planStore.step3.typeWork?.id === 4 ? <Option4 planStore={planStore}/>:null}
            </div>
            <div>
                <Table
                    array={planStore.researchWorks}
                    length={planStore.researchWorks.length}
                    rowsPerPage={4}
                    maxWidthTable={1083}
                    maxWidthColumns={[250, 250, 100, 100, 100,100,140]}
                    haveDelete={true}
                    onDelete={(arr:any[]) => {
                        console.log("before")
                        console.log(planStore.researchWorks);
                        planStore.researchWorks = planStore.researchWorks.filter((item:any)=>{
                            return !(arr.includes(item));
                        })
                        console.log("after");
                        console.log(planStore.researchWorks);
                    }}
                    renderHead={(maxWidthColumns) => {
                        return <div>
                            <div style={{maxWidth: 50}}></div>
                            <div style={{maxWidth: maxWidthColumns[0]}}>{t('typeOfWork')}</div>
                            <div style={{maxWidth: maxWidthColumns[1]}}>{t('nameJournal')}</div>
                            <div style={{maxWidth: maxWidthColumns[2]}}>{t('deadlines')}</div>
                            <div style={{maxWidth: maxWidthColumns[3]}}>{t('nameArticle')}</div>
                            <div style={{maxWidth: maxWidthColumns[4]}}>{t('infoOnImplementation')}</div>
                            <div style={{maxWidth: maxWidthColumns[5]}}>{t('comments')}</div>
                            <div style={{maxWidth: maxWidthColumns[6]}}></div>
                        </div>
                    }}
                    renderBody={(item, index, maxWidthColumns, checkbox) => {
                        return (
                            <div key={index}>
                                <div style={checkbox ? {maxWidth: 50} : {}}>{checkbox}</div>
                                <div style={{maxWidth: maxWidthColumns[0]}}>{item.typeWork.name}</div>
                                <div style={{maxWidth: maxWidthColumns[1]}}>{item.journal}</div>
                                <div style={{maxWidth: maxWidthColumns[2]}}>{item.deadline}</div>
                                <div style={{maxWidth: maxWidthColumns[3]}}>{item.article}</div>
                                <div style={{maxWidth: maxWidthColumns[4]}}>{item.infoImplementation.name}</div>
                                <div className="hidden-scroll" style={{maxWidth: maxWidthColumns[5]}}>{item.comment}</div>
                                <div style={{maxWidth: maxWidthColumns[6]}}>
                                    <div style={{width: 54, marginRight: 10}}>
                                        <Button className="secondaryButton"
                                                icon={Edit}
                                                onClick={() => {
                                                    setItemEdit(item);
                                                    planStore.editStep3Modal({...item});
                                                }}
                                        />
                                    </div>

                                    <div style={{width: 54}}>
                                        <Button icon={Copy} onClick={() => {
                                            // copy(item)
                                        }}/>
                                    </div>
                                </div>
                            </div>
                        );
                    }}
                    search={true}/>
            </div>
        </div>
    )
}

export default observer(Step3);