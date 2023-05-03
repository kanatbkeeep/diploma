import React, {useEffect, useState} from "react";
import Input from "../../Input/Input";
import Dropdown from "../../Dropdown/Dropdown";
import Button from "../../Button/Button";
import Plus from "../../../assets/icon/plus.svg";
import Delete from "../../../assets/icon/delete.svg";
import Edit from "../../../assets/icon/edit.svg";
import Copy from "../../../assets/icon/copy.svg";
import Table from "../../Table/Table";
import {observer} from "mobx-react";
import t from "../../../utils/Lang";

const Step1 = (props: any) => {
    const [open, setOpen] = useState("");
    const [itemEdit, setItemEdit]:any = useState(null);

    const {planStore} = props;


    const validation = () =>{
        return (planStore.step1.nameOfDiscipline && planStore.step1.course && planStore.step1.trimester && planStore.step1.groups
        && planStore.step1.lecturesPlan && planStore.step1.lecturesFact && planStore.step1.practicesPlan && planStore.step1.practicesFact
        && planStore.step1.hoursPlan && planStore.step1.hoursFact && planStore.step1.totalPlan && planStore.step1.totalFact);
    }

    const addObject = () => {
        planStore.saveAcademicWork();
        planStore.editStep1Modal({
            nameOfDiscipline: "",
            course: "",
            trimester: "",
            groups: "",
            lecturesPlan: "",
            lecturesFact: "",
            practicesPlan: "",
            practicesFact: "",
            hoursPlan: "",
            hoursFact: "",
            totalPlan: "",
            totalFact: "",
        })
    }

    const clear = () => {
        planStore.editStep1Modal({
            nameOfDiscipline: "",
            course: "",
            trimester: "",
            groups: "",
            lecturesPlan: "",
            lecturesFact: "",
            practicesPlan: "",
            practicesFact: "",
            hoursPlan: "",
            hoursFact: "",
            totalPlan: "",
            totalFact: "",
        })
    }

    const copy = (item:any)=>{
        planStore.editStep1Modal({...item});
    }

    const edit = (item:any)=>{
        const toUpdate = {...item, ...planStore.step1}
        planStore.updateAcademicWork(toUpdate);
        planStore.editStep1Modal({
            nameOfDiscipline: "",
            course: "",
            trimester: "",
            groups: "",
            lecturesPlan: "",
            lecturesFact: "",
            practicesPlan: "",
            practicesFact: "",
            hoursPlan: "",
            hoursFact: "",
            totalPlan: "",
            totalFact: "",
        })
        setItemEdit(null);
    }


    return (
        <div className="step-component">
            <div className="years">2022-2023</div>
            <div className="inputs-step">
                <div style={{marginBottom: 20, display: "flex"}}>
                    <Input
                        maxWidth={500}
                        label={t('nameDiscipline')}
                        value={planStore.step1.nameOfDiscipline}
                        onChange={(e: any) => {
                            planStore.editStep1Modal({nameOfDiscipline: e.target.value});
                        }
                        }
                    />
                    <div style={{width: 50}}/>
                    <Dropdown
                        onClick={() => {
                            if (open === "") {
                                setOpen("course");
                            } else {
                                setOpen("")
                            }
                        }}
                        open={open === "course"}
                        label={t('course')}
                        maxWidth={90}
                        value={planStore.step1.course ? planStore.step1.course : "---"}
                    >
                        <ul>
                            {planStore.courses.map((item: any) => {
                                return <li onClick={() => {
                                    planStore.editStep1Modal({course: item.name});
                                }}>
                                    {item.name}
                                </li>
                            })}
                        </ul>
                    </Dropdown>
                    <div style={{width: 50}}/>
                    <Dropdown
                        onClick={() => {
                            if (open === "") {
                                setOpen("trimester");
                            } else {
                                setOpen("")
                            }
                        }}
                        open={open === "trimester"}
                        label={t('trimester')}
                        maxWidth={90}
                        value={planStore.step1.trimester ? planStore.step1.trimester : "---"}
                    >
                        <ul>
                            {planStore.trimesters.map((item: any) => {
                                return <li onClick={() => {
                                    planStore.editStep1Modal({trimester: item.name})
                                }}>
                                    {item.name}
                                </li>
                            })}
                        </ul>
                    </Dropdown>
                    <div style={{width: 50}}/>
                    <Input
                        maxWidth={200}
                        label={t('group')}
                        value={planStore.step1.groups}
                        onChange={(e: any) => {
                            planStore.editStep1Modal({groups: e.target.value});
                        }
                        }
                    />
                </div>

                <div style={{marginBottom: 20, display: "flex"}}>
                    <Input
                        maxWidth={100}
                        label={t('lectures')}
                        placeholder={t('plan')}
                        value={planStore.step1.lecturesPlan}
                        onChange={(e: any) => {
                            planStore.editStep1Modal({lecturesPlan: e.target.value});
                        }}
                    />
                    <div style={{width: 23}}/>
                    <Input
                        label="&nbsp;"
                        maxWidth={100}
                        placeholder={t('fact')}
                        value={planStore.step1.lecturesFact}
                        onChange={(e: any) => {
                            planStore.editStep1Modal({lecturesFact: e.target.value});
                        }}
                    />
                    <div style={{width: 50}}/>
                    <Input
                        maxWidth={100}
                        label={t('practices')}
                        placeholder={t('plan')}
                        value={planStore.step1.practicesPlan}
                        onChange={(e: any) => {
                            planStore.editStep1Modal({practicesPlan: e.target.value});
                        }}
                    />
                    <div style={{width: 23}}/>
                    <Input
                        label="&nbsp;"
                        maxWidth={100}
                        placeholder={t('fact')}
                        value={planStore.step1.practicesFact}
                        onChange={(e: any) => {
                            planStore.editStep1Modal({practicesFact: e.target.value});
                        }}
                    />
                    <div style={{width: 50}}/>
                    <Input
                        maxWidth={100}
                        label={t('officeHours')}
                        placeholder={t('plan')}
                        value={planStore.step1.hoursPlan}
                        onChange={(e: any) => {
                            planStore.editStep1Modal({hoursPlan: e.target.value});
                        }}
                    />
                    <div style={{width: 23}}/>
                    <Input
                        label="&nbsp;"
                        maxWidth={100}
                        placeholder={t('fact')}
                        value={planStore.step1.hoursFact}
                        onChange={(e: any) => {
                            planStore.editStep1Modal({hoursFact: e.target.value});
                        }}
                    />
                    <div style={{width: 50}}/>
                    <Input
                        maxWidth={100}
                        label={t('total')}
                        placeholder={t('plan')}
                        value={planStore.step1.totalPlan}
                        onChange={(e: any) => {
                            planStore.editStep1Modal({totalPlan: e.target.value});
                        }}
                    />
                    <div style={{width: 23}}/>
                    <Input
                        label="&nbsp;"
                        maxWidth={100}
                        placeholder={t('fact')}
                        value={planStore.step1.totalFact}
                        onChange={(e: any) => {
                            planStore.editStep1Modal({totalFact: e.target.value});
                        }}
                    />
                </div>
                <div style={{display: "flex", justifyContent: "flex-end"}}>
                    <div style={{width: 144}}>
                        <Button className="'primaryButtonAdd'"
                                icon={Plus}
                                label={itemEdit ? t('edit') : t('add')}
                                onClick={()=> {
                                    if(itemEdit){
                                        edit(itemEdit);
                                    }else{
                                        addObject();
                                    }
                                }}
                                disabled={!(validation())}
                        />
                    </div>
                    <div style={{width: 50}}/>
                    <div style={{width: 144}}>
                        <Button icon={Delete}
                                label={t('reset')}
                                onClick={()=>{
                                    clear()
                                }}
                        />
                    </div>
                </div>
            </div>
            <div>
                <Table
                    array={planStore.academWorks}
                    length={planStore.academWorks.length}
                    rowsPerPage={4}
                    maxWidthTable={1083}
                    maxWidthColumns={[250, 55, 100, 100, 100, 100, 100, 100, 128]}
                    haveDelete={true}
                    onDelete={(arr:any[]) => {
                        planStore.deleteAcademicWorks(arr);
                    }}
                    renderHead={(maxWidthColumns) => {
                        return <div>
                            <div style={{maxWidth: 50}}></div>
                            <div style={{maxWidth: maxWidthColumns[0]}}>{t('nameDiscipline')}</div>
                            <div style={{maxWidth: maxWidthColumns[1]}}>{t('course')}</div>
                            <div style={{maxWidth: maxWidthColumns[2]}}>{t('trimester')}</div>
                            <div style={{maxWidth: maxWidthColumns[3]}}>{t('group')}</div>
                            <div style={{maxWidth: maxWidthColumns[4]}}>{t('lectures')}</div>
                            <div style={{maxWidth: maxWidthColumns[5]}}>{t('practices')}</div>
                            <div style={{maxWidth: maxWidthColumns[6]}}>{t('officeHours')}</div>
                            <div style={{maxWidth: maxWidthColumns[7]}}>{t('total')}</div>
                            <div style={{maxWidth: maxWidthColumns[8]}}></div>
                        </div>
                    }}
                    renderBody={(item, index, maxWidthColumns, checkbox) => {
                        return (
                            <div key={index}>
                                <div style={checkbox ? {maxWidth: 50} : {}}>{checkbox}</div>
                                <div style={{maxWidth: maxWidthColumns[0]}}>{item.nameOfDiscipline}</div>
                                <div style={{maxWidth: maxWidthColumns[1]}}>{item.course}</div>
                                <div style={{maxWidth: maxWidthColumns[2]}}>{item.trimester}</div>
                                <div style={{maxWidth: maxWidthColumns[3]}}>{item.groups}</div>
                                <div style={{maxWidth: maxWidthColumns[4]}}>
                                    <p style={{width: "100%", maxWidth: 50, color: "#003459"}}>{item.lecturesPlan}</p>
                                    <p style={{width: "100%", maxWidth: 50, color: "#007EA7"}}>{item.lecturesFact}</p>
                                </div>
                                <div style={{maxWidth: maxWidthColumns[5]}}>
                                    <p style={{width: "100%", maxWidth: 50, color: "#003459"}}>{item.practicesPlan}</p>
                                    <p style={{width: "100%", maxWidth: 50, color: "#007EA7"}}>{item.practicesFact}</p>
                                </div>
                                <div style={{maxWidth: maxWidthColumns[6]}}>
                                    <p style={{
                                        width: "100%",
                                        maxWidth: 50,
                                        color: "#003459"
                                    }}>{item.hoursPlan}</p>
                                    <p style={{
                                        width: "100%",
                                        maxWidth: 50,
                                        color: "#007EA7"
                                    }}>{item.hoursFact}</p>
                                </div>
                                <div style={{maxWidth: maxWidthColumns[7]}}>
                                    <p style={{width: "100%", maxWidth: 50, color: "#003459"}}>{item.totalPlan}</p>
                                    <p style={{width: "100%", maxWidth: 50, color: "#007EA7"}}>{item.totalFact}</p>
                                </div>
                                <div style={{maxWidth: maxWidthColumns[8]}}>
                                    <div style={{width: 54, marginRight: 10}}>
                                        <Button className="secondaryButton"
                                                icon={Edit}
                                                onClick={()=>{
                                                    setItemEdit(item);
                                                    planStore.editStep1Modal({...item});
                                                }}
                                        />
                                    </div>
                                    <div style={{width: 54}}>
                                        <Button icon={Copy} onClick={()=>{copy(item)}}/>
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

export default observer(Step1);