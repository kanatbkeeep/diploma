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
import RadioButton from "../../RadioButton/RadioButton";
import Checkbox from "../../Checkbox/Checkbox";
import FilePicker from "../../FilePicker/FilePicker";

const Step6 = (props: any) => {
    const [open, setOpen] = useState("");
    const [itemEdit, setItemEdit]: any = useState(null);
    const {planStore, AppStore} = props;
    const {currentUser} = AppStore;
    const user = planStore.plan.createdBy.email === currentUser.email ? currentUser : planStore.plan.createdBy;

    // const validation = () => {
    //     if (planStore.currentSection.options?.length > 0) {
    //         return (planStore.step6.chosenOption && planStore.step6.results && planStore.step6.comments && planStore.step6.deadlines
    //             && (planStore.step6.infoImplementation !== "Other/Другое/Басқа" ? planStore.step6.infoImplementation : planStore.step6.otherInfoImpl))
    //     } else {
    //         return ((isAveragePercentage() ? planStore.step6.averagePer:planStore.step6.results) && planStore.step6.comments && planStore.step6.deadlines
    //             && (planStore.step6.infoImplementation !== "Other/Другое/Басқа" ? planStore.step6.infoImplementation : planStore.step6.otherInfoImpl))
    //     }
    //
    // }

    const validation = () => {
        if(isAveragePercentage()){
            return true;
        }else{
            return !!planStore.step6.chosenOption;
        }

    }

    useEffect(() => {
        if(planStore.kpiSections.length > 0){
            let section: any = anotherSection();
            let rate: any = user.rate === "1" ? section.rate_full : user.rate === "0.5" ? section.rate_half : section.rate_quarter;
            if (isAveragePercentage()) {
                if (planStore.step6.averagePer >= 80) {
                    planStore.editStep6Modal({currentPercentage: section.percentage});
                } else {
                    planStore.editStep6Modal({currentPercentage: (planStore.step6.averagePer * section.percentage) / rate});
                }

            } else if (isFinance()) {
                if (planStore.step6.results) {
                    planStore.editStep6Modal({currentPercentage: section.percentage});
                } else {
                    planStore.editStep6Modal({currentPercentage: 0});
                }
            } else {
                if (section.authorsByParts) {
                    planStore.editStep6Modal({currentPercentage: section.percentage / rate / planStore.step6.numberAuthor});
                } else {
                    planStore.editStep6Modal({currentPercentage: section.percentage / rate});
                }
            }
        }

    }, [planStore.currentSection, planStore.step6.numberAuthor, planStore.step6.averagePer, planStore.step6.anotherSectionNumber, planStore.step6.results])


    const anotherSection = () => {
        if (planStore.step6.anotherSectionNumber) {
            const ind = planStore.kpiSections.findIndex((item: any) => {
                return item.sectionNumber === planStore.step6.anotherSectionNumber;
            });
            return planStore.kpiSections[ind];
        } else {
            return planStore.currentSection;
        }
    }

    const addObject = () => {
        planStore.saveKpi();
        planStore.clean();
        planStore.resetChecked();
    }

    const clear = () => {
        planStore.clean();
        planStore.resetChecked();
        setItemEdit(null);
    }

    const copy = (item: any) => {
        clear();
        planStore.editStep6Modal({
            deadlines: item.deadlines,
            infoImplementation: (item.informationOnImplementation === "Executed/Выполнен/Орындалды" || item.informationOnImplementation === "In process/В процессе/Жұмыс барысында") ? item.informationOnImplementation : "Other/Другое/Басқа",
            results: item.results,
            comments: item.comments,
            otherInfoImpl: (item.informationOnImplementation !== "Executed/Выполнен/Орындалды" || item.informationOnImplementation !== "In process/В процессе/Жұмыс барысында") ? item.informationOnImplementation : "",
            numberAuthor: item.authorsNumber,
            chosenOption: item.nameOfTheWork,
            fileName: item.pdfFileName,
            fileBase64: item.pdfFile,
            currentIndSection: item.kpiSection.sectionNumber - 1,
        });
        planStore.currentSection = item.kpiSection;
        isAveragePercentage() && planStore.editStep6Modal({averagePer: parseInt(item.result)});
        item.anotherSectionNumber !== 0 && planStore.editStep6Modal({
            isAnotherSection: true,
            anotherSectionNumber: item.anotherSectionNumber
        });
        if (item.kpiSection.options.length > 0) {
            const ind: any = planStore.checked.findIndex((i: any) => {
                return (i.id === item.nameOfTheWork && i.checked === false);
            });
            planStore.checked[ind].checked = true;
        }
    }

    const edit = () => {
        planStore.updateKpi(itemEdit.id);
        clear();
    }


    const textFile = (text: String) => {
        if (text?.length > 23) {
            return text.substring(0, 20) + "...";
        } else {
            return text;
        }
    }

    const isChecked = (id: any) => {
        const arr: any = planStore.checked.filter((i: any) => i.id === id);
        return arr[0].checked;
    }

    const check = (id: any) => {
        planStore.resetChecked()
        const ind: any = planStore.checked.findIndex((i: any) => {
            return (i.id === id && i.checked === false);
        });
        planStore.checked[ind].checked = true;
    }

    const isAveragePercentage = () => {
        return planStore.currentSection.name === "Средний процент независимого анкетирования \"Преподаватель глазами студентов\""
    }

    const isFinance = () => {
        return planStore.currentSection.name === "Привлечение финансирования" || anotherSection().name === "Привлечение финансирования";
    }

    const implShow = (impl: String) => {
        const lg = AppStore.lang;
        if (impl === "Executed/Выполнен/Орындалды") {
            if (lg === "en") {
                return impl.substring(0, 8);
            } else if (lg === "ru") {
                return impl.substring(9, 17);
            } else {
                return impl.substring(18);
            }
        } else if (impl === "In process/В процессе/Жұмыс барысында") {
            if (lg === "en") {
                return impl.substring(0, 10);
            } else if (lg === "ru") {
                return impl.substring(11, 21);
            } else {
                return impl.substring(22);
            }
        } else if (impl === "Other/Другое/Басқа") {
            if (lg === "en") {
                return impl.substring(0, 5);
            } else if (lg === "ru") {
                return impl.substring(6, 12);
            } else {
                return impl.substring(13);
            }
        }
        return impl;
    }

    return (
        planStore.kpiSections.length > 0 ?
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
                        <div className="degree-position-container">
                            <div>{user.degree[l('name')]}</div>
                            <div>{user.position[l('name')]}</div>
                        </div>
                        <div className="navigation-marks">
                            {planStore.step6.currentIndSection !== 0 ?
                                <img role="button"
                                     onClick={() => {
                                         planStore.editStep6Modal({currentIndSection: planStore.step6.currentIndSection - 1});
                                         planStore.currentSection = planStore.kpiSections[planStore.step6.currentIndSection];
                                         clear();
                                     }}
                                     className="back"
                                     src={NavMark} alt='backButton'/> : null}
                            {planStore.step6.currentIndSection !== planStore.kpiSections.length - 1 ?
                                <img role="button"
                                     onClick={() => {
                                         planStore.editStep6Modal({currentIndSection: planStore.step6.currentIndSection + 1});
                                         planStore.currentSection = planStore.kpiSections[planStore.step6.currentIndSection];
                                         clear();
                                     }}
                                     className="next"
                                     src={NavMark} alt='nextButton'/> : null}
                        </div>
                        <div
                            className="section">{`${planStore.currentSection.sectionNumber}. ${planStore.currentSection.name}`}</div>
                        {
                            planStore.currentSection.notes ? <div className="node">{planStore.currentSection.notes}</div> : null
                        }
                        <div className="options">
                            {planStore.currentSection.options ? planStore.currentSection.options.map((item: any, ind: any) => {
                                return (
                                    <RadioButton
                                        label={item}
                                        checked={isChecked(item)}
                                        id={`option${ind}${planStore.currentSection.id}`}
                                        name={`options${planStore.currentSection.id}`}
                                        value={item}
                                        onChange={(e: any) => {
                                            if (e.target.checked) {
                                                planStore.editStep6Modal({chosenOption: e.target.value});
                                                check(item);
                                                console.log(planStore.checked)
                                            }
                                        }}
                                    />
                                )
                            }) : null}
                        </div>
                        <div className="percentages-container">
                            <div className="percentages">
                                <div
                                    className="per-1">{`${t('requiredPoints')} ${user.rate === "1" ? anotherSection().rate_full : user.rate === "0.5" ? anotherSection().rate_half : anotherSection().rate_quarter}`}</div>
                                <div className="per-2">{`${t('fraction')} ${anotherSection().percentage}`}</div>
                                <div className="per-3">{`${t('currentFraction')} ${planStore.step6.currentPercentage}`}</div>
                            </div>
                        </div>

                        <div style={{marginBottom: 20}} className="line-blue"/>

                        {
                            planStore.currentSection.anotherSection
                                ? <>
                                    <Checkbox
                                        label={t('submissionClosing')}
                                        checked={planStore.step6.isAnotherSection}
                                        onChange={(e: any) => {
                                            planStore.editStep6Modal({
                                                isAnotherSection: e.target.checked,
                                                anotherSectionNumber: null
                                            });
                                        }}
                                    />
                                    <div style={{marginBottom: 20}}/>
                                    {
                                        planStore.step6.isAnotherSection ?
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
                                                value={planStore.step6.anotherSectionNumber ? planStore.step6.anotherSectionNumber : t('select')}
                                            >
                                                <ul>
                                                    {planStore.kpiSections.filter((item: any) => {
                                                        let count = 0;
                                                        if (item.notes) {
                                                            for (let i = 0; i <= 3; i++) {
                                                                if (item.notes[i] === "*") {
                                                                    count = count + 1;
                                                                }
                                                            }
                                                        }
                                                        return item.sectionNumber !== planStore.currentSection.sectionNumber && count >= 2;
                                                    }).map((item: any) => {
                                                        return <li
                                                            onClick={() => planStore.editStep6Modal({anotherSectionNumber: item.sectionNumber})}>
                                                            {item.sectionNumber}
                                                        </li>
                                                    })}
                                                </ul>
                                            </Dropdown>
                                            : null
                                    }
                                </> : null
                        }


                        <div style={{marginBottom: 20}}/>
                        {
                            planStore.currentSection.authorsByParts ?
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
                                        value={planStore.step6.numberAuthor ? planStore.step6.numberAuthor : t('select')}
                                    >
                                        <ul>
                                            {planStore.numberAuthors.map((item: any) => {
                                                return <li
                                                    onClick={() => planStore.editStep6Modal({numberAuthor: item})}>
                                                    {item}
                                                </li>
                                            })}
                                        </ul>
                                    </Dropdown>

                                    <div style={{marginBottom: 20}}/>
                                </> : null
                        }

                        {
                            planStore.currentSection.name !== "Средний процент независимого анкетирования \"Преподаватель глазами студентов\"" ?
                                <>
                                    <div style={{marginBottom: 20}}/>
                                    <Dropdown
                                        maxWidth={1045}
                                        onClick={() => {
                                            if (open !== "copyExisting1") {
                                                setOpen("copyExisting1");
                                            } else {
                                                setOpen("")
                                            }
                                        }}
                                        open={open === "copyExisting1"}
                                        label={t('copyExisting1')}
                                        value={planStore.step6.anotherWork?.id === 1 ? planStore.step6.anotherWork?.name?.length > 80
                                            ? planStore.step6.anotherWork.name.substring(0, 80) + "..." : planStore.step6.anotherWork.name : t('select')}
                                    >
                                        <ul>
                                            {planStore.researchWorks.length > 0 ? planStore.researchWorks.map((item: any) => {
                                                return <li
                                                    onClick={() => planStore.editStep6Modal({
                                                        anotherWork: {
                                                            id: 1,
                                                            name: item.nameOfTheWork
                                                        },
                                                        deadlines: item.deadlines,
                                                        infoImplementation: (item.infoImplementation === "Executed/Выполнен/Орындалды" || item.infoImplementation === "In process/В процессе/Жұмыс барысында") ? item.infoImplementation : "Other/Другое/Басқа",
                                                        results: item.results,
                                                        comments: item.comments,
                                                        otherInfoImpl: (item.infoImplementation !== "Executed/Выполнен/Орындалды" || item.infoImplementation !== "In process/В процессе/Жұмыс барысында") ? item.infoImplementation : "",
                                                    })}>
                                                    {item?.nameOfTheWork?.length > 80 ? item.nameOfTheWork.substring(0, 80) + "..." : item?.nameOfTheWork}
                                                </li>
                                            }) : <li>{t('noData')}</li>}
                                        </ul>
                                    </Dropdown>
                                    <div style={{marginBottom: 20}}/>
                                    <Dropdown
                                        maxWidth={1045}
                                        onClick={() => {
                                            if (open !== "copyExisting2") {
                                                setOpen("copyExisting2");
                                            } else {
                                                setOpen("")
                                            }
                                        }}
                                        open={open === "copyExisting2"}
                                        label={t('copyExisting2')}
                                        value={planStore.step6.anotherWork?.id === 2 ? planStore.step6.anotherWork?.name?.length > 80
                                            ? planStore.step6.anotherWork.name.substring(0, 80) + "..." : planStore.step6.anotherWork.name : t('select')}
                                    >
                                        <ul>
                                            {planStore.eduWorks.length > 0 ? planStore.eduWorks.map((item: any) => {
                                                return <li
                                                    onClick={() => planStore.editStep6Modal({
                                                        anotherWork: {
                                                            id: 2,
                                                            name: item.nameOfTheWork
                                                        },
                                                        deadlines: item.deadlines,
                                                        infoImplementation: (item.infoImplementation === "Executed/Выполнен/Орындалды" || item.infoImplementation === "In process/В процессе/Жұмыс барысында") ? item.infoImplementation : "Other/Другое/Басқа",
                                                        results: item.results,
                                                        comments: item.comments,
                                                        otherInfoImpl: (item.infoImplementation !== "Executed/Выполнен/Орындалды" || item.infoImplementation !== "In process/В процессе/Жұмыс барысында") ? item.infoImplementation : "",
                                                    })}>
                                                    {item?.nameOfTheWork?.length > 80 ? item.nameOfTheWork.substring(0, 80) + "..." : item?.nameOfTheWork}
                                                </li>
                                            }) : <li>{t('noData')}</li>}
                                        </ul>
                                    </Dropdown>
                                    <div style={{marginBottom: 20}}/>
                                    <Dropdown
                                        maxWidth={1045}
                                        onClick={() => {
                                            if (open !== "copyExisting3") {
                                                setOpen("copyExisting3");
                                            } else {
                                                setOpen("")
                                            }
                                        }}
                                        open={open === "copyExisting3"}
                                        label={t('copyExisting3')}
                                        value={planStore.step6.anotherWork?.id === 3 ? planStore.step6.anotherWork?.name?.length > 80
                                            ? planStore.step6.anotherWork.name.substring(0, 80) + "..." : planStore.step6.anotherWork.name : t('select')}
                                    >
                                        <ul>
                                            {planStore.socialWorks.length > 0 ? planStore.socialWorks.map((item: any) => {
                                                return <li
                                                    onClick={() => planStore.editStep6Modal({
                                                        anotherWork: {
                                                            id: 3,
                                                            name: item.nameOfTheWork
                                                        },
                                                        deadlines: item.deadlines,
                                                        infoImplementation: (item.infoImplementation === "Executed/Выполнен/Орындалды" || item.infoImplementation === "In process/В процессе/Жұмыс барысында") ? item.infoImplementation : "Other/Другое/Басқа",
                                                        results: item.results,
                                                        comments: item.comments,
                                                        otherInfoImpl: (item.infoImplementation !== "Executed/Выполнен/Орындалды" || item.infoImplementation !== "In process/В процессе/Жұмыс барысында") ? item.infoImplementation : "",
                                                    })}>
                                                    {item?.nameOfTheWork?.length > 80 ? item.nameOfTheWork.substring(0, 80) + "..." : item?.nameOfTheWork}
                                                </li>
                                            }) : <li>{t('noData')}</li>}
                                        </ul>
                                    </Dropdown>
                                    <div style={{marginBottom: 20}}/>
                                </>
                                : null
                        }

                        <div style={{display: "flex", flexDirection: "row"}}>
                            <Input
                                maxWidth={140}
                                label={t('deadlines')}
                                value={planStore.step6.deadlines}
                                onChange={(e: any) => {
                                    planStore.editStep6Modal({deadlines: e.target.value})
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
                                value={planStore.step6.infoImplementation ? implShow(planStore.step6.infoImplementation) : t('select')}
                            >
                                <ul>
                                    {planStore.infoImplementation.map((item: any) => {
                                        return <li
                                            onClick={() => planStore.editStep6Modal({
                                                infoImplementation: item.name,
                                                otherInfoImpl: ""
                                            })}>
                                            {implShow(item.name)}
                                        </li>
                                    })}
                                </ul>
                            </Dropdown>
                        </div>
                        <div style={{marginBottom: 20}}/>

                        {planStore.step6.infoImplementation === "Other/Другое/Басқа" ?
                            <Input
                                maxWidth={500}
                                label={t('infoOnImplementation')}
                                value={planStore.step6.otherInfoImpl}
                                onChange={(e: any) => {
                                    planStore.editStep6Modal({otherInfoImpl: e.target.value})
                                }}
                            />
                            : null}

                        <div style={{marginBottom: 20}}/>

                        <Input
                            maxWidth={500}
                            type={isAveragePercentage() ? "number" : "area"}
                            label={t('results')}
                            value={isAveragePercentage() ? planStore.step6.averagePer : planStore.step6.results}
                            placeholder={isAveragePercentage() ? "Введите средний процент" : ""}
                            onChange={(e: any) => {
                                planStore.editStep6Modal(isAveragePercentage() ? {averagePer: e.target.value} : {results: e.target.value});
                            }
                            }
                        />

                        <div style={{marginBottom: 20}}/>

                        <Input
                            maxWidth={500}
                            type="area"
                            label={t('comments')}
                            placeholder={t('commentPlaceholder')}
                            value={planStore.step6.comments}
                            onChange={(e: any) => {
                                planStore.editStep6Modal({comments: e.target.value});
                            }
                            }
                        />

                        <div style={{marginBottom: 20}}/>

                        {!(isAveragePercentage()) ?
                            <FilePicker
                                label={t('supportingDoc')}
                                value={planStore.step6.fileName ? planStore.step6.fileName?.length > 50 ? planStore.step6.fileName.substring(0, 45) + "..." : planStore.step6.fileName : ""}
                                onChange={async (e: any) => {
                                    planStore.editStep6Modal({
                                        fileName: e.target.files[0].name,
                                    })
                                    var selectedFile = e.target.files;
                                    if (selectedFile.length > 0) {

                                        var fileToLoad = selectedFile[0];

                                        var fileReader = new FileReader();
                                        var base64;

                                        fileReader.onload = function (fileLoadedEvent: any) {
                                            base64 = fileLoadedEvent.target.result;
                                            // planStore.editStep6Modal({fileBase64:base64.substring(28,base64.length-1)});
                                            planStore.editStep6Modal({fileBase64: base64});
                                            console.log(planStore.step6.fileName);
                                            console.log(planStore.step6.fileBase64);
                                        };
                                        fileReader.readAsDataURL(fileToLoad);
                                    }
                                }}
                            />
                            : null}


                        <div style={{marginBottom: 20}}/>

                        <div style={{display: "flex", justifyContent: "flex-end"}}>
                            <div style={{width: 144}}>
                                <Button className="'primaryButtonAdd'"
                                        icon={Plus}
                                        label={itemEdit ? t('edit') : t('add')}
                                        onClick={() => {
                                            itemEdit ? edit() : addObject();
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

                    <div className="kpi-percentage">
                        {`KPI, %: ${planStore.getKPIPercentage()}`}
                    </div>

                    <div>
                        <Table
                            array={planStore.kpiWorks}
                            length={planStore.kpiWorks.length}
                            rowsPerPage={4}
                            maxWidthTable={1083}
                            maxWidthColumns={[200, 100, 100, 150, 100, 200, 50, 133]}
                            haveDelete={true}
                            onDelete={(arr: any[]) => {
                                planStore.deleteKpis(arr, planStore);
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
                                    <div style={{maxWidth: maxWidthColumns[6]}}>%</div>
                                    <div style={{maxWidth: maxWidthColumns[7]}}></div>
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
                                                 justifyContent:"flex-start",
                                                 paddingRight: 16,
                                                 alignItems:"flex-start"
                                             }}>
                                            {item.nameOfTheWork}
                                        </div>
                                        <div className="hidden-scroll"
                                             style={{
                                                 maxWidth: maxWidthColumns[1],
                                                 display: "flex",
                                                 flexDirection: "column",
                                                 justifyContent:"center",
                                                 paddingRight: 16,
                                                 alignItems:"flex-start"
                                             }}>
                                            {item.deadlines}
                                        </div>
                                        <div
                                            className="hidden-scroll"
                                            style={{
                                                maxWidth: maxWidthColumns[2],
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent:"center",
                                                paddingRight: 16,
                                                alignItems:"flex-start"
                                            }}>{implShow(item.informationOnImplementation)}</div>
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
                                        <div className="hidden-scroll" style={{maxWidth: maxWidthColumns[5]}}>
                                            {item.pdfFile ? <>
                                                <a className="download-file" href={item.pdfFile} download={item.pdfFileName}>
                                                    <img alt='fileIcon' src={File}/>
                                                    {textFile(item.pdfFileName)}
                                                </a>
                                            </> : null}
                                        </div>
                                        <div style={{maxWidth: maxWidthColumns[6]}}>{`${item.percentage}%`}</div>
                                        <div style={{maxWidth: maxWidthColumns[7]}}>
                                            <div style={{width: 54, marginRight: 10}}>
                                                <Button className="secondaryButton"
                                                        icon={Edit}
                                                        onClick={() => {
                                                            copy(item);
                                                            setItemEdit(item);
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

                : <div className="kpi-warning">{t('kpiWarning')}</div>
    )
}

export default observer(Step6);