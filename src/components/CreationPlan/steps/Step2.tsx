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
import moment from "moment/moment";

const Step2 = (props: any) => {
    const {planStore} = props;
    const [open, setOpen] = useState("");
    const [itemEdit, setItemEdit]: any = useState(null);


    const validation = () => {
        return (planStore.step2.discipline && planStore.step2.nameWork && planStore.step2.deadlines && planStore.step2.infoImplementation);
    }

    const addObject = () => {
        planStore.saveAcademicMethod();
        planStore.editStep2Modal({
            discipline: null,
            nameWork: "",
            deadlines: "",
            infoImplementation: null,
            comment: "",
        })
    }

    const clear = () => {
        planStore.editStep2Modal({
            discipline: null,
            nameWork: "",
            deadlines: "",
            infoImplementation: null,
            comment: "",
        })
    }

    const copy = (item: any) => {
        planStore.editStep2Modal({...item});
    }

    const edit = (item: any) => {
        const toUpdate = {...item, ...planStore.step2}
        planStore.updateAcademicMethod(toUpdate);
        planStore.editStep2Modal({
            discipline: "",
            nameWork: "",
            deadlines: "",
            infoImplementation: "",
            comment: "",
        })
        setItemEdit(null);
    }
    return (
        <div className="step-component">
            <Input
                maxWidth={144}
                placeholder={t('academicYear')}
                value={planStore.years}
                onChange={(e: any) => {
                    planStore.years = e.target.value;
                }
                }
            />
            <div style={{marginBottom: 13}}/>
            <div className="inputs-step">
                <div style={{marginBottom: 20}}>
                    <Dropdown
                        onClick={() => {
                            if (open === "") {
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
                            {planStore.disciplines.map((item: any) => {
                                return <li onClick={() => planStore.editStep2Modal({discipline: item.name})}>
                                    {item.name}
                                </li>
                            })}
                        </ul>
                    </Dropdown>
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
                        type='date'
                        maxWidth={180}
                        label={t('deadlines')}
                        placeholder={t('end')}
                        value={planStore.step2.deadlines}
                        onChange={(e: any) => {
                            planStore.editStep2Modal({deadlines: e.target.value});
                            console.log(planStore.step2.deadlines);
                        }
                        }
                    />
                    <div style={{width: 20}}/>
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
                              value={planStore.step2.infoImplementation ? planStore.step2.infoImplementation : t('select')}
                    >
                        <ul>
                            {planStore.infoImplementation.map((item: any) => {
                                return <li onClick={() => planStore.editStep2Modal({infoImplementation: item.name})}>
                                    {item.name}
                                </li>
                            })}
                        </ul>
                    </Dropdown>
                </div>
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
                    onDelete={(arr:any[]) => {
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
                                <div style={{maxWidth: maxWidthColumns[2]}}>{moment(new Date(item.deadlines)).format("DD.MM.yyyy")}</div>
                                <div style={{maxWidth: maxWidthColumns[3]}}>{item.infoImplementation}</div>
                                <div  className="hidden-scroll" style={{maxWidth: maxWidthColumns[4],
                                    overflowY:"scroll"}}>
                                    {item.comment}
                                </div>
                                <div style={{maxWidth: maxWidthColumns[5]}}>
                                    <div style={{width: 54, marginRight: 10}}>
                                        <Button className="secondaryButton"
                                                icon={Edit}
                                                onClick={() => {
                                                    setItemEdit(item);
                                                    planStore.editStep2Modal({...item});
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