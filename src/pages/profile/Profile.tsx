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
import t, {l} from "../../utils/Lang";
import Edit from "../../assets/icon/edit.svg";
import EditWhite from "../../assets/icon/editWhtie.svg";
import Copy from "../../assets/icon/copy.svg";
import {useNavigate} from "react-router-dom";
import Dropdown from "../../components/Dropdown/Dropdown";
import EditProfile from "../../components/EditProfile/EditProfile";
import EditProfileStore from "../../store/EditProfileStore";
import Plus from '../../assets/icon/plus.svg'
import TickWhite from "../../assets/icon/tickWhite.svg";
import CrossWhite from "../../assets/icon/crossWhite.svg";
import EyeBlack from "../../assets/icon/eyeBlack.svg";
import DownloadWhite from "../../assets/icon/downloadWhite.svg";
import Approve from "../../components/Approve/Approve";
import ApproveStore from "../../store/ApproveStore";

function Profile() {
    const [open, setOpen] = useState("");
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalOpen2, setModalOpen2] = useState<boolean>(false);
    const [approveOpen, setApproveOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const handleModalStateChanged = useCallback((state: boolean) => {
        setModalOpen(state);
    }, []);
    const handleModalStateChanged2 = useCallback((state: boolean) => {
        setModalOpen2(state);
    }, []);
    const handleApproveOpenChanged = useCallback((state: boolean) => {
        setApproveOpen(state)
    }, []);

    function eraseCookie(name: any) {
        document.cookie = name + '=; Max-Age=-99999999;';
    }

    const validation = (item: any) => {
        let obj = {
            step1: item.year ? item.year : 'Not filled',
            step2: item?.academicWorks?.length > 0 ? 'Filled' : 'Not filled',
            step3: item?.academicMethods?.length > 0 ? 'Filled' : 'Not filled',
            step4: item?.researchWorks?.length > 0 ? 'Filled' : 'Not filled',
            step5: item?.educationalWorks?.length > 0 ? 'Filled' : 'Not filled',
            step6: item?.socialWorks?.length > 0 ? 'Filled' : 'Not filled',
            step8: item.status ? item.status : 'Not sent',
        }

        return obj;
    }

    useEffect(() => {
        AppStore.getUser().then(() => {
            if (!AppStore.currentUser) {
                window.location.replace('/login')
            }

            if (AppStore.isTeacher()) {
                AppStore.getDepartmentByTeacher().then(() => {
                    EditProfileStore.editModel({
                        firstName: AppStore.currentUser.firstName,
                        lastName: AppStore.currentUser.lastName,
                        middleName: AppStore.currentUser.middleName,
                        position: AppStore.currentUser.position,
                        degree: AppStore.currentUser.degree,
                        rate: AppStore.currentUser.rate,
                        fileBase64: AppStore.currentUser.photo,
                        department: AppStore.department,
                    })
                });
                AppStore.getMyPlans();
                EditProfileStore.getPositions();
                EditProfileStore.getDegrees();
                EditProfileStore.getDepartmentList();
            } else {
                AppStore.getDepartmentByDirector().then(() => {
                    EditProfileStore.editModel({
                        firstName: AppStore.currentUser.firstName,
                        lastName: AppStore.currentUser.lastName,
                        middleName: AppStore.currentUser.middleName,
                        position: AppStore.currentUser.position,
                        degree: AppStore.currentUser.degree,
                        rate: AppStore.currentUser.rate,
                        fileBase64: AppStore.currentUser.photo,
                        department: AppStore.department,
                    })
                });
                AppStore.getMyPlans();
                AppStore.getMyPlansToApproveAwaiting();
                EditProfileStore.getPositions();
                EditProfileStore.getDegrees();
                EditProfileStore.getDepartmentList();
            }

        }).catch(() => {
            if (!AppStore.currentUser) {
                window.location.replace('/login')
            }
        });
    }, [])

    return (AppStore.currentUser &&
        <>
            <EditProfile store={EditProfileStore} open={modalOpen2} handleChange={handleModalStateChanged2}/>
            <main className={modalOpen || modalOpen2 || approveOpen ? 'darker' : ''}>
                <nav>
                    <aside>
                        <img alt={'logo'} src={Logo}/>
                    </aside>

                    <aside>
                        <Dropdown
                            onClick={() => {
                                if (open === "") {
                                    setOpen("lang");
                                } else {
                                    setOpen("")
                                }
                            }}
                            open={open === "lang"}
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
                    <aside className={'userAvatar'}>
                        <img src={AppStore.currentUser?.photo}/>
                    </aside>
                    <aside className={'userData'}>
                        <h2>{AppStore.currentUser?.lastName + ' ' + AppStore.currentUser?.firstName + ' ' + AppStore.currentUser?.middleName}</h2>
                        <div className="row">
                            <div className="column mr-58 space-between">
                                <div>
                                    <h4 className="mt-24">{t('position')}</h4>
                                    <span>{AppStore.currentUser?.position[l('name')]}</span>
                                </div>
                                {AppStore.isTeacher() ? <div>
                                    <div>
                                        <h4 className="mt-24">{t('degree')}</h4>
                                        <span>{AppStore.currentUser?.degree[l('name')]}</span>
                                    </div>
                                </div> : null}
                                <div>
                                    <h4 className={AppStore.isTeacher() ? "mt-24" : "mt-96"}>{t('department')}</h4>
                                    <span>{AppStore.department?.name}</span>
                                </div>
                            </div>
                            <div className="column mr-58 space-between">
                                {AppStore.isTeacher() ? <div>
                                    <h4 className="mt-24">{t('rate')}</h4>
                                    <span>{AppStore.currentUser?.rate}</span>
                                </div> : null}
                                {AppStore.isTeacher() ? <div>
                                    <h4 className="mt-24">{t('departmentDirector')}</h4>
                                    <span>{AppStore.department?.director.firstName + ' ' + AppStore.department?.director.lastName}</span>
                                </div> : null}
                            </div>
                            <div className="column profileEditBtnParent">
                                <Button
                                    className={'profileEditBtn'}
                                    icon={EditWhite}
                                    onClick={() => {
                                        setModalOpen2(true);
                                    }}
                                />
                            </div>
                        </div>
                    </aside>
                </section>

                {AppStore.isTeacher() ? <>
                    <section className="tableProfile">
                        {AppStore.myPlans ? <>
                            <Table
                                array={AppStore.myPlans}
                                rowsPerPage={4}
                                maxWidthTable={1150}
                                maxWidthColumns={[120, 120, 150, 120, 130, 100, 100, 120, 140]}
                                haveDelete={true}
                                onDelete={() => {
                                    console.log("deleted");
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
                                    </div>
                                }}
                                renderBody={(item, index, maxWidthColumns, checkbox) => {
                                    return (
                                        <div key={index}>
                                            <div style={checkbox ? {maxWidth: 50} : {}}>{checkbox}</div>
                                            <div style={{maxWidth: maxWidthColumns[0]}}>{validation(item).step1}</div>
                                            <div style={{maxWidth: maxWidthColumns[1]}}>{validation(item).step2}</div>
                                            <div style={{maxWidth: maxWidthColumns[2]}}>{validation(item).step3}</div>
                                            <div style={{maxWidth: maxWidthColumns[3]}}>{validation(item).step4}</div>
                                            <div style={{maxWidth: maxWidthColumns[4]}}>{validation(item).step5}</div>
                                            <div style={{maxWidth: maxWidthColumns[5]}}>{validation(item).step6}</div>
                                            <div style={{maxWidth: maxWidthColumns[6]}}>{'0%'}</div>
                                            <div style={{maxWidth: maxWidthColumns[7]}}>{validation(item).step8}</div>
                                            <div style={{maxWidth: maxWidthColumns[8]}}>
                                                <div style={{width: 54, marginRight: 10}}>
                                                    <Button
                                                        className="secondaryButton"
                                                        icon={Edit}
                                                        onClick={() => {
                                                            navigate(`/plan/${item.id}`);
                                                        }}
                                                    />
                                                </div>
                                                <div style={{width: 54}}><Button icon={Copy}/></div>
                                            </div>
                                        </div>
                                    );
                                }}
                                search={true}/>
                        </> : null}
                    </section>

                    <section className={'createPlan'}>
                        <Button
                            icon={Plus}
                            label={t('createPlan')}
                            type={'secondaryButtonAdd'}
                            onClick={async () => {
                                await AppStore.createPlan();
                                navigate('/creation-plan');
                            }}
                        />
                    </section>
                </> : null}

                {AppStore.isDirector() ? <>
                    <section className="tableProfile">
                        {AppStore.myPlansToApprove ? <>
                            <Table
                                array={AppStore.myPlansToApprove}
                                rowsPerPage={4}
                                maxWidthTable={1000}
                                maxWidthColumns={[400, 120, 120, 310]}
                                haveDelete={false}
                                onDelete={() => {
                                    console.log("deleted");
                                }}
                                renderHead={(maxWidthColumns) => {
                                    return <div>
                                        <div style={{maxWidth: 50}}></div>
                                        <div style={{maxWidth: maxWidthColumns[0]}}>{t('professor')}</div>
                                        <div style={{maxWidth: maxWidthColumns[1]}}>{t('academicYear')}</div>
                                        <div style={{maxWidth: maxWidthColumns[2]}}>{t('status')}</div>
                                    </div>
                                }}
                                renderBody={(item, index, maxWidthColumns, checkbox) => {
                                    return (
                                        <div key={index}>
                                            <div style={{maxWidth: 50}}></div>
                                            <div style={{maxWidth: maxWidthColumns[0]}}>{item.createdBy.firstName + ' ' + item.createdBy.lastName + ' ' + item.createdBy.middleName}</div>
                                            <div style={{maxWidth: maxWidthColumns[1]}}>{item.year}</div>
                                            <div style={{maxWidth: maxWidthColumns[2]}}>{item.status}</div>
                                            <div style={{maxWidth: maxWidthColumns[3], display: "flex", justifyContent: "space-between"}}>
                                                <div>
                                                    <Button
                                                        icon={EyeBlack}
                                                        type={'smallWhite'}
                                                    />
                                                </div>
                                                <div>
                                                    <Button
                                                        icon={DownloadWhite}
                                                        type={'smallDark'}
                                                    />
                                                </div>
                                                <div>
                                                    <Button
                                                        icon={TickWhite}
                                                        type={'smallBlue'}
                                                        disabled={item.status === 'APPROVED'}
                                                        onClick={() => {
                                                            setApproveOpen(true);
                                                            ApproveStore.editModel({selectedPlan: item});
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <Button
                                                        icon={CrossWhite}
                                                        type={'smallRed'}
                                                        disabled={item.status === 'APPROVED'}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }}
                                search={true}/>
                        </> : null}
                    </section>
                </> : null}

            </main>

            <Navigation open={modalOpen} onModalStateChanged={handleModalStateChanged}/>
            <Approve open={approveOpen} onModalStateChanged={handleApproveOpenChanged}/>
        </>
    )
}

export default observer(Profile);