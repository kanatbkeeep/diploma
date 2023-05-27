import {action, makeAutoObservable, runInAction} from 'mobx';
import React from 'react';
import axios from 'axios'
import AppStore from "./AppStore";

function getCookie(name: any) {
    const value = `; ${document.cookie}`;
    const parts: any = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

class ApproveStore {
    model: any;

    editModel(obj: any) {
        this.model = {...this.model, ...obj};
    };

    nullifyModel() {
        this.model = {
            selectedPlan: null,
            parts: [],
            description: "",
        }
    };

    async sendApprove(byTeacher: boolean) {
        AppStore.isLoading = true;
        return await axios.post('http://aitu-plan.herokuapp.com/notification/send?planId=' + this.model.selectedPlan.id + '&byTeacher=' + byTeacher,
            {
                status: 'APPROVED'
            },
            {
            headers: {
                Authorization: getCookie('Authorization')
            },
        }).then((repos: any) => {
            AppStore.isLoading = false;
            if (repos.status === 200) {

            }
        });
    }

    async sendDenied(byTeacher: boolean) {
        AppStore.isLoading = true;
        return await axios.post('http://aitu-plan.herokuapp.com/notification/send?planId=' + this.model.selectedPlan.id + '&byTeacher=' + byTeacher,
            {
                status: 'DENIED',
                parts: this.model.parts,
                description: this.model.description,
            },
            {
                headers: {
                    Authorization: getCookie('Authorization')
                },
            }).then((repos: any) => {
            AppStore.isLoading = false;
            if (repos.status === 200) {

            }
        });
    }

    constructor() {
        this.model = {
            selectedPlan: null,
            parts: [],
            description: "",
        }

        makeAutoObservable(this, {
            editModel: action.bound,
            sendApprove: action.bound,
            nullifyModel: action.bound,
        })
    }
}

export default new ApproveStore() as ApproveStore;