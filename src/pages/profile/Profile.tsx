import React from 'react';
import Logo from '../../assets/icon/logoSmall.svg'
import '../../style/profilePage.scss';
import iconHouse from '../../assets/icon/house.svg'
import iconBell from '../../assets/icon/bell.svg'
import iconLogout from '../../assets/icon/logout.svg'
import Button from "../../components/Button/Button";

function Profile() {
    return (
        <>
            <nav>
                <aside>
                    <img alt={'logo'} src={Logo}/>
                </aside>

                <aside>
                    <Button
                        label={'Home'}
                        type={'secondaryButton'}
                        icon={iconHouse}
                    />

                    <Button
                        label={'Notifications'}
                        type={'secondaryButton'}
                        icon={iconBell}
                    />

                    <Button
                        label={'Log out'}
                        type={'primaryButton'}
                        icon={iconLogout}
                    />
                </aside>
            </nav>

            <main>
                <section className={'userInfo mt-38'}>
                    <aside className={'userAvatar'}></aside>
                    <aside className={'userData'}>
                        <h2>{'Berkinbayev Kanat Galymuly'}</h2>
                        <div className="column">
                            <h4 className="mt-24">{'Position'}</h4>
                            <span>{'Associate Professor'}</span>
                            <h4 className="mt-24">{'Degree'}</h4>
                            <span>{'Research'}</span>
                            <div className="row mt-24">
                                <div  className="column mr-58">
                                    <h4>{'Department'}</h4>
                                    <span>{'Computer Engineering'}</span>
                                </div>
                                <div  className="column">
                                    <h4>{'Director of the Department'}</h4>
                                    <span>{'Assel Smayil'}</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </section>
                <div className="line mt-42"/>
                <section>

                </section>
            </main>
        </>
    )
}

export default Profile;