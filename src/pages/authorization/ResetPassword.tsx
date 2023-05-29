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

function ResetPassword() {
    const navigate = useNavigate();
    return (
        <>
            <main className="bg_darker_blue full_screen centralized">
                <section className="bg_white loginBlock">
                    <img className={'logo'} src={Logo} alt={'logo'}/>

                    <aside>
                        <h2>{t('forgotPassword')}</h2>
                        <Input label={t('oldPassword')} value={AppStore.model.oldPassword} type={'password'} login onChange={(e: any) => {
                            ResetPasswordStore.editModel({oldPassword: e.target.value})
                        }}/>
                        <Input label={t('newPassword')} value={AppStore.model.newPassword} type={'password'} login onChange={(e: any) => {
                            ResetPasswordStore.editModel({newPassword: e.target.value})
                        }}/>
                        <Input label={t('newPasswordConfirm')} value={AppStore.model.confirmNewPassword} type={'password'} login onChange={(e: any) => {
                            ResetPasswordStore.editModel({confirmNewPassword: e.target.value})
                        }}/>
                        <Button label={t('recover')} onClick={() => {
                            ResetPasswordStore.resetPassword()
                        }}/>

                        {ResetPasswordStore.status === "found" ? <div className="errorMassage">{t('mismatchPassword')}</div>:null}
                        {ResetPasswordStore.status === "verify" ? <div className="verifyEmail">{t('passwordWasReset')}</div>:null}
                        {ResetPasswordStore.status === "techError" ? <div className="errorMassage">{t('techError')}</div>:null}
                        <a onClick={() => navigate('/')}>{t('home')}</a>
                    </aside>
                </section>
            </main>
        </>
    )
}

export default observer(ResetPassword);