import React from 'react';
import Logo from '../../assets/icon/logo.svg'
import '../../style/loginPage.scss';
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import AppStore from "../../store/AppStore";

function Login() {
    return (
        <>
            <main className="bg_darker_blue full_screen centralized">
                <section className="bg_white loginBlock">
                    <img className={'logo'} src={Logo} alt={'logo'}/>

                    <aside>
                        <h2>{'Log in'}</h2>
                        <Input label={'Email'} login onChange={(e: any) => {
                            AppStore.editModel({email: e.target.value});
                        }}/>
                        <Input label={'Password'} type={'password'} login onChange={(e: any) => {
                            AppStore.editModel({password: e.target.value})
                        }}/>
                        <Button label={'Log in'} onClick={() => {
                            AppStore.loadLogin()
                        }}/>
                        <a>{'Forgot password?'}</a>
                    </aside>
                </section>
            </main>
        </>
    )
}

export default Login