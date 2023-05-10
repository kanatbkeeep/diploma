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
        return await axios.post('http://localhost:8080/user/update', {
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
            if (repos.status === 200) {
                AppStore.getUser();
            }
        });
    }

    async updateUserDepartment() {
        return await axios.post('http://localhost:8080/department/transfer-teacher', this.model.department,{
            headers: {
                Authorization: getCookie('Authorization')
            }
        }).then((repos: any) => {
            if (repos.status === 200) {
                AppStore.getDepartmentByTeacher();
            }
        });
    }

    async getDepartmentList() {
        return await axios.get('http://localhost:8080/department/get-all',{
            headers: {
                Authorization: getCookie('Authorization')
            }
        }).then((repos: any) => {
            if (repos.status === 200) {
                this.departmentList = repos.data;
            }
        });
    }

    async getPositions() {
        return await axios.get('http://localhost:8080/user/getPositions',{
            headers: {
                Authorization: getCookie('Authorization')
            }
        }).then((repos: any) => {
            if (repos.status === 200) {
                this.positionList = repos.data;
            }
        });
    }

    async getDegrees() {
        return await axios.get('http://localhost:8080/user/getDegrees',{
            headers: {
                Authorization: getCookie('Authorization')
            }
        }).then((repos: any) => {
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