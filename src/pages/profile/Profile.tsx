import React, {useCallback, useState} from 'react';
import Logo from '../../assets/icon/logoSmall.svg'
import '../../style/profilePage.scss';
import iconHouse from '../../assets/icon/house.svg'
import iconBell from '../../assets/icon/bell.svg'
import iconLogout from '../../assets/icon/logout.svg'
import Button from "../../components/Button/Button";
import Table from "../../components/Table/Table";
import Navigation from "../../components/Notification/Notification";

function Profile() {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const handleModalStateChanged = useCallback((state: boolean) => {
        setModalOpen(state);
    }, []);

    const arr = Array.from({ length: 40 }, (_, i) => ({
        id:i,
        firstname: `Firstname${i}`,
        lastname: "Myrzasary",
        middlename: "Timurylu",
        age: 20,
    }));

    return (
        <>
            <main className={modalOpen ? 'darker': ''}>
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
                            onClick={() => {
                                setModalOpen(true);
                            }}
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

                <section className="tableProfile">
                    <Table
                        array={arr}
                        rowsPerPage={4}
                        maxWidthTable={1000}
                        maxWidthColumns={[200, 200, 200, 200]}
                        haveDelete={true}
                        onDelete={()=>{
                            console.log("deleted");
                        }}
                        renderHead={(maxWidthColumns) => {
                            return <div>
                                <div style={{maxWidth:50}}></div>
                                <div style={{maxWidth: maxWidthColumns[0]}}>Имя</div>
                                <div style={{maxWidth: maxWidthColumns[1]}}>Фамилия</div>
                                <div style={{maxWidth: maxWidthColumns[2]}}>Отчество</div>
                                <div style={{maxWidth: maxWidthColumns[3]}}>Возраст</div>
                            </div>
                        }}
                        renderBody={(item, index, maxWidthColumns, checkbox) => {
                            return (
                                <div key={index}>
                                    <div style={checkbox ? {maxWidth:50} : {}}>{checkbox}</div>
                                    <div style={{maxWidth: maxWidthColumns[0]}}>{item.firstname}</div>
                                    <div style={{maxWidth: maxWidthColumns[1]}}>{item.lastname}</div>
                                    <div style={{maxWidth: maxWidthColumns[2]}}>{item.middlename}</div>
                                    <div style={{maxWidth: maxWidthColumns[3]}}>{item.age}</div>
                                </div>
                            );
                        }}
                     search={true}/>
                </section>
            </main>

            <Navigation open={modalOpen} onModalStateChanged={handleModalStateChanged}/>
        </>
    )
}

export default Profile;