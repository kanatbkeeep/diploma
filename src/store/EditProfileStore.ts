import {action, makeAutoObservable, runInAction} from 'mobx';
import React from 'react';
import axios from 'axios'

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
    departmentList: any = [
        {nameRu: "Computer Engineering", nameKz: "Computer Engineering", nameEn: "Computer Engineering"},
        {nameRu: "Computer Engineering", nameKz: "Computer Engineering", nameEn: "Computer Engineering"},
    ]

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
                window.location.reload();
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
        })
    }
}

export default new EditProfileStore() as EditProfileStore;