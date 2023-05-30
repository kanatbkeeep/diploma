import React from 'react';
import Logo from '../../assets/icon/logo.svg'
import '../../style/loginPage.scss';
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import AppStore from "../../store/AppStore";
import t from "../../utils/Lang";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react";
import ResetPasswordStore from "../../store/ResetPasswordStore";

function ForgetPassword() {
    const navigate = useNavigate();
    return (
        <>
            <main className="bg_darker_blue full_screen centralized">
                <section className="bg_white loginBlock">
                    <img className={'logo'} src={Logo} alt={'logo'}/>

                    <aside>
                        <h2>{t('forgotPassword')}</h2>
                        <Input label={'Email'} value={AppStore.model.email} login onChange={(e: any) => {
                            ResetPasswordStore.editModel({email: e.target.value});
                        }}/>
                        <Input label={t('newPassword')} value={AppStore.model.newPassword} type={'password'} login onChange={(e: any) => {
                            ResetPasswordStore.editModel({newPassword: e.target.value})
                        }}/>
                        <Input label={t('newPasswordConfirm')} value={AppStore.model.confirmNewPassword} type={'password'} login onChange={(e: any) => {
                            ResetPasswordStore.editModel({confirmNewPassword: e.target.value})
                        }}/>
                        <Button label={t('recover')} onClick={() => {
                            ResetPasswordStore.forgotPassword().then();
                        }}/>

                        {ResetPasswordStore.status === "found" ? <div className="errorMassage">{t('mismatch')}</div>:null}
                        {ResetPasswordStore.status === "verify" ? <div className="verifyEmail">{t('needToVerify')}</div>:null}
                        {ResetPasswordStore.status === "techError" ? <div className="errorMassage">{t('techError')}</div>:null}
                        <a href="#/" onClick={() => navigate('/login')}>{t('loginTitle')}</a>
                    </aside>
                </section>
            </main>
        </>
    )
}

export default observer(ForgetPassword);