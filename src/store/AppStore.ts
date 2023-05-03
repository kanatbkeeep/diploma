import {action, makeAutoObservable, runInAction} from 'mobx';
import React from 'react';
import axios from 'axios'

class AppStore {
    currentUser: any;
    department: any;
    myPlans: any;
    model: any;

    async loadLogin() {
        return await axios.post('http://localhost:8080/user/loginUser', {
            email: this.model.email,
            password: this.model.password
        }).then((repos: any) => {
            if (repos.status === 200) {
                document.cookie = "Authorization=" + repos.data;
                this.getUser();
            }
        });

    }

    async getUser() {
        return await axios.get('http://localhost:8080/user/getUser', {
            headers: {
                Authorization: this.getCookie('Authorization')
            }
        }).then((repos: any) => {
            if (repos.status === 200) {
                this.currentUser = repos.data;
                console.log(this.currentUser);
                if (window.location.href.includes('/login')) window.location.replace('/');
            }
        });
    }

    async getDepartmentByTeacher() {
        return await axios.get('http://localhost:8080/department/getByTeacher', {
            headers: {
                Authorization: this.getCookie('Authorization')
            }
        }).then((repos: any) => {
            if (repos.status === 200) {
                this.department = repos.data;
            }
        });
    }

    async getMyPlans() {
        return await axios.get('http://localhost:8080/plan/get-my-plans', {
            headers: {
                Authorization: this.getCookie('Authorization')
            }
        }).then((repos: any) => {
            if (repos.status === 200) {
                this.myPlans = repos.data;
            }
        });
    }

    async createPlan() {
        return await axios.post('http://localhost:8080/plan/create', {},{
            headers: {
                Authorization: this.getCookie('Authorization')
            }
        }).then((repos: any) => {
        });
    }

    getCookie(name: any) {
        const value = `; ${document.cookie}`;
        const parts: any = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    editModel(obj: any) {
        this.model = {...this.model, ...obj};
    };

    constructor() {
        this.model = {
            email: null,
            password: null,
        }

        this.currentUser = null;
        this.department = null;

        makeAutoObservable(this, {
            editModel: action.bound,
            loadLogin: action.bound,
            getUser: action.bound,
            getCookie: action.bound,
            getDepartmentByTeacher: action.bound,
            getMyPlans: action.bound,
            createPlan: action.bound,
        })
    }
}

export default new AppStore() as AppStore;