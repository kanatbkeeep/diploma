import React, {useEffect} from 'react';
import Logo from '../../assets/icon/logo.svg'
import '../../style/loginPage.scss';
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import AppStore from "../../store/AppStore";
import t from "../../utils/Lang";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react";

function Login() {
    const navigate = useNavigate();
    useEffect(() => {
        document.title = 'Login';
    }, []);
    return (
        <>
            <main className="bg_darker_blue full_screen centralized">
                <section className="bg_white loginBlock">
                    <img className={'logo'} src={Logo} alt={'logo'}/>

                    <aside>
                        <h2>{t('loginTitle')}</h2>
                        <Input label={'Email'} value={AppStore.model.email} login onChange={(e: any) => {
                            AppStore.editModel({email: e.target.value});
                        }}/>
                        <Input label={t('password')} value={AppStore.model.password} type={'password'} login onChange={(e: any) => {
                            AppStore.editModel({password: e.target.value})
                        }}/>
                        <Button label={t('loginTitle')} onClick={() => {
                            AppStore.loadLogin().then();
                        }}/>
                        {AppStore.incorrect ? <p className='errorMassage'>{t('incorrect')}</p> : null}
                        <a href="#/" onClick={() => navigate('/registration')}>{t('registrationTitle')}</a>
                        <a href="#/" onClick={() => navigate('/forget')}>{t('forgotPassword')}</a>
                    </aside>
                </section>
            </main>
        </>
    )
}

export default observer(Login);