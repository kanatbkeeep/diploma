import React, {useEffect} from "react";
import {observer} from 'mobx-react';
import t from "../../utils/Lang";
import CrossWhite from "../../assets/icon/crossWhite.svg";
import TickWhite from "../../assets/icon/tickWhite.svg";
import Button from "../Button/Button";
import AppStore from "../../store/AppStore";
import ApproveStore from "../../store/ApproveStore";

const Approve = (props: any) => {
    useEffect(() => {

    }, [props.open]);

    return (props.open &&
        <div className={'approve'}>
            <div className="approveBlock">
                <p>{t('doYouWant')} <span style={{color: "#003459"}}>{t('approve')}</span> <br/> <span style={{color: "#007EA7"}}>{ApproveStore.model.selectedPlan.createdBy.firstName + ' ' + ApproveStore.model.selectedPlan.createdBy.lastName + ' ' + ApproveStore.model.selectedPlan.createdBy.middleName} <br/> </span> {t('individualPlan')}?</p>
                <div>
                    <Button
                        icon={TickWhite}
                        type={'smallBlue'}
                        onClick={() => {
                            ApproveStore.sendApprove(false).then(() => {
                                AppStore.getMyPlansToApproveAwaiting();
                                props.onModalStateChanged(false);
                                ApproveStore.editModel({selectedPlan: null});
                            });
                        }}
                    />
                    <Button
                        icon={CrossWhite}
                        type={'smallRed'}
                        onClick={() => {
                            props.onModalStateChanged(false);
                            ApproveStore.editModel({selectedPlan: null});
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default observer(Approve);