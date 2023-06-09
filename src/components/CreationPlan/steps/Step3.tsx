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
import AppStore from "../../../store/AppStore";

const Step3 = (props: any) => {
    const [open, setOpen] = useState("");
    const [itemEdit, setItemEdit]: any = useState(null);

    const {planStore} = props;


    const validation = () => {
        return (planStore.step3.nameOfTheWork && planStore.step3.deadlines
             && ((planStore.step3.infoImplementation !== "Other/Другое/Басқа" && planStore.step3.infoImplementation)
                ? planStore.step3.infoImplementation : planStore.step3.anotherInfoImpl ) );
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
        if(item.infoImplementation !== "In process/В процессе/Жұмыс барысында" && item.infoImplementation !== "Executed/Выполнен/Орындалды"){
            planStore.editStep3Modal({
                infoImplementation:"Other/Другое/Басқа",
                anotherInfoImpl:item.infoImplementation,
            });
        }
    }

    const edit = (item: any) => {
        const toUpdate = {
            id: item.id,
            nameOfTheWork: planStore.step3.nameOfTheWork,
            deadlines: planStore.step3.deadlines,
            infoImplementation: planStore.step3.infoImplementation !== "Other/Другое/Басқа" ? planStore.step3.infoImplementation : planStore.step3.anotherInfoImpl,
            results: planStore.step3.results,
            comments: planStore.step3.comments,
        }
        planStore.updateSearchWork(toUpdate);
        clear();
    }

    const implShow = (impl: String) => {
        const lg = AppStore.lang;
        if (impl === "Executed/Выполнен/Орындалды") {
            if(lg === "en"){
                return impl.substring(0,8);
            }else if(lg === "ru"){
                return impl.substring(9,17);
            }else{
                return impl.substring(18);
            }
        } else if (impl === "In process/В процессе/Жұмыс барысында") {
            if(lg === "en"){
                return impl.substring(0,10);
            }else if(lg === "ru"){
                return impl.substring(11,21);
            }else{
                return impl.substring(22);
            }
        } else if(impl === "Other/Другое/Басқа"){
            if(lg === "en"){
                return impl.substring(0,5);
            }else if(lg === "ru"){
                return impl.substring(6,12);
            }else{
                return impl.substring(13);
            }
        }
        return impl;
    }

    return (
        <div className="step-component">
            <Input
                maxWidth={144}
                placeholder={t('academicYear')}
                value={planStore.years}
                required={!(planStore.years?.length > 0)}
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
                              value={planStore.step3.infoImplementation ? implShow(planStore.step3.infoImplementation) : t('select')}
                    >
                        <ul>
                            {planStore.infoImplementation.map((item: any) => {
                                return <li
                                    onClick={() => planStore.editStep3Modal({infoImplementation: item.name})}>
                                    {implShow(item.name)}
                                </li>
                            })}
                        </ul>
                    </Dropdown>

                </div>

                {
                    planStore.step3.infoImplementation === "Other/Другое/Басқа" ?
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
                                     style={{
                                         maxWidth: maxWidthColumns[0],
                                         display: "flex",
                                         flexDirection: "column",
                                         justifyContent:"center",
                                         paddingRight: 16,
                                         alignItems:"flex-start",
                                     }}>{item.nameOfTheWork}</div>
                                <div className="hidden-scroll"
                                     style={{
                                         maxWidth: maxWidthColumns[1],
                                         display: "flex",
                                         flexDirection: "column",
                                         justifyContent:"center",
                                         paddingRight: 16,
                                         alignItems:"flex-start",
                                     }}>{item.deadlines}</div>
                                <div className="hidden-scroll"
                                     style={{
                                         maxWidth: maxWidthColumns[2],
                                         display: "flex",
                                         flexDirection: "column",
                                         justifyContent:"center",
                                         paddingRight: 16,
                                         alignItems:"flex-start",
                                     }}>{implShow(item.infoImplementation)}</div>
                                <div className="hidden-scroll"
                                     style={{
                                         maxWidth: maxWidthColumns[3],
                                         display: "flex",
                                         flexDirection: "column",
                                         justifyContent:"center",
                                         paddingRight: 16,
                                         alignItems:"flex-start"
                                     }}>{item.results}</div>
                                <div className="hidden-scroll"
                                     style={{
                                         maxWidth: maxWidthColumns[4],
                                         display: "flex",
                                         flexDirection: "column",
                                         justifyContent:"center",
                                         paddingRight: 16,
                                         alignItems:"flex-start"
                                     }}>{item.comments}</div>
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