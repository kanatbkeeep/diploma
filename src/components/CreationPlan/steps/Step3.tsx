import React, {useState} from "react";
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

const Step3 = (props: any) => {
    const {planStore} = props;
    const [open, setOpen] = useState("");
    const [itemEdit, setItemEdit]: any = useState(null);

    const validation = () => {
        return (planStore.step3.typeWork && planStore.step3.journal && planStore.step3.deadline && planStore.step3.article
            && planStore.step3.infoImplementation);
    }

    const addObject = () => {
        const obj = {...planStore.step3};
        planStore.researchWorks.push(obj);
        planStore.editStep3Modal({
            typeWork:null,
            journal:"",
            deadline:"",
            article:"",
            infoImplementation:null,
            comment:"",
        })
    }

    const clear = () => {
        planStore.editStep3Modal({
            typeWork:null,
            journal:"",
            deadline:"",
            article:"",
            infoImplementation:null,
            comment:"",
        })
    }

    const copy = (item: any) => {
        planStore.editStep3Modal({...item});
    }

    const edit = (item: any) => {
        const ind = planStore.researchWorks.indexOf(item);
        planStore.researchWorks[ind] = {...planStore.step3}
        planStore.editStep3Modal({
            typeWork:null,
            journal:"",
            deadline:"",
            article:"",
            infoImplementation:null,
            comment:"",
        })
        setItemEdit(null);
    }

    return (
        <div className="step-component">
            <div className="years">2022-2023</div>
            <div className="inputs-step">

                <div style={{marginBottom: 20, display: "flex"}}>
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

                    <div style={{marginRight: 55}}/>
                    <Input maxWidth={400}
                           label={t('nameJournal')}
                           value={planStore.step3.journal}
                           onChange={(e: any) => {
                               planStore.editStep3Modal({journal: e.target.value});
                           }
                           }
                    />
                    <div style={{marginRight: 55}}/>
                    <Input maxWidth={140}
                           label={t('deadlines')}
                           placeholder={t('end')}
                           value={planStore.step3.deadline}
                           onChange={(e: any) => {
                               planStore.editStep3Modal({deadline: e.target.value});
                           }
                           }
                    />
                </div>

                <div style={{marginBottom: 20, display: "flex"}}>
                    <Input maxWidth={560}
                           label={t('nameArticle')}
                           value={planStore.step3.article}
                           onChange={(e: any) => {
                               planStore.editStep3Modal({article: e.target.value});
                           }
                           }
                    />
                    <div style={{marginRight: 55}}/>
                    <Dropdown
                        onClick={() => {
                            if (open === "") {
                                setOpen("infoImpl");
                            } else {
                                setOpen("")
                            }
                        }}
                        open={open === "infoImpl"}
                        label={t('infoOnImplementation')}
                        value={planStore.step3.infoImplementation ? planStore.step3.infoImplementation.name: t('select')}
                        maxWidth={300}
                    >
                        <ul>
                            {
                                planStore.infoImplementation.map((item: any) => {
                                    return <li
                                        onClick={() => planStore.editStep3Modal({infoImplementation: item})}>{item.name}</li>
                                })
                            }
                        </ul>
                    </Dropdown>
                </div>

                <div style={{marginBottom: 20}}>
                    <Input
                        label="Comments"
                        type="area"
                        maxWidth={500}
                        value={planStore.step3.comment}
                        onChange={(e: any) => {
                            planStore.editStep3Modal({comment: e.target.value});
                        }
                        }
                    />
                </div>
                <div style={{display: "flex", justifyContent: "flex-end"}}>
                    <div style={{width: 144}}>
                        <Button className="'primaryButtonAdd'"
                                icon={Plus}
                                label={itemEdit ? t('edit') : t('add')}
                                onClick={() => {
                                    if (itemEdit) {
                                        edit(itemEdit);
                                    } else {
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
                                onClick={() => {
                                    clear()
                                }}
                        />
                    </div>
                </div>
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
                                            copy(item)
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