import React, {useState} from "react";
import {observer} from 'mobx-react';
import t from "../../utils/Lang";
import Dropdown from "../Dropdown/Dropdown";
import Button from "../Button/Button";
import AppStore from "../../store/AppStore";
import Logo from "../../assets/icon/logoSmall.svg";
import iconHouse from "../../assets/icon/house.svg";
import iconBell from "../../assets/icon/bell.svg";
import iconLogout from "../../assets/icon/logout.svg";

const Navigation = (props: any) => {
    const [open, setOpen] = useState("");

    function eraseCookie(name: any) {
        document.cookie = name + '=; Max-Age=-99999999;';
    }

    return (
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
                    maxWidth={50}
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
                                           window.location.reload();
                                       }}>
                                {item}
                            </li>
                        })}
                    </ul>
                </Dropdown>

                <Button
                    label={t('home')}
                    type={'secondaryButton'}
                    icon={iconHouse}
                />

                <Button
                    onClick={() => {
                        props.onModalStateChanged(true);
                    }}
                    label={t('notifications')}
                    type={'secondaryButton'}
                    icon={iconBell}
                />

                <Button
                    label={t('logOut')}
                    type={'primaryButton'}
                    icon={iconLogout}
                    onClick={() => {
                        eraseCookie('Authorization');
                        window.location.reload();
                    }}
                />
            </aside>
        </nav>
    )
}

export default observer(Navigation);
