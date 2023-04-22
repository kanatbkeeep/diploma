import React from 'react';
import Logo from '../../assets/icon/logo.svg'
import '../../style/loginPage.scss';
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

function Login() {
    return (
        <>
            <main className="bg_darker_blue full_screen centralized">
                <section className="bg_white loginBlock">
                    <img className={'logo'} src={Logo} alt={'logo'}/>

                    <aside>
                        <h2>{'Log in'}</h2>
                        <Input label={'Email'}/>
                        <Input label={'Password'} type={'password'}/>
                        <Button label={'Log in'}/>
                        <a>{'Forgot password?'}</a>
                    </aside>
                </section>
            </main>
        </>
    )
}

export default Login