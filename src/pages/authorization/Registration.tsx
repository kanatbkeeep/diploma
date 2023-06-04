import React, {useEffect} from 'react';
import Logo from '../../assets/icon/logo.svg'
import '../../style/loginPage.scss';
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import AppStore from "../../store/AppStore";
import t from "../../utils/Lang";
import {observer} from "mobx-react";
import {useNavigate} from "react-router-dom";
function Registration() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Registration';
    }, []);
    return (
        <>
            <main className="bg_darker_blue full_screen centralized">
                <section className="bg_white loginBlock">
                    <img className={'logo'} src={Logo} alt={'logo'}/>

                    <aside>
                        <h2>{t('registrationTitle')}</h2>
                        <Input value={AppStore.model.firstName} label={t('firstName')} login onChange={(e: any) => {
                            AppStore.editModel({firstName: e.target.value});
                        }}/>
                        <Input value={AppStore.model.lastName} label={t('lastName')} login onChange={(e: any) => {
                            AppStore.editModel({lastName: e.target.value});
                        }}/>
                        <Input value={AppStore.model.middleName} label={t('middleName')} login onChange={(e: any) => {
                            AppStore.editModel({middleName: e.target.value});
                        }}/>
                        <Input value={AppStore.model.email} label={'Email'} login onChange={(e: any) => {
                            AppStore.editModel({email: e.target.value});
                            AppStore.statusRegistration = null;
                        }}/>
                        <Input value={AppStore.model.password} label={t('password')} type={'password'} login onChange={(e: any) => {
                            AppStore.editModel({password: e.target.value});
                        }}/>

                        <Button label={t('registrationTitle')} onClick={() => {
                            AppStore.registrationUser().then();
                        }}/>

                        {AppStore.statusRegistration && AppStore.statusRegistration === "found" ? <div className="errorMassage">{t('userAlreadyExist')}</div>:null}
                        {AppStore.statusRegistration && AppStore.statusRegistration === "verify" ? <div className="verifyEmail">{t('needToVerify')}</div>:null}
                        {AppStore.statusRegistration && AppStore.statusRegistration === "techError" ? <div className="errorMassage">{t('techError')}</div>:null}

                        <a href="#/" onClick={() => navigate('/login')}>{t('loginTitle')}</a>
                    </aside>
                </section>
            </main>
        </>
    )
}

export default observer(Registration);