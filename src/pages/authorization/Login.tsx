import React from 'react';
import {store} from '../../store/store'
import Logo from '../../assets/icon/logo.svg'
import '../../style/loginPage.scss';

function Login() {
    return (
        <>
            <main className="bg_darker_blue full_screen centralized">
                <section className="bg_white loginBlock">
                    <img src={Logo}/>

                    <section>
                        <h2></h2>
                        <iframe frameBorder="0" width="100%" height="180"
                                src="https://music.yandex.ru/iframe/#track/111161321/24799113">Слушайте <a
                            href='https://music.yandex.ru/album/24799113/track/111161321'>Triple 6</a> — <a
                            href='https://music.yandex.ru/artist/13133796'>TopConniver</a> на Яндекс Музыке
                        </iframe>
                    </section>
                </section>
            </main>
        </>
    )
}

export default Login