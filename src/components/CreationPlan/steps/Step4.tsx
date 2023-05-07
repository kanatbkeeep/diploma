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

const Step4 = (props: any) => {
    const [open, setOpen] = useState("");
    const [itemEdit, setItemEdit]: any = useState(null);

    const {planStore} = props;


    const validation = () => {
        return (planStore.step4.nameOfTheWork && planStore.step4.deadlines && planStore.step4.infoImplementation && planStore.step4.results
            && planStore.step4.comments);
    }

    const addObject = () => {
        planStore.saveEduWork();
        planStore.editStep4Modal({
            nameOfTheWork: "",
            deadlines: "",
            infoImplementation: "",
            results: "",
            comments: "",
        })
    }

    const clear = () => {
        planStore.editStep4Modal({
            nameOfTheWork: "",
            deadlines: "",
            infoImplementation: "",
            results: "",
            comments: "",
        })
    }

    const copy = (item: any) => {
        planStore.editStep4Modal({...item});
    }

    const edit = (item: any) => {
        const toUpdate = {...item, ...planStore.step4}
        planStore.updateEduWork(toUpdate);
        planStore.editStep4Modal({
            nameOfTheWork: "",
            deadlines: "",
            infoImplementation: "",
            results: "",
            comments: "",
        })
        setItemEdit(null);
    }


    return (
        <div className="step-component">
            <div className="inputs-step">
                <div style={{marginBottom: 20, display: "flex"}}>
                    <Input
                        maxWidth={500}
                        type="area"
                        label={t('nameWork')}
                        value={planStore.step4.nameOfTheWork}
                        onChange={(e: any) => {
                            planStore.editStep4Modal({nameOfTheWork: e.target.value});
                        }
                        }
                    />
                </div>
                <div style={{marginBottom: 20, display: "flex"}}>
                    <Input
                        maxWidth={140}
                        label={t('deadlines')}
                        value={planStore.step4.deadlines}
                        onChange={(e: any) => {
                            planStore.editStep4Modal({deadlines: e.target.value});
                        }
                        }
                    />
                    <div style={{marginRight: 55}}/>
                    <Dropdown maxWidth={300}
                              onClick={() => {
                                  if (open === "") {
                                      setOpen("infoImplementation");
                                  } else {
                                      setOpen("")
                                  }
                              }}
                              open={open === "infoImplementation"}
                              label={t('infoOnImplementation')}
                              value={planStore.step4.infoImplementation ? planStore.step4.infoImplementation : t('select')}
                    >
                        <ul>
                            {planStore.infoImplementation.map((item: any) => {
                                return <li
                                    onClick={() => planStore.editStep4Modal({infoImplementation: item.name})}>
                                    {item.name}
                                </li>
                            })}
                        </ul>
                    </Dropdown>
                </div>

                <div style={{marginBottom: 20, display: "flex"}}>
                    <Input
                        maxWidth={500}
                        type="area"
                        label={t('results')}
                        value={planStore.step4.results}
                        onChange={(e: any) => {
                            planStore.editStep4Modal({results: e.target.value});
                        }
                        }
                    />
                </div>

                <div style={{marginBottom: 20, display: "flex"}}>
                    <Input
                        maxWidth={500}
                        type="area"
                        label={t('comments')}
                        value={planStore.step4.comments}
                        onChange={(e: any) => {
                            planStore.editStep4Modal({comments: e.target.value});
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
                    array={planStore.eduWorks}
                    length={planStore.eduWorks.length}
                    rowsPerPage={4}
                    maxWidthTable={1083}
                    maxWidthColumns={[350, 100, 200, 150, 100, 133]}
                    haveDelete={true}
                    onDelete={(arr: any[]) => {
                        planStore.deleteEduWorks(arr);
                    }}
                    renderHead={(maxWidthColumns) => {
                        return <div>
                            <div style={{maxWidth: 50}}></div>
                            <div style={{maxWidth: maxWidthColumns[0]}}>{t('nameWork')}</div>
                            <div style={{maxWidth: maxWidthColumns[1]}}>{t('deadlines')}</div>
                            <div style={{maxWidth: maxWidthColumns[2]}}>{t('infoOnImplementation')}</div>
                            <div style={{maxWidth: maxWidthColumns[3]}}>{t('results')}</div>
                            <div style={{maxWidth: maxWidthColumns[4]}}>{t('comments')}</div>
                            <div style={{maxWidth: maxWidthColumns[5]}}></div>
                        </div>
                    }}
                    renderBody={(item, index, maxWidthColumns, checkbox) => {
                        return (
                            <div key={index}>
                                <div style={checkbox ? {maxWidth: 50} : {}}>{checkbox}</div>
                                <div className="hidden-scroll" style={{maxWidth: maxWidthColumns[0]}}>{item.nameOfTheWork}</div>
                                <div style={{maxWidth: maxWidthColumns[1]}}>{item.deadlines}</div>
                                <div style={{maxWidth: maxWidthColumns[2]}}>{item.infoImplementation}</div>
                                <div className="hidden-scroll" style={{maxWidth: maxWidthColumns[3]}}>{item.results}</div>
                                <div className="hidden-scroll" style={{maxWidth: maxWidthColumns[4]}}>{item.comments}</div>
                                <div style={{maxWidth: maxWidthColumns[5]}}>
                                    <div style={{width: 54, marginRight: 10}}>
                                        <Button className="secondaryButton"
                                                icon={Edit}
                                                onClick={() => {
                                                    setItemEdit(item);
                                                    planStore.editStep4Modal({...item});
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

export default observer(Step4);