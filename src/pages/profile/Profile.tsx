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
                </aside>
            </nav>
        </>
    )
}

export default Profile;