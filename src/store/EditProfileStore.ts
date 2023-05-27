import {action, makeAutoObservable, runInAction} from 'mobx';
import React from 'react';
import axios from 'axios'
import AppStore from "./AppStore";

function getCookie(name: any) {
    const value = `; ${document.cookie}`;
    const parts: any = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

class EditProfileStore {
    model: any;
    positionList: any = [];
    rateList: any = ['1', '0.5', '0.25'];
    degreeList: any = [];
    departmentList: any = [];

    async updateUser() {
        AppStore.isLoading = true;
        return await axios.post('https://aitu-plan.herokuapp.com/user/update', {
            firstName: this.model.firstName,
            lastName: this.model.lastName,
            middleName: this.model.middleName,
            photo: this.model.fileBase64,
            rate: this.model.rate,
            position: this.model.position,
            degree: this.model.degree
        },{
            headers: {
                Authorization: getCookie('Authorization')
            }
        }).then((repos: any) => {
            AppStore.isLoading = false;
            if (repos.status === 200) {
                AppStore.getUser();
            }
        });
    }

    async updateUserDepartment() {
        AppStore.isLoading = true;
        return await axios.post('https://aitu-plan.herokuapp.com/department/transfer-teacher', this.model.department,{
            headers: {
                Authorization: getCookie('Authorization')
            }
        }).then((repos: any) => {
            AppStore.isLoading = false;
            if (repos.status === 200) {
                AppStore.getDepartmentByTeacher();
            }
        });
    }

    async getDepartmentList() {
        AppStore.isLoading = true;
        return await axios.get('https://aitu-plan.herokuapp.com/department/get-all',{
            headers: {
                Authorization: getCookie('Authorization')
            }
        }).then((repos: any) => {
            AppStore.isLoading = false;
            if (repos.status === 200) {
                this.departmentList = repos.data;
            }
        });
    }

    async getPositions() {
        AppStore.isLoading = true;
        return await axios.get('https://aitu-plan.herokuapp.com/user/getPositions',{
            headers: {
                Authorization: getCookie('Authorization')
            }
        }).then((repos: any) => {
            AppStore.isLoading = false;
            if (repos.status === 200) {
                this.positionList = repos.data;
            }
        });
    }

    async getDegrees() {
        AppStore.isLoading = true;
        return await axios.get('https://aitu-plan.herokuapp.com/user/getDegrees',{
            headers: {
                Authorization: getCookie('Authorization')
            }
        }).then((repos: any) => {
            AppStore.isLoading = false;
            if (repos.status === 200) {
                this.degreeList = repos.data;
            }
        });
    }

    editModel(obj: any) {
        this.model = {...this.model, ...obj};
    };

    constructor() {
        this.model = {
            fileBase64: null,
            fileName: null,
            position: null,
            rate: null,
            degree: null,
            department: null,
            lastName: null,
            firstName: null,
            middleName: null,
        }

        makeAutoObservable(this, {
            editModel: action.bound,
            updateUser: action.bound,
            getPositions: action.bound,
            getDegrees: action.bound,
            updateUserDepartment: action.bound,
        })
    }
}

export default new EditProfileStore() as EditProfileStore;