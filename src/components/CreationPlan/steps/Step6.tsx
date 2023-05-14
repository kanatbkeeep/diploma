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
        if (kpiStore.currentSection.options?.length > 0) {
            return (kpiStore.model.chosenOption && kpiStore.model.results && kpiStore.model.comments && kpiStore.model.deadlines
                && kpiStore.model.fileName && kpiStore.model.fileBase64
                && (kpiStore.model.infoImplementation !== "Other" ? kpiStore.model.infoImplementation : kpiStore.model.otherInfoImpl))
        } else {
            return ((isAveragePercentage() ? kpiStore.model.averagePer:kpiStore.model.results) && kpiStore.model.comments && kpiStore.model.deadlines
                && kpiStore.model.fileName && kpiStore.model.fileBase64
                && (kpiStore.model.infoImplementation !== "Other" ? kpiStore.model.infoImplementation : kpiStore.model.otherInfoImpl))
        }

    }

    useEffect(()=>{
        console.log("isFinance:"+isFinance());
        let section:any = anotherSection();

        let rate:any = currentUser.rate === "1" ? section.rate_full : currentUser.rate === "0.5" ? section.rate_half : section.rate_quarter;

        if(isAveragePercentage()){
          if(kpiStore.model.averagePer >= 80){
              kpiStore.editModel({currentPercentage: section.percentage});
          }else{
              kpiStore.editModel({currentPercentage: 0});
          }
        }else if(isFinance()){
            if(kpiStore.model.results){
                kpiStore.editModel({currentPercentage: section.percentage});
            }else{
                kpiStore.editModel({currentPercentage: 0});
            }
        }else{
            if(section.authorsByParts){
                kpiStore.editModel({currentPercentage: section.percentage / rate / kpiStore.model.numberAuthor});
            }else{
                kpiStore.editModel({currentPercentage: section.percentage / rate});
            }
        }
    },[kpiStore.currentSection,kpiStore.model.numberAuthor, kpiStore.model.averagePer, kpiStore.model.anotherSectionNumber, kpiStore.model.results])


    const anotherSection = () =>{
        let section:any;
        if(kpiStore.model.anotherSectionNumber){
            const ind = kpiStore.kpiSections.findIndex((item:any)=>{
                return item.sectionNumber === kpiStore.model.anotherSectionNumber;
            });
            return section = kpiStore.kpiSections[ind];
        }else{
            return section = kpiStore.currentSection;
        }
    }

    const addObject = () => {
        kpiStore.saveKpi(planStore.plan.id, planStore);
        kpiStore.clean();
        kpiStore.resetChecked();
    }

    const clear = () => {
        kpiStore.clean();
        kpiStore.resetChecked();
        setItemEdit(null);
    }

    const copy = (item: any) => {
        clear();
        kpiStore.editModel({
            deadlines:item.deadlines,
            infoImplementation:(item.informationOnImplementation === "Online" || item.informationOnImplementation === "Offline") ? item.informationOnImplementation : "Other",
            results:item.results,
            comments:item.comments,
            otherInfoImpl: (item.informationOnImplementation !== "Online" || item.informationOnImplementation !== "Offline") ? item.informationOnImplementation : "",
            numberAuthor: item.authorsNumber,
            chosenOption: item.nameOfTheWork,
            fileName:item.pdfFileName,
            fileBase64:item.pdfFile,
            currentIndSection: item.kpiSection.sectionNumber-1,
        });
        kpiStore.currentSection = item.kpiSection;
        isAveragePercentage() && kpiStore.editModel({averagePer:parseInt(item.result)});
        item.anotherSectionNumber !== 0 && kpiStore.editModel({isAnotherSection:true, anotherSectionNumber: item.anotherSectionNumber});
        if(item.kpiSection.options.length > 0){
            const ind:any = kpiStore.checked.findIndex((i:any)=>{
                return (i.id === item.nameOfTheWork && i.checked === false);
            });
            kpiStore.checked[ind].checked = true;
        }
    }

    const edit = () => {
        kpiStore.updateKpi(itemEdit.id);
        clear();
    }


    const textFile = (text: String) => {
        if (text?.length > 23) {
            return text.substring(0, 20) + "...";
        } else {
            return text;
        }
    }

    const isChecked = (id:any) =>{
        const arr:any = kpiStore.checked.filter((i:any)=> i.id === id);
        return arr[0].checked;
    }

    const check = (id:any)=>{
        kpiStore.resetChecked()
        const ind:any = kpiStore.checked.findIndex((i:any)=>{
            return (i.id === id && i.checked === false);
        });
        kpiStore.checked[ind].checked = true;
    }

    const isAveragePercentage = ()=>{
        return  kpiStore.currentSection.name === "Средний процент независимого анкетирования \"Преподаватель глазами студентов\""
    }

    const isFinance = () =>{
        return kpiStore.currentSection.name === "Привлечение финансирования" || anotherSection().name === "Привлечение финансирования";
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
                                 clear();
                             }}
                             className="back"
                             src={NavMark}/> : null}
                    {kpiStore.model.currentIndSection !== kpiStore.kpiSections.length - 1 ?
                        <img role="button"
                             onClick={() => {
                                 kpiStore.editModel({currentIndSection: kpiStore.model.currentIndSection + 1});
                                 kpiStore.currentSection = kpiStore.kpiSections[kpiStore.model.currentIndSection];
                                 clear();
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
                                checked={isChecked(item)}
                                id={`option${ind}${kpiStore.currentSection.id}`}
                                name={`options${kpiStore.currentSection.id}`}
                                value={item}
                                onChange={(e: any) => {
                                    if (e.target.checked) {
                                        kpiStore.editModel({chosenOption: e.target.value});
                                        check(item);
                                        console.log(kpiStore.checked)
                                    }
                                }}
                            />
                        )
                    }) : null}
                </div>
                <div className="percentages-container">
                    <div className="percentages">
                        <div
                            className="per-1">{`Необходимое количество для выполнения: ${currentUser.rate === "1" ? anotherSection().rate_full : currentUser.rate === "0.5" ? anotherSection().rate_half : anotherSection().rate_quarter}`}</div>
                        <div className="per-2">{`Доля, %: ${anotherSection().percentage}`}</div>
                        <div className="per-3">{`Нынешняя доля, %: ${kpiStore.model.currentPercentage}`}</div>
                    </div>
                </div>

                <div style={{marginBottom: 20}} className="line-blue"/>

                {
                    kpiStore.currentSection.anotherSection
                        ? <>
                            <Checkbox
                                label={t('submissionClosing')}
                                checked={kpiStore.model.isAnotherSection}
                                onChange={(e: any) => {
                                    kpiStore.editModel({isAnotherSection: e.target.checked, anotherSectionNumber: null});
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
                                        value={kpiStore.model.anotherSectionNumber ? kpiStore.model.anotherSectionNumber : t('select')}
                                    >
                                        <ul>
                                            {kpiStore.kpiSections.filter((item:any)=>{
                                                let count = 0;
                                                if(item.notes){
                                                   for(let i = 0; i <= 3; i++){
                                                       if(item.notes[i] === "*"){
                                                           count = count +1;
                                                       }
                                                   }
                                                }
                                                return item.sectionNumber !== kpiStore.currentSection.sectionNumber && count >= 2;
                                            }).map((item: any,ind:any) => {
                                                return <li
                                                    onClick={() => kpiStore.editModel({anotherSectionNumber: item.sectionNumber})}>
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

                {
                    kpiStore.currentSection.name !== "Средний процент независимого анкетирования \"Преподаватель глазами студентов\"" ?
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
                                value={kpiStore.model.anotherWork?.id === 1 ? kpiStore.model.anotherWork?.name?.length > 80
                                    ? kpiStore.model.anotherWork.name.substring(0,80)+"..." : kpiStore.model.anotherWork.name: t('select')}
                            >
                                <ul>
                                    {planStore.researchWorks.length > 0 ? planStore.researchWorks.map((item: any) => {
                                        return <li
                                            onClick={() => kpiStore.editModel({
                                                anotherWork:{
                                                    id:1,
                                                    name:item.nameOfTheWork
                                                },
                                                deadlines:item.deadlines,
                                                infoImplementation:(item.infoImplementation === "Online" || item.infoImplementation === "Offline") ? item.infoImplementation : "Other",
                                                results:item.results,
                                                comments:item.comments,
                                                otherInfoImpl: (item.infoImplementation !== "Online" || item.infoImplementation !== "Offline") ? item.infoImplementation : "",
                                            })}>
                                            {item?.nameOfTheWork?.length > 80 ? item.name.substring(0,80)+"..." : item?.nameOfTheWork}
                                        </li>
                                    }): <li>{t('noData')}</li>}
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
                                value={kpiStore.model.anotherWork?.id === 2 ? kpiStore.model.anotherWork?.name?.length > 80
                                    ? kpiStore.model.anotherWork.name.substring(0,80)+"..." : kpiStore.model.anotherWork.name: t('select')}
                            >
                                <ul>
                                    {planStore.eduWorks.length > 0 ? planStore.eduWorks.map((item: any) => {
                                        return <li
                                            onClick={() => kpiStore.editModel({
                                                anotherWork:{
                                                    id:2,
                                                    name:item.nameOfTheWork
                                                },
                                                deadlines:item.deadlines,
                                                infoImplementation:(item.infoImplementation === "Online" || item.infoImplementation === "Offline") ? item.infoImplementation : "Other",
                                                results:item.results,
                                                comments:item.comments,
                                                otherInfoImpl: (item.infoImplementation !== "Online" || item.infoImplementation !== "Offline") ? item.infoImplementation : "",
                                            })}>
                                            {item?.nameOfTheWork?.length > 80 ? item.name.substring(0,80)+"..." : item?.nameOfTheWork}
                                        </li>
                                    }): <li>{t('noData')}</li>}
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
                                value={kpiStore.model.anotherWork?.id === 3 ? kpiStore.model.anotherWork?.name?.length > 80
                                    ? kpiStore.model.anotherWork.name.substring(0,80)+"..." : kpiStore.model.anotherWork.name: t('select')}
                            >
                                <ul>
                                    {planStore.socialWorks.length > 0 ? planStore.socialWorks.map((item: any) => {
                                        return <li
                                            onClick={() => kpiStore.editModel({
                                                anotherWork:{
                                                    id:3,
                                                    name:item.nameOfTheWork
                                                },
                                                deadlines:item.deadlines,
                                                infoImplementation:(item.infoImplementation === "Online" || item.infoImplementation === "Offline") ? item.infoImplementation : "Other",
                                                results:item.results,
                                                comments:item.comments,
                                                otherInfoImpl: (item.infoImplementation !== "Online" || item.infoImplementation !== "Offline") ? item.infoImplementation : "",
                                            })}>
                                            {item?.nameOfTheWork?.length > 80 ? item.name.substring(0,80)+"..." : item?.nameOfTheWork}
                                        </li>
                                    }): <li>{t('noData')}</li>}
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
                    type={isAveragePercentage() ? "number" : "area"}
                    label={t('results')}
                    value={isAveragePercentage()? kpiStore.model.averagePer:kpiStore.model.results}
                    placeholder={isAveragePercentage() ? "Введите средний процент" : ""}
                    onChange={(e: any) => {
                        kpiStore.editModel(isAveragePercentage() ? {averagePer: e.target.value}:{results: e.target.value});
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
                    value={kpiStore.model.fileName ? kpiStore.model.fileName?.length > 50 ? kpiStore.model.fileName.substring(0, 45) + "..." : kpiStore.model.fileName : ""}
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
                                label={itemEdit ?t('edit') : t('add')}
                                onClick={() => {
                                    itemEdit ? edit() :addObject();
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
                    maxWidthColumns={[200, 100, 100, 150, 100, 200, 50 ,133]}
                    haveDelete={true}
                    onDelete={(arr: any[]) => {
                        kpiStore.deleteKpis(arr,planStore);
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
                                     style={{maxWidth: maxWidthColumns[0], paddingRight:16}}>{item.nameOfTheWork}</div>
                                <div style={{maxWidth: maxWidthColumns[1]}}>{item.deadlines}</div>
                                <div style={{maxWidth: maxWidthColumns[2]}}>{item.informationOnImplementation}</div>
                                <div className="hidden-scroll"
                                     style={{maxWidth: maxWidthColumns[3]}}>{item.results}</div>
                                <div className="hidden-scroll"
                                     style={{maxWidth: maxWidthColumns[4]}}>{item.comments}</div>
                                <div className="hidden-scroll" style={{maxWidth: maxWidthColumns[5]}}>
                                    <a className="download-file" href={item.pdfFile} download={item.pdfFileName}>
                                        <img src={File}/>
                                        {textFile(item.pdfFileName)}
                                    </a>
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
    )
}

export default observer(Step6);