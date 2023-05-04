import {observer} from 'mobx-react';
import React, {useCallback, useEffect, useState} from 'react';
import Logo from '../../assets/icon/logoSmall.svg'
import '../../style/profilePage.scss';
import iconHouse from '../../assets/icon/house.svg'
import iconBell from '../../assets/icon/bell.svg'
import iconLogout from '../../assets/icon/logout.svg'
import Button from "../../components/Button/Button";
import Table from "../../components/Table/Table";
import Navigation from "../../components/Notification/Notification";
import AppStore from "../../store/AppStore";
import t from "../../utils/Lang";
import Edit from "../../assets/icon/edit.svg";
import Copy from "../../assets/icon/copy.svg";
import {useNavigate} from "react-router-dom";
import Dropdown from "../../components/Dropdown/Dropdown";

function Profile() {
    const [open, setOpen] = useState("");
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const handleModalStateChanged = useCallback((state: boolean) => {
        setModalOpen(state);
    }, []);

    function eraseCookie(name: any) {
        document.cookie = name+'=; Max-Age=-99999999;';
    }

    const validation = (item: any) => {
        let obj = {
            step1: 'Not filled',
            step2: 'Not filled',
            step3: 'Not filled',
            step4: 'Not filled',
            step5: 'Not filled',
            step6: 'Not filled',
        };
        if (item.nameDiscipline && item.course && item.trimester && item.groups && item.lecturesPlan && item.lecturesFact && item.practicesFact && item.hoursPlan && item.hoursFact && item.totalPlan && item.totalFact) {
            obj.step1 = 'Filled';
        }
        if (item.discipline && item.nameWork && item.deadlines && item.infoImplementation1 && item.comment1) {
            obj.step2 = 'Filled';
        }
        if (item.typeWork && item.journal && item.deadline && item.article && item.infoImplementation2 && item.comment2) {
            obj.step3 = 'Filled';
        }
        return obj;
    }

    useEffect(() => {
        AppStore.getUser().then(() => {
            if (!AppStore.currentUser) {
                window.location.replace('/login')
            }

            if (AppStore.currentUser?.roles[0].roleName === "TEACHER") {
                AppStore.getDepartmentByTeacher();
                AppStore.getMyPlans();
            }

        }).catch(() => {
            if (!AppStore.currentUser) {
                window.location.replace('/login')
            }
        });
    }, [])

    const arr = Array.from({ length: 40 }, (_, i) => ({
        id:i,
        firstname: `Firstname${i}`,
        lastname: "Myrzasary",
        middlename: "Timurylu",
        age: 20,
    }));

    return (
        <>
            <main className={modalOpen ? 'darker': ''}>
                <nav>
                    <aside>
                        <img alt={'logo'} src={Logo}/>
                    </aside>

                    <aside>
                        <Dropdown
                            noIcon
                            lang
                            value={AppStore.lang}
                        >
                            <ul>
                                {AppStore.langs.map((item: any) => {
                                    return <li style={{display: "flex", justifyContent: "center", padding: "0"}}
                                               onClick={() => {
                                                   AppStore.lang = item;
                                                   document.cookie = "lang=" + item;
                                               }}>
                                        {item}
                                    </li>
                                })}
                            </ul>
                        </Dropdown>

                        <Button
                            label={'Home'}
                            type={'secondaryButton'}
                            icon={iconHouse}
                        />

                        <Button
                            onClick={() => {
                                setModalOpen(true);
                            }}
                            label={'Notifications'}
                            type={'secondaryButton'}
                            icon={iconBell}
                        />

                        <Button
                            label={'Log out'}
                            type={'primaryButton'}
                            icon={iconLogout}
                            onClick={() => {
                                eraseCookie('Authorization');
                                window.location.reload();
                            }}
                        />
                    </aside>
                </nav>

                <section className={'userInfo mt-38'}>
                    <aside className={'userAvatar'}></aside>
                    <aside className={'userData'}>
                        <h2>{AppStore.currentUser?.lastName + ' ' + AppStore.currentUser?.firstName + ' ' + AppStore.currentUser?.middleName}</h2>
                        <div className="column">
                            <h4 className="mt-24">{t('position')}</h4>
                            <span>{AppStore.currentUser?.position}</span>
                            <h4 className="mt-24">{t('degree')}</h4>
                            <span>{AppStore.currentUser?.degree}</span>
                            <div className="row mt-24">
                                <div  className="column mr-58">
                                    <h4>{t('department')}</h4>
                                    <span>{AppStore.department?.name}</span>
                                </div>
                                <div  className="column">
                                    <h4>{t('departmentDirector')}</h4>
                                    <span>{AppStore.department?.director.firstName + ' ' + AppStore.department?.director.lastName}</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </section>

                <section className="tableProfile">
                    {AppStore.myPlans ? <>
                        <Table
                            array={AppStore.myPlans}
                            rowsPerPage={4}
                            maxWidthTable={1150}
                            maxWidthColumns={[120, 120, 150, 120, 130, 100, 100, 120, 140]}
                            haveDelete={true}
                            onDelete={()=>{
                                console.log("deleted");
                            }}
                            renderHead={(maxWidthColumns) => {
                                return <div>
                                    <div style={{maxWidth:50}}></div>
                                    <div style={{maxWidth: maxWidthColumns[0]}}>{t('academicYear')}</div>
                                    <div style={{maxWidth: maxWidthColumns[1]}}>{t('academicWork')}</div>
                                    <div style={{maxWidth: maxWidthColumns[2]}}>{t('academicMethods')}</div>
                                    <div style={{maxWidth: maxWidthColumns[3]}}>{t('academicResearchWork')}</div>
                                    <div style={{maxWidth: maxWidthColumns[4]}}>{t('academicEducationalWork')}</div>
                                    <div style={{maxWidth: maxWidthColumns[5]}}>{t('academicSocialWork')}</div>
                                    <div style={{maxWidth: maxWidthColumns[6]}}>{'KPI'}</div>
                                    <div style={{maxWidth: maxWidthColumns[7]}}>{t('status')}</div>
                                </div>
                            }}
                            renderBody={(item, index, maxWidthColumns, checkbox) => {
                                return (
                                    <div key={index}>
                                        <div style={checkbox ? {maxWidth:50} : {}}>{checkbox}</div>
                                        <div style={{maxWidth: maxWidthColumns[0]}}>{validation(item).step1}</div>
                                        <div style={{maxWidth: maxWidthColumns[1]}}>{validation(item).step2}</div>
                                        <div style={{maxWidth: maxWidthColumns[2]}}>{validation(item).step3}</div>
                                        <div style={{maxWidth: maxWidthColumns[3]}}>{validation(item).step4}</div>
                                        <div style={{maxWidth: maxWidthColumns[4]}}>{validation(item).step5}</div>
                                        <div style={{maxWidth: maxWidthColumns[5]}}>{validation(item).step6}</div>
                                        <div style={{maxWidth: maxWidthColumns[6]}}>{'0%'}</div>
                                        <div style={{maxWidth: maxWidthColumns[7]}}>{'Not sent'}</div>
                                        <div style={{maxWidth: maxWidthColumns[8]}}>
                                            <div style={{width:54, marginRight:10}}><Button className="secondaryButton" icon={Edit}/></div>
                                            <div style={{width:54}}><Button icon={Copy}/></div>
                                        </div>
                                    </div>
                                );
                            }}
                            search={true}/>
                    </> : null}
                </section>
                <section className={'createPlan'}>
                    <Button
                        label={t('createPlan')}
                        type={'secondaryButtonAdd'}
                        onClick={() => {
                            navigate('/creation-plan');
                        }}
                    />
                </section>
            </main>

            <Navigation open={modalOpen} onModalStateChanged={handleModalStateChanged}/>
        </>
    )
}

export default observer(Profile);