import React, {useEffect} from 'react';
import Logo from '../../assets/icon/logo.svg'
import '../../style/loginPage.scss';
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import CurrentUserStore from "../../store/CurrentUserStore";

function Login() {
    useEffect(() => {

    }, [])

    return (
        <>
            <main className="bg_darker_blue full_screen centralized">
                <section className="bg_white loginBlock">
                    <img className={'logo'} src={Logo} alt={'logo'}/>

                    <aside>
                        <h2>{'Log in'}</h2>
                        <Input label={'Email'} onChange={(e: any) => {
                            CurrentUserStore.editModel({email: e.target.value});
                            console.log(e.target.value)
                        }}/>
                        <Input label={'Password'} type={'password'} onChange={(e: any) => {
                            CurrentUserStore.editModel({password: e.target.value})
                        }}/>
                        <Button label={'Log in'} onClick={() => {
                            CurrentUserStore.loadLogin()
                        }}/>
                        <a>{'Forgot password?'}</a>
                    </aside>
                </section>
            </main>
        </>
    )
}

export default Login