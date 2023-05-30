import React, {FC, useEffect, useRef, useState} from "react";
import Cross from "../../assets/icon/cross.svg"
import CrossIcon from "../../assets/icon/notification/cross.svg"
import TickIcon from "../../assets/icon/notification/tick.svg"
import SendIcon from "../../assets/icon/notification/send.svg"
import NotificationStore from "../../store/NotificationStore";
import t from "../../utils/Lang";

interface Props {
    open?: boolean;
    onModalStateChanged?: (opened: boolean) => void;
}

const Notification: FC<Props> = ({open, onModalStateChanged}) => {
    const [opened, setOpened]: any = useState(!!open);
    const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        onModalStateChanged?.(opened);
    }, [onModalStateChanged, opened]);

    useEffect(() => {
        setOpened(!!open);
    }, [open]);

    return (
        <>
            <div ref={boxRef} className={opened ? 'notification' : 'notification notificationClosed'}>
                <div onClick={() => setOpened(false)}><img src={Cross} alt={'cross'}/></div>
                {NotificationStore.notifications?.map((notification: any) => {
                    return <>
                        <div className="notificationItem mt-20">
                            {notification.status === 'APPROVED' ? <img src={TickIcon} alt={'tick'}/>
                                : notification.status === 'DENIED' ?
                                    <img src={CrossIcon} alt={'cross'}/>
                                    : notification.status === 'AWAITING' ?
                                        <img src={SendIcon} alt={'send'}/> : null}
                            <div className='notificationData'>
                                {notification.status === 'APPROVED' ?
                                    <h5>{t('approvedNotificationPart1') + notification.planName + t('approvedNotificationPart2')}</h5>
                                    : notification.status === 'DENIED' ?
                                        <h5>{t('revisionNotificationPart1') + notification.planName + t('revisionNotificationPart2')}</h5>
                                        : notification.status === 'AWAITING' ?
                                            <h5>{t('sentNotificationPart1') + notification.planName + t('sentNotificationPart2') + notification.sendTo.firstName + ' ' + notification.sendTo.lastName + ' ' + notification.sendTo.middleName}</h5> : null}
                                <span>{notification.sendBy.firstName + ' ' + notification.sendBy.lastName + ' ' + notification.sendBy.middleName}</span>
                                {notification?.parts.length > 0 ? <>
                                    <p>{t('partToImprove')+'\n'}</p>
                                    {notification.parts.map((part: string) => {
                                        return <>
                                            <p className='redText'>{'• ' + part}</p>
                                        </>
                                    })}
                                    <p>{t('comments') +':\n'}</p>
                                    <p className='commentData'>
                                        {notification.description}
                                    </p>
                                </> : null}
                            </div>
                        </div>
                    </>
                })}
                <div style={{marginTop: '20px'}}>
                    <p className='noMoreNotifications'>{t('noMoreNotifications')}</p>
                </div>
            </div>
        </>
    )
}

export default Notification;