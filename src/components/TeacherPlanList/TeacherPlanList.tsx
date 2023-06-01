import React, {useEffect} from "react";
import {observer} from 'mobx-react';
import t from "../../utils/Lang";
import Button from "../Button/Button";
import AppStore from "../../store/AppStore";
import Table from "../Table/Table";
import Edit from "../../assets/icon/edit.svg";
import Copy from "../../assets/icon/copy.svg";
import {useNavigate} from "react-router-dom";
import CreationPlanStore from "../../store/CreationPlanStore";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

const TeacherPlanList = () => {
    const navigate = useNavigate()

    const validation = (item: any) => {
        let percentage = 0;
        item.kpis.forEach((item: any) => {
            percentage += item.percentage;
        })

        return {
            step1: item.year ? item.year : 'Not filled',
            step2: item?.academicWorks?.length > 0 ? 'Filled' : 'Not filled',
            step3: item?.academicMethods?.length > 0 ? 'Filled' : 'Not filled',
            step4: item?.researchWorks?.length > 0 ? 'Filled' : 'Not filled',
            step5: item?.educationalWorks?.length > 0 ? 'Filled' : 'Not filled',
            step6: item?.socialWorks?.length > 0 ? 'Filled' : 'Not filled',
            step7: percentage + '%',
            step8: item.status ? item.status : 'Not sent',
            step9: item.report ? t('report') : t('plan'),
        };
    }

    return (
        <section className="tableProfile">
            {AppStore.plansLoaded ? <>
                <div className="togglePlansReport">
                    <ToggleSwitch
                        key={'directorPlan'}
                        id={'directorPlan'}
                        text2={t('report')}
                        text1={t('myPlans')}
                        checked={AppStore.model.showReport}
                        onChange={(e: any) => {
                            AppStore.editModel({showReport: e.target.checked});
                        }}
                    />
                </div>

                <Table
                    array={AppStore.myPlans}
                    rowsPerPage={4}
                    maxWidthTable={1150}
                    maxWidthColumns={[120, 120, 150, 120, 130, 100, 60, 80, 80, 140]}
                    haveDelete={true}
                    onDelete={(es: any) => {
                        AppStore.deletePlan(es);
                    }}
                    renderHead={(maxWidthColumns) => {
                        return <div>
                            <div style={{maxWidth: 50}}></div>
                            <div style={{maxWidth: maxWidthColumns[0]}}>{t('academicYear')}</div>
                            <div style={{maxWidth: maxWidthColumns[1]}}>{t('academicWork')}</div>
                            <div style={{maxWidth: maxWidthColumns[2]}}>{t('academicMethods')}</div>
                            <div style={{maxWidth: maxWidthColumns[3]}}>{t('academicResearchWork')}</div>
                            <div style={{maxWidth: maxWidthColumns[4]}}>{t('academicEducationalWork')}</div>
                            <div style={{maxWidth: maxWidthColumns[5]}}>{t('academicSocialWork')}</div>
                            <div style={{maxWidth: maxWidthColumns[6]}}>{'KPI'}</div>
                            <div style={{maxWidth: maxWidthColumns[7]}}>{t('status')}</div>
                            <div style={{maxWidth: maxWidthColumns[8]}}>{t('type')}</div>
                        </div>
                    }}
                    renderBody={(item, index, maxWidthColumns, checkbox) => {
                        if (item.report === AppStore.model.showReport) {
                            return (<div key={index}>
                                <div style={checkbox ? {maxWidth: 50} : {}}>{checkbox}</div>
                                <div style={{maxWidth: maxWidthColumns[0]}}>{validation(item).step1}</div>
                                <div style={{maxWidth: maxWidthColumns[1]}}>{validation(item).step2}</div>
                                <div style={{maxWidth: maxWidthColumns[2]}}>{validation(item).step3}</div>
                                <div style={{maxWidth: maxWidthColumns[3]}}>{validation(item).step4}</div>
                                <div style={{maxWidth: maxWidthColumns[4]}}>{validation(item).step5}</div>
                                <div style={{maxWidth: maxWidthColumns[5]}}>{validation(item).step6}</div>
                                <div style={{maxWidth: maxWidthColumns[6]}}>{validation(item).step7}</div>
                                <div style={{maxWidth: maxWidthColumns[7]}}>{validation(item).step8}</div>
                                <div style={{maxWidth: maxWidthColumns[8]}}>{validation(item).step9}</div>
                                <div style={{maxWidth: maxWidthColumns[9]}}>
                                    <div style={{width: 54, marginRight: 10}}>
                                        <Button
                                            className="secondaryButton"
                                            icon={Edit}
                                            onClick={() => {
                                                navigate(`/plan/${item.id}`);
                                            }}
                                        />
                                    </div>
                                    <div style={{width: 54}}>
                                        <Button
                                            icon={Copy}
                                            onClick={() => {
                                                AppStore.model.selectedPlan = Object.assign({}, item);
                                                let planCopy = Object.assign({}, item);
                                                console.log(planCopy);
                                                console.log(AppStore.model.selectedPlan);
                                                console.log(item);
                                                AppStore.model.selectedPlan.id = null;
                                                AppStore.model.selectedPlan.status = null;
                                                AppStore.model.selectedPlan.academicWorks = [];
                                                AppStore.model.selectedPlan.academicMethods = [];
                                                AppStore.model.selectedPlan.educationalWorks = [];
                                                AppStore.model.selectedPlan.kpis = [];
                                                AppStore.model.selectedPlan.researchWorks = [];
                                                AppStore.model.selectedPlan.socialWorks = [];

                                                AppStore.copyPlan().then(() => {
                                                    CreationPlanStore.getPlan().then(() => {
                                                        planCopy.academicWorks.forEach((i: any) => {
                                                            console.log(123123123)
                                                            delete i.id;
                                                            CreationPlanStore.step1 = i;
                                                            CreationPlanStore.saveAcademicWork();
                                                        })

                                                        planCopy.academicMethods.forEach((i: any) => {
                                                            delete i.id;
                                                            CreationPlanStore.step2 = i;
                                                            CreationPlanStore.saveAcademicMethod();
                                                        })

                                                        planCopy.researchWorks.forEach((i: any) => {
                                                            delete i.id;
                                                            CreationPlanStore.step3 = i;
                                                            CreationPlanStore.saveResearchWork();
                                                        })

                                                        planCopy.educationalWorks.forEach((i: any) => {
                                                            delete i.id;
                                                            CreationPlanStore.step4 = i;
                                                            CreationPlanStore.saveEduWork();
                                                        })

                                                        planCopy.socialWorks.forEach((i: any) => {
                                                            delete i.id;
                                                            CreationPlanStore.step5 = i;
                                                            CreationPlanStore.saveSocialWork();
                                                        })

                                                        planCopy.kpis.forEach((i: any) => {
                                                            CreationPlanStore.currentSection = i.kpiSection;
                                                            CreationPlanStore.step6 = {
                                                                fileName: i.pdfFileName,
                                                                fileBase64: i.pdfFile,
                                                                chosenOption: i.nameOfTheWork,
                                                                isAnotherSection: false,
                                                                anotherSectionNumber: i.anotherSectionNumber,
                                                                deadlines: i.deadlines,
                                                                infoImplementation: i.informationOnImplementation,
                                                                results: i.results,
                                                                comments: i.comments,
                                                                otherInfoImpl: i.informationOnImplementation,
                                                                numberAuthor: i.authorsNumber,
                                                                currentPercentage: i.percentage,
                                                                averagePer: i.results,
                                                                anotherWork: null,
                                                            };
                                                            CreationPlanStore.saveKpi();
                                                        })
                                                    }).then(() => {
                                                        AppStore.getMyPlans();
                                                    });
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>)
                        } else return (<></>)
                    }}
                    search={true}/>

            </> : null}
        </section>
    )
}

export default observer(TeacherPlanList);