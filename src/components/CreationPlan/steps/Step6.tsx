import React, {useEffect, useState} from "react";
import Input from "../../Input/Input";
import Dropdown from "../../Dropdown/Dropdown";
import Button from "../../Button/Button";
import Plus from "../../../assets/icon/plus.svg";
import Delete from "../../../assets/icon/delete.svg";
import Edit from "../../../assets/icon/edit.svg";
import Copy from "../../../assets/icon/copy.svg";
import NavMark from "../../../assets/icon/nav-mark.svg";
import File from "../../../assets/icon/file.svg";
import Table from "../../Table/Table";
import {observer} from "mobx-react";
import t, {l} from "../../../utils/Lang";
import moment from "moment/moment";
import RadioButton from "../../RadioButton/RadioButton";
import Checkbox from "../../Checkbox/Checkbox";
import FilePicker from "../../FilePicker/FilePicker";

const Step6 = (props: any) => {
    const [open, setOpen] = useState("");
    const [itemEdit, setItemEdit]: any = useState(null);
    const {planStore, kpiStore, AppStore} = props;
    const {currentUser} = AppStore;
    const [section, setSection] = useState(0);

    const validation = () => {
        if(kpiStore.currentSection.options?.length > 0){
            return (kpiStore.model.chosenOption && kpiStore.model.results && kpiStore.model.comments && kpiStore.model.deadlines
                && kpiStore.model.fileName && kpiStore.model.fileBase64
                && (kpiStore.model.infoImplementation !== "Other" ? kpiStore.model.infoImplementation: kpiStore.model.otherInfoImpl))
        }else{
            return (kpiStore.model.results && kpiStore.model.comments && kpiStore.model.deadlines
                && kpiStore.model.fileName && kpiStore.model.fileBase64
                && (kpiStore.model.infoImplementation !== "Other" ? kpiStore.model.infoImplementation: kpiStore.model.otherInfoImpl))
        }

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


    const textFile = (text:String) => {
        if(text?.length > 23){
            return text.substring(0,20)+ "...";
        }else{
            return text;
        }
    }

    return (
        <div className="step-component">
            <div className="inputs-step">
                <div className="degree-position-container">
                    <div>{currentUser.degree[l('name')]}</div>
                    <div>{currentUser.position[l('name')]}</div>
                </div>
                <div className="navigation-marks">
                    {kpiStore.model.currentIndSection !== 0 ?
                        <img role="button"
                             onClick={() => {
                                 kpiStore.editModel({currentIndSection: kpiStore.model.currentIndSection - 1});
                                 kpiStore.currentSection = kpiStore.kpiSections[kpiStore.model.currentIndSection];
                                 console.log(kpiStore.currentSection);
                             }}
                             className="back"
                             src={NavMark}/> : null}
                    {kpiStore.model.currentIndSection !== kpiStore.kpiSections.length - 1 ?
                        <img role="button"
                             onClick={() => {
                                 kpiStore.editModel({currentIndSection: kpiStore.model.currentIndSection + 1});
                                 kpiStore.currentSection = kpiStore.kpiSections[kpiStore.model.currentIndSection];
                                 console.log(kpiStore.currentSection);
                             }}
                             className="next"
                             src={NavMark}/> : null}
                </div>
                <div
                    className="section">{`${kpiStore.currentSection.sectionNumber}. ${kpiStore.currentSection.name}`}</div>
                {
                    kpiStore.currentSection.notes ? <div className="node">{kpiStore.currentSection.notes}</div> : null
                }
                <div className="options">
                    {kpiStore.currentSection.options ? kpiStore.currentSection.options.map((item: any, ind: any) => {
                        return (
                            <RadioButton
                                label={item}
                                id={`option${ind}`}
                                name="options"
                                value={item}
                                onChange={(e: any) => {
                                    if (e.target.checked) {
                                        kpiStore.editModel({chosenOption: e.target.value});
                                    }
                                }}
                            />
                        )
                    }) : null}
                </div>
                <div className="percentages-container">
                    <div className="percentages">
                        <div
                            className="per-1">{`Необходимое количество для выполнения: ${currentUser.rate === "1" ? kpiStore.currentSection.rate_full : currentUser.rate === "0.5" ? kpiStore.currentSection.rate_half : kpiStore.currentSection.rate_quarter}`}</div>
                        <div className="per-2">{`Доля, %: ${kpiStore.currentSection.percentage}`}</div>
                        <div className="per-3">Нынешняя доля, %: 20</div>
                    </div>
                </div>

                <div style={{marginBottom: 20}} className="line-blue"/>

                {
                    kpiStore.currentSection.anotherSection
                        ? <>
                            <Checkbox
                                label={t('submissionClosing')}
                                onChange={(e: any) => {
                                    kpiStore.editModel({isAnotherSection: e.target.checked});
                                }}
                            />
                            <div style={{marginBottom: 20}}/>
                            {
                                kpiStore.model.isAnotherSection ?
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
                                    : null
                            }
                        </> : null
                }


                <div style={{marginBottom: 20}}/>
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

                <div style={{marginBottom: 20}}/>
                {
                    kpiStore.currentSection.authorsByParts ?
                        <>
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
                                value={kpiStore.model.numberAuthor ? kpiStore.model.numberAuthor : t('select')}
                            >
                                <ul>
                                    {kpiStore.numberAuthors.map((item: any) => {
                                        return <li
                                            onClick={() => kpiStore.editModel({numberAuthor: item})}>
                                            {item}
                                        </li>
                                    })}
                                </ul>
                            </Dropdown>

                            <div style={{marginBottom: 20}}/>
                        </> : null
                }

                <div style={{display: "flex", flexDirection: "row"}}>
                    <Input
                        maxWidth={140}
                        label={t('deadlines')}
                        value={kpiStore.model.deadlines}
                        onChange={(e: any) => {
                            kpiStore.editModel({deadlines: e.target.value})
                        }}
                    />
                    <div style={{marginRight: 20}}/>
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
                        value={kpiStore.model.infoImplementation ? kpiStore.model.infoImplementation : t('select')}
                    >
                        <ul>
                            {kpiStore.infoImplementation.map((item: any) => {
                                return <li
                                    onClick={() => kpiStore.editModel({
                                        infoImplementation: item.name,
                                        otherInfoImpl: ""
                                    })}>
                                    {item.name}
                                </li>
                            })}
                        </ul>
                    </Dropdown>
                </div>
                <div style={{marginBottom: 20}}/>

                {kpiStore.model.infoImplementation === "Other" ?
                    <Input
                        maxWidth={500}
                        label={t('infoOnImplementation')}
                        value={kpiStore.model.otherInfoImpl}
                        onChange={(e: any) => {
                            kpiStore.editModel({otherInfoImpl: e.target.value})
                        }}
                    />
                    : null}

                <div style={{marginBottom: 20}}/>

                <Input
                    maxWidth={500}
                    type="area"
                    label={t('results')}
                    value={kpiStore.model.results}
                    onChange={(e: any) => {
                        kpiStore.editModel({results: e.target.value});
                    }
                    }
                />

                <div style={{marginBottom: 20}}/>

                <Input
                    maxWidth={500}
                    type="area"
                    label={t('comments')}
                    placeholder={t('commentPlaceholder')}
                    value={kpiStore.model.comments}
                    onChange={(e: any) => {
                        kpiStore.editModel({comments: e.target.value});
                    }
                    }
                />

                <div style={{marginBottom: 20}}/>

                <FilePicker
                    label={t('supportingDoc')}
                    value={kpiStore.model.fileName ? kpiStore.model.fileName?.length > 50 ? kpiStore.model.fileName.substring(0,45)+ "..." : kpiStore.model.fileName : ""}
                    onChange={async (e: any) => {
                        kpiStore.editModel({
                            fileName: e.target.files[0].name,
                        })
                        var selectedFile = e.target.files;
                        if (selectedFile.length > 0) {

                            var fileToLoad = selectedFile[0];

                            var fileReader = new FileReader();
                            var base64;

                            fileReader.onload = function (fileLoadedEvent: any) {
                                base64 = fileLoadedEvent.target.result;
                                // kpiStore.editModel({fileBase64:base64.substring(28,base64.length-1)});
                                kpiStore.editModel({fileBase64: base64});
                                console.log(kpiStore.model.fileName);
                                console.log(kpiStore.model.fileBase64);
                            };
                            fileReader.readAsDataURL(fileToLoad);
                        }
                    }}
                />


                <div style={{marginBottom: 20}}/>

                <div style={{display: "flex", justifyContent: "flex-end"}}>
                    <div style={{width: 144}}>
                        <Button className="'primaryButtonAdd'"
                                icon={Plus}
                                label={t('add')}
                                onClick={() => {
                                    kpiStore.saveKpi(planStore.plan.id);
                                }}
                                disabled={!(validation())}
                        />
                    </div>
                    <div style={{width: 50}}/>
                    <div style={{width: 144}}>
                        <Button icon={Delete}
                                label={t('reset')}
                                onClick={() => {
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
                    array={planStore.kpiWorks}
                    length={planStore.kpiWorks.length}
                    rowsPerPage={4}
                    maxWidthTable={1083}
                    maxWidthColumns={[250, 100, 100, 150, 100,200,133]}
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
                            <div style={{maxWidth: maxWidthColumns[5]}}>{t('supportingDoc')}</div>
                            <div style={{maxWidth: maxWidthColumns[6]}}></div>
                        </div>
                    }}
                    renderBody={(item, index, maxWidthColumns, checkbox) => {
                        return (
                            <div key={index}>
                                <div style={checkbox ? {maxWidth: 50} : {}}>{checkbox}</div>
                                <div className="hidden-scroll" style={{maxWidth: maxWidthColumns[0]}}>{item.nameOfTheWork}</div>
                                <div style={{maxWidth: maxWidthColumns[1]}}>{item.deadlines}</div>
                                <div style={{maxWidth: maxWidthColumns[2]}}>{item.informationOnImplementation}</div>
                                <div className="hidden-scroll" style={{maxWidth: maxWidthColumns[3]}}>{item.results}</div>
                                <div className="hidden-scroll" style={{maxWidth: maxWidthColumns[4]}}>{item.comments}</div>
                                <div className="hidden-scroll" style={{maxWidth: maxWidthColumns[5]}}>
                                    <a className="download-file" href={item.pdfFile} download={item.pdfFileName}>
                                        <img src={File}/>
                                        {textFile(item.pdfFileName)}
                                    </a>
                                </div>
                                <div style={{maxWidth: maxWidthColumns[6]}}>
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