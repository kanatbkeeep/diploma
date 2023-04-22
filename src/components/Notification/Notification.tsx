import React, {FC, useEffect, useMemo, useRef, useState} from "react";
import Cross from "../../assets/icon/cross.svg"
import CrossIcon from "../../assets/icon/notification/cross.svg"
import TickIcon from "../../assets/icon/notification/tick.svg"
import SendIcon from "../../assets/icon/notification/send.svg"

interface Props {
    open?: boolean;
    onModalStateChanged?: (opened: boolean) => void;
}

const Notification: FC<Props> = ({open, onModalStateChanged}) => {
    const [opened, setOpened]: any = useState(!!open);
    const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.onclick = (event: MouseEvent) => {
            const target = event.target as HTMLDivElement
                | HTMLInputElement
                | HTMLParagraphElement
                | HTMLButtonElement
                | HTMLHeadingElement;

            if (!target?.contains(boxRef.current) && target !== boxRef.current) {
                setOpened(false);
            }
        }
    }, []);

    useEffect(() => {
        onModalStateChanged?.(opened);
    }, [opened]);

    useEffect(() => {
        setOpened(!!open);
    }, [open]);

    let notificationList = [
        {
            status: 'SIGNED',
            text: 'The plan of 2020-2021 academic year has been signed',
            byWho: 'Assel Smayil'
        },
        {
            status: 'RETURNED',
            text: 'The plan of 2021-2022 academic year has been returned for revision',
            byWho: 'Assel Smayil',
            reason: ['Academic work', 'Research work'],
            comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed tortor semper, venenatis ipsum a, faucibus ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
        },
        {
            status: 'SENT',
            text: 'The plan of 2022-2023 academic year has been sent to Assel Smayil',
            byWho: 'Assel Smayil'
        }
    ];

    return (
        <>
            <div ref={boxRef} className={opened ? 'notification' : 'notification notificationClosed'}>
                <div onClick={() => setOpened(false)}><img src={Cross} alt={'cross'}/></div>
                {notificationList?.map((notification: any) => {
                    return <>
                        <div className="notificationItem mt-20">
                            {notification.status == 'SIGNED' ? <img src={TickIcon} alt={'tick'}/>
                                : notification.status == 'RETURNED' ?
                                    <img src={CrossIcon} alt={'cross'}/>
                                    : notification.status == 'SENT' ?
                                        <img src={SendIcon} alt={'send'}/> : null}
                            <div className='notificationData'>
                                <h5>{notification.text}</h5>
                                <span>{notification.byWho}</span>
                                {notification?.reason ? <>
                                    <p>{'Part to improve:\n'}</p>
                                    {notification.reason.map((part: string) => {
                                        return <>
                                            <p className='redText'>{'• ' + part}</p>
                                        </>
                                    })}
                                    <p>{'Comment:\n'}</p>
                                    <p className='commentData'>
                                        {notification.comment}
                                    </p>
                                </> : null}
                            </div>
                        </div>
                    </>
                })}
            </div>
        </>
    )
}

export default Notification;