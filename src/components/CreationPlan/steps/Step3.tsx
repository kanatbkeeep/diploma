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
import moment from "moment/moment";

const Step3 = (props: any) => {
    const [open, setOpen] = useState("");
    const [itemEdit, setItemEdit]: any = useState(null);

    const {planStore} = props;


    const validation = () => {
        return (planStore.step3.nameOfTheWork && planStore.step3.deadlines&& planStore.step3.results
            && planStore.step3.comments  && ((planStore.step3.infoImplementation !== "Other" && planStore.step3.infoImplementation) ? planStore.step3.infoImplementation : planStore.step3.anotherInfoImpl ) );
    }

    const addObject = () => {
        planStore.saveResearchWork();
        clear();
    }

    const clear = () => {
        planStore.editStep3Modal({
            nameOfTheWork: "",
            deadlines: "",
            infoImplementation: "",
            anotherInfoImpl: "",
            results: "",
            comments: "",
        })
        setItemEdit(null);
    }

    const copy = (item: any) => {
        planStore.editStep3Modal({...item});
        if(item.infoImplementation !== "Online" && item.infoImplementation !== "Offline"){
            planStore.editStep3Modal({
                infoImplementation:"Other",
                anotherInfoImpl:item.infoImplementation,
            });
        }
    }

    const edit = (item: any) => {
        const toUpdate = {
            id: item.id,
            nameOfTheWork: planStore.step3.nameOfTheWork,
            deadlines: planStore.step3.deadlines,
            infoImplementation: planStore.step3.infoImplementation !== "Other" ? planStore.step3.infoImplementation : planStore.step3.anotherInfoImpl,
            results: planStore.step3.results,
            comments: planStore.step3.comments,
        }
        planStore.updateSearchWork(toUpdate);
        clear();
    }


    return (
        <div className="step-component">
            <Input
                maxWidth={144}
                placeholder={t('academicYear')}
                value={planStore.years}
                onChange={(e: any) => {
                    planStore.years = e.target.value;
                    planStore.changeYear();
                }
                }
            />
            <div style={{marginBottom: 13}}/>
            <div className="inputs-step">
                <div style={{marginBottom: 20, display: "flex"}}>
                    <Input
                        maxWidth={500}
                        type="area"
                        label={t('nameWork')}
                        value={planStore.step3.nameOfTheWork}
                        onChange={(e: any) => {
                            planStore.editStep3Modal({nameOfTheWork: e.target.value});
                        }
                        }
                    />
                </div>
                <div style={{marginBottom: 20, display: "flex"}}>
                    <Input
                        maxWidth={140}
                        label={t('deadlines')}
                        value={planStore.step3.deadlines}
                        onChange={(e: any) => {
                            planStore.editStep3Modal({deadlines: e.target.value});
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
                              value={planStore.step3.infoImplementation ? planStore.step3.infoImplementation : t('select')}
                    >
                        <ul>
                            {planStore.infoImplementation.map((item: any) => {
                                return <li
                                    onClick={() => planStore.editStep3Modal({infoImplementation: item.name})}>
                                    {item.name}
                                </li>
                            })}
                        </ul>
                    </Dropdown>

                </div>

                {
                    planStore.step3.infoImplementation === "Other" ?
                        <div style={{marginTop: 20, marginBottom: 20, display: "flex"}}>
                            <Input
                                maxWidth={500}
                                label={t('infoOnImplementation')}
                                value={planStore.step3.anotherInfoImpl}
                                onChange={(e: any) => {
                                    planStore.editStep3Modal({anotherInfoImpl: e.target.value});
                                }
                                }
                            />
                        </div> : null
                }

                <div style={{marginBottom: 20, display: "flex"}}>
                    <Input
                        maxWidth={500}
                        type="area"
                        label={t('results')}
                        value={planStore.step3.results}
                        onChange={(e: any) => {
                            planStore.editStep3Modal({results: e.target.value});
                        }
                        }
                    />
                </div>

                <div style={{marginBottom: 20, display: "flex"}}>
                    <Input
                        maxWidth={500}
                        type="area"
                        label={t('comments')}
                        value={planStore.step3.comments}
                        onChange={(e: any) => {
                            planStore.editStep3Modal({comments: e.target.value});
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
                    maxWidthColumns={[350, 100, 200, 150, 100, 133]}
                    haveDelete={true}
                    onDelete={(arr: any[]) => {
                        planStore.deleteResearchWorks(arr);
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
                                <div className="hidden-scroll"
                                     style={{maxWidth: maxWidthColumns[0]}}>{item.nameOfTheWork}</div>
                                <div style={{maxWidth: maxWidthColumns[1]}}>{item.deadlines}</div>
                                <div style={{maxWidth: maxWidthColumns[2]}}>{item.infoImplementation}</div>
                                <div className="hidden-scroll"
                                     style={{maxWidth: maxWidthColumns[3]}}>{item.results}</div>
                                <div className="hidden-scroll"
                                     style={{maxWidth: maxWidthColumns[4]}}>{item.comments}</div>
                                <div style={{maxWidth: maxWidthColumns[5]}}>
                                    <div style={{width: 54, marginRight: 10}}>
                                        <Button className="secondaryButton"
                                                icon={Edit}
                                                onClick={() => {
                                                    setItemEdit(item);
                                                    copy(item);
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