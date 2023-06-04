import React, {useEffect} from "react";
import {observer} from 'mobx-react';
import t from "../../utils/Lang";
import CrossWhite from "../../assets/icon/crossWhite.svg";
import TickWhite from "../../assets/icon/tickWhite.svg";
import Button from "../Button/Button";
import AppStore from "../../store/AppStore";
import ApproveStore from "../../store/ApproveStore";
import Table from "../Table/Table";
import EyeBlack from "../../assets/icon/eyeBlack.svg";
import DownloadWhite from "../../assets/icon/downloadWhite.svg";
import {useNavigate} from "react-router-dom";
import {url} from "../../config/rest/common";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

const DirectorPlanList = (props: any) => {
    const navigate = useNavigate();

    useEffect(() => {}, [AppStore.myPlansToApproveReport.length && AppStore.myPlansToApprovePlan.length])

    return (
        <section className="tableProfile">
            {AppStore.myPlansToApprove ? <>
                <div className="togglePlansReportDirector">
                    <ToggleSwitch
                        key={'directorPlan'}
                        id={'directorPlanId'}
                        text2={t('report')}
                        text1={t('myPlans')}
                        checked={AppStore.model.showReport}
                        onChange={(e: any) => {
                            AppStore.editModel({showReport: e.target.checked});
                        }}
                    />
                </div>

                <Table
                    array={AppStore.model.showReport ? AppStore.myPlansToApproveReport : AppStore.myPlansToApprovePlan}
                    rowsPerPage={4}
                    maxWidthTable={1000}
                    maxWidthColumns={[80, 345, 120, 120, 310]}
                    haveDelete={false}
                    onDelete={() => {
                        console.log("deleted");
                    }}
                    renderHead={(maxWidthColumns) => {
                        return <div>
                            <div style={{maxWidth: 25}}></div>
                            <div style={{maxWidth: maxWidthColumns[0]}}>{t('type')}</div>
                            <div style={{maxWidth: maxWidthColumns[1]}}>{t('professor')}</div>
                            <div style={{maxWidth: maxWidthColumns[2]}}>{t('academicYear')}</div>
                            <div style={{maxWidth: maxWidthColumns[3]}}>{t('status')}</div>
                        </div>
                    }}
                    renderBody={(item, index, maxWidthColumns) => {
                        if (item.report === AppStore.model.showReport) {
                            return (
                                <div key={index}>
                                    <div style={{maxWidth: 25}}></div>
                                    <div style={{maxWidth: maxWidthColumns[0]}}>{item.report ? t('report') : t('plan')}</div>
                                    <div style={{maxWidth: maxWidthColumns[1]}}>{item.createdBy.firstName + ' ' + item.createdBy.lastName + ' ' + item.createdBy.middleName}</div>
                                    <div style={{maxWidth: maxWidthColumns[2]}}>{item.year}</div>
                                    <div style={{maxWidth: maxWidthColumns[3]}}>{item.status}</div>
                                    <div style={{maxWidth: maxWidthColumns[4], display: "flex", justifyContent: "space-between"}}>
                                        <div>
                                            <Button
                                                icon={EyeBlack}
                                                type={'smallWhite'}
                                                onClick={() => {
                                                    navigate(`/plan/${item.id}`);
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <Button
                                                icon={DownloadWhite}
                                                type={'smallDark'}
                                                onClick={()=>{
                                                    window.location.href = `${url}/plan/create-docx?planId=${item.id}`
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <Button
                                                icon={TickWhite}
                                                type={'smallBlue'}
                                                disabled={item.status === 'APPROVED'}
                                                onClick={() => {
                                                    props.onModalStateChangedApprove(true);
                                                    ApproveStore.editModel({selectedPlan: item});
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <Button
                                                icon={CrossWhite}
                                                type={'smallRed'}
                                                disabled={item.status === 'APPROVED'}
                                                onClick={() => {
                                                    props.onModalStateChangedRevision(true);
                                                    ApproveStore.editModel({selectedPlan: item});
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        } else return <></>
                    }}
                    search={true}/>
            </> : null}
        </section>
    )
}

export default observer(DirectorPlanList);