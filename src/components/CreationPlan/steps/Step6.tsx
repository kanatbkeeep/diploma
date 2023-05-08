import React, {useEffect, useState} from "react";
import Input from "../../Input/Input";
import Dropdown from "../../Dropdown/Dropdown";
import Button from "../../Button/Button";
import Plus from "../../../assets/icon/plus.svg";
import Delete from "../../../assets/icon/delete.svg";
import Edit from "../../../assets/icon/edit.svg";
import Copy from "../../../assets/icon/copy.svg";
import NavMark from "../../../assets/icon/nav-mark.svg";
import Table from "../../Table/Table";
import {observer} from "mobx-react";
import t from "../../../utils/Lang";
import moment from "moment/moment";
import RadioButton from "../../RadioButton/RadioButton";
import Checkbox from "../../Checkbox/Checkbox";
import FilePicker from "../../FilePicker/FilePicker";

const Step6 = (props: any) => {
    const [open, setOpen] = useState("");
    const [itemEdit, setItemEdit]: any = useState(null);

    const {planStore, kpiStore} = props;


    const validation = () => {
        return true
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

    function handleFileRead(event: any) {
        const bytes = new Uint8Array(event.target.result);
        // Выполните необходимые действия с байтами файла
    }

    return (
        <div className="step-component">
            <div className="inputs-step">
                <div className="degree-position-container">
                    <div>High-research</div>
                    <div>Professor</div>
                </div>
                <div className="navigation-marks">
                    <img className="back" src={NavMark}/>
                    <img className="next" src={NavMark}/>
                </div>
                <div className="section">Section 1.</div>
                <div className="node">Статья/монография в соавторстве для данной категории считается только для одного
                    ученого или по долям
                </div>
                <div className="options">
                    <RadioButton
                        label={t('testText')}
                        id="1"
                        name="name"
                    />
                    <RadioButton
                        label={t('testText')}
                        id="2"
                        name="name"
                    />
                </div>
                <div className="percentages-container">
                    <div className="percentages">
                        <div className="per-1">Необходимое количество для выполнения: 2</div>
                        <div className="per-2">Доля, %: 30</div>
                        <div className="per-3">Нынешняя доля, %: 20</div>
                    </div>
                </div>

                <div style={{marginBottom: 20}} className="line-blue"/>

                <Checkbox
                    label={t('submissionClosing')}
                />
                <div style={{marginBottom:20}}/>
                <Dropdown
                    maxWidth={160}
                    onClick={() => {
                        if (open === "") {
                            setOpen("sectionNumber");
                        } else {
                            setOpen("")
                        }
                    }}
                    open={open === "sectionNumber"}
                    label={t('sectionNumber')}
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

                <div style={{marginBottom:20}}/>
                <Dropdown
                    maxWidth={1045}
                    onClick={() => {
                        if (open === "") {
                            setOpen("copyExisting");
                        } else {
                            setOpen("")
                        }
                    }}
                    open={open === "copyExisting"}
                    label={t('copyExisting')}
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

                <div style={{marginBottom:20}}/>
                <Dropdown
                    maxWidth={160}
                    onClick={() => {
                        if (open === "") {
                            setOpen("numberAuthors");
                        } else {
                            setOpen("")
                        }
                    }}
                    open={open === "numberAuthors"}
                    label={t('numberAuthors')}
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

                <div style={{marginBottom:20}}/>

                <div style={{display:"flex", flexDirection:"row"}}>
                    <Input
                        maxWidth={140}
                    label={t('deadlines')}
                    />
                    <div style={{marginRight:20}}/>
                    <Dropdown
                        maxWidth={300}
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

                <div style={{marginBottom:20}}/>

                <Input
                    maxWidth={500}
                    type="area"
                    label={t('results')}
                    value={planStore.step5.results}
                    onChange={(e: any) => {
                        planStore.editStep5Modal({results: e.target.value});
                    }
                    }
                />

                <div style={{marginBottom:20}}/>

                <Input
                    maxWidth={500}
                    type="area"
                    label={t('comments')}
                    placeholder={t('commentPlaceholder')}
                    value={planStore.step5.comments}
                    onChange={(e: any) => {
                        planStore.editStep5Modal({comments: e.target.value});
                    }
                    }
                />

                <div style={{marginBottom:20}}/>

                <FilePicker
                label={t('supportingDoc')}
                value={kpiStore.model.fileName}
                onChange={(e:any)=>{
                    console.log(e.target.files[0]);
                    kpiStore.editModel({
                        fileName:e.target.files[0].name,
                    })
                }}
                />

                <div style={{marginBottom:20}}/>

                <div style={{display: "flex", justifyContent: "flex-end"}}>
                    <div style={{width: 144}}>
                        <Button className="'primaryButtonAdd'"
                                icon={Plus}
                                label={t('add')}
                                onClick={()=> {
                                }}
                                disabled={false}
                        />
                    </div>
                    <div style={{width: 50}}/>
                    <div style={{width: 144}}>
                        <Button icon={Delete}
                                label={t('reset')}
                                onClick={()=>{
                                }}
                        />
                    </div>
                </div>

            </div>

            <div className="kpi-percentage">
                KPI, %: 88
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

export default observer(Step6);