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
import AppStore from "../../../store/AppStore";

const Step2 = (props: any) => {
    const {planStore} = props;
    const [open, setOpen] = useState("");
    const [itemEdit, setItemEdit]: any = useState(null);
    const [uniqNames, setUniqNames]: any = useState([]);
    const [isOther,setIsOther]:any = useState(false);

    useEffect(() => {
        let arr: any[] = [];
        planStore.academWorks.map((item: any) => {
            if (!arr.includes(item.nameOfDiscipline)) {
                console.log("added");
                arr.push(item.nameOfDiscipline);
            }
        })
        setUniqNames(arr);
    }, [])


    const validation = () => {
        return ((planStore.step2.discipline !== t('other') ? planStore.step2.discipline : planStore.step2.anotherDiscipline) && planStore.step2.nameWork && planStore.step2.deadlines
            && (planStore.step2.infoImplementation === "Other/Другое/Басқа" ? planStore.step2.anotherInfoImpl : planStore.step2.infoImplementation));
    }

    const addObject = () => {
        planStore.saveAcademicMethod();
        clear();
    }

    const clear = () => {
        planStore.editStep2Modal({
            discipline: "",
            nameWork: "",
            deadlines: "",
            infoImplementation: "",
            anotherInfoImpl: "",
            comment: "",
            anotherDiscipline: "",
        })
        setItemEdit(null);
    }

    const copy = (item: any) => {
        planStore.editStep2Modal({...item});
        if (item.infoImplementation !== "Executed/Выполнен/Орындалды" && item.infoImplementation !== "In process/В процессе/Жұмыс барысында") {
            planStore.editStep2Modal({
                infoImplementation: "Other/Другое/Басқа",
                anotherInfoImpl: item.infoImplementation,
            });
        }
        if (!uniqNames.includes(item.discipline)) {
            planStore.editStep2Modal({
                discipline: t('other'),
                anotherDiscipline: item.discipline,
            });
        }
    }

    const edit = (item: any) => {
        const toUpdate = {
            id: item.id,
            discipline: planStore.step2.discipline === t('other') ? planStore.step2.anotherDiscipline : planStore.step2.discipline,
            nameWork: planStore.step2.nameWork,
            deadlines: planStore.step2.deadlines,
            infoImplementation: planStore.step2.infoImplementation !== "Other/Другое/Басқа" ? planStore.step2.infoImplementation : planStore.step2.anotherInfoImpl,
            comment: planStore.step2.comment,
        }
        planStore.updateAcademicMethod(toUpdate);
        clear();
    }

    const implShow = (impl: String) => {
        const lg = AppStore.lang;
        console.log(lg);
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
                <div style={{marginBottom: 20}}>
                    <Dropdown
                        onClick={() => {
                            if (open !== "discipline") {
                                setOpen("discipline");
                            } else {
                                setOpen("")
                            }
                        }}
                        open={open === "discipline"}
                        label={t('nameDiscipline')}
                        value={planStore.step2.discipline ? planStore.step2.discipline : t('select')}
                        maxWidth={500}
                    >
                        <ul>
                            {uniqNames.length > 0 ? uniqNames.map((item: any) => {
                                return <li onClick={() => {
                                    planStore.editStep2Modal({discipline: item,anotherDiscipline:""});
                                    setIsOther(false)
                                } }>
                                    {item}
                                </li>
                            }) : null}
                            <li onClick={()=>{setIsOther(true)
                                planStore.editStep2Modal({discipline: t('other')})
                            }}>{t('other')}</li>
                        </ul>
                    </Dropdown>

                    {
                        planStore.step2.discipline === t('other') ?
                            <div style={{marginTop: 20, marginBottom: 20, display: "flex"}}>
                                <Input
                                    maxWidth={500}
                                    label={t('otherDiscipline')}
                                    value={planStore.step2.anotherDiscipline}
                                    onChange={(e: any) => {
                                        planStore.editStep2Modal({anotherDiscipline: e.target.value});
                                    }
                                    }
                                />
                            </div> : null
                    }

                </div>
                <div style={{marginBottom: 20}}>
                    <Input maxWidth={500}
                           label={t('nameWork')}
                           placeholder={t('syllabusOrMethod')}
                           value={planStore.step2.nameWork}
                           onChange={(e: any) => {
                               planStore.editStep2Modal({nameWork: e.target.value});
                           }
                           }
                    />
                </div>
                <div style={{display: "flex", marginBottom: 20}}>
                    <Input
                        maxWidth={180}
                        label={t('deadlines')}
                        placeholder={t('end')}
                        value={planStore.step2.deadlines}
                        onChange={(e: any) => {
                            planStore.editStep2Modal({deadlines: e.target.value});
                            console.log(e.target.value)
                        }
                        }
                    />
                    <div style={{width: 20}}/>
                    <Dropdown maxWidth={300}
                              onClick={() => {
                                  if (open !== "infoImplementation") {
                                      setOpen("infoImplementation");
                                  } else {
                                      setOpen("")
                                  }
                              }}
                              open={open === "infoImplementation"}
                              label={t('infoOnImplementation')}
                              value={planStore.step2.infoImplementation ? implShow(planStore.step2.infoImplementation) : t('select')}
                    >
                        <ul>
                            {planStore.infoImplementation.map((item: any) => {
                                return <li onClick={() => planStore.editStep2Modal({infoImplementation: item.name})}>
                                    {implShow(item.name)}
                                </li>
                            })}
                        </ul>
                    </Dropdown>
                </div>

                {
                    planStore.step2.infoImplementation === "Other/Другое/Басқа" ?
                        <div style={{marginTop: 20, marginBottom: 20, display: "flex"}}>
                            <Input
                                maxWidth={500}
                                label={t('infoOnImplementation')}
                                value={planStore.step2.anotherInfoImpl}
                                onChange={(e: any) => {
                                    planStore.editStep2Modal({anotherInfoImpl: e.target.value});
                                }
                                }
                            />
                        </div> : null
                }

                <div style={{marginBottom: 20}}>
                    <Input
                        label={t('comments')}
                        type="area"
                        maxWidth={500}
                        value={planStore.step2.comment}
                        onChange={(e: any) => {
                            planStore.editStep2Modal({comment: e.target.value});
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
                    array={planStore.eduMethWorks}
                    length={planStore.eduMethWorks.length}
                    rowsPerPage={4}
                    maxWidthTable={1083}
                    maxWidthColumns={[250, 250, 100, 150, 150, 140]}
                    haveDelete={true}
                    onDelete={(arr: any[]) => {
                        planStore.deleteAcademicMethods(arr);
                    }}
                    renderHead={(maxWidthColumns) => {
                        return <div>
                            <div style={{maxWidth: 50}}></div>
                            <div style={{maxWidth: maxWidthColumns[0]}}>{t('nameDiscipline')}</div>
                            <div style={{maxWidth: maxWidthColumns[1]}}>{t('nameWork')}</div>
                            <div style={{maxWidth: maxWidthColumns[2]}}>{t('deadlines')}</div>
                            <div style={{maxWidth: maxWidthColumns[3]}}>{t('infoOnImplementation')}</div>
                            <div style={{maxWidth: maxWidthColumns[4]}}>{t('comments')}</div>
                            <div style={{maxWidth: maxWidthColumns[5]}}></div>
                        </div>
                    }}
                    renderBody={(item, index, maxWidthColumns, checkbox) => {
                        return (
                            <div key={index}>
                                <div style={checkbox ? {maxWidth: 50} : {}}>{checkbox}</div>
                                <div style={{maxWidth: maxWidthColumns[0]}}>{item.discipline}</div>
                                <div style={{maxWidth: maxWidthColumns[1]}}>{item.nameWork}</div>
                                <div style={{maxWidth: maxWidthColumns[2]}}>{item.deadlines}</div>
                                <div style={{maxWidth: maxWidthColumns[3]}}>{implShow(item.infoImplementation)}</div>
                                <div className="hidden-scroll" style={{maxWidth: maxWidthColumns[4]}}>
                                    {item.comment}
                                </div>
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

export default observer(Step2);