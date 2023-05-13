import {action, makeAutoObservable, runInAction} from 'mobx';
import React from 'react';
import axios from 'axios'

function getCookie(name: any) {
    const value = `; ${document.cookie}`;
    const parts: any = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

let lg = getCookie('lang')?getCookie('lang'):getCookie('locale');

class AppStore {
    currentUser: any;
    department: any;
    myPlans: any;
    myPlansToApprove: any;
    model: any;
    lang: any = lg ? lg: "ru";
    langs: any = ["ru", "kz", "en"];

    isTeacher() {
        for (let i = 0; i < this.currentUser.roles.length; i++) {
            if (this.currentUser.roles[i].roleName === "TEACHER") return true;
        }
        return false;
    }

    isDirector() {
        for (let i = 0; i < this.currentUser.roles.length; i++) {
            if (this.currentUser.roles[i].roleName === "DIRECTOR") return true;
        }
        return false;
    }

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

    async getDepartmentByDirector() {
        return await axios.get('http://localhost:8080/department/get-by-director', {
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
                this.myPlans = repos.data.reverse();
            }
        });
    }

    async getMyPlansToApproveAwaiting() {
        return await axios.get('http://localhost:8080/plan/get-plans-to-me-by-status', {
            headers: {
                Authorization: this.getCookie('Authorization')
            },
            params: { status: 'AWAITING' }
        }).then((repos: any) => {
            if (repos.status === 200) {
                this.myPlansToApprove = repos.data.reverse();
                this.getMyPlansToApproveApproved();
            }
        });
    }

    async getMyPlansToApproveApproved() {
        return await axios.get('http://localhost:8080/plan/get-plans-to-me-by-status', {
            headers: {
                Authorization: this.getCookie('Authorization')
            },
            params: { status: 'APPROVED' }
        }).then((repos: any) => {
            if (repos.status === 200) {
                this.myPlansToApprove = this.myPlansToApprove.concat(repos.data.reverse());
            }
        });
    }

    async createPlan() {
        return await axios.post(`http://localhost:8080/plan/create?idDirector=${this.department.director.id}`, {},{
            headers: {
                Authorization: this.getCookie('Authorization')
            }
        }).then((repos: any) => {
        });
    }

    async copyPlan() {
        return await axios.post(`http://localhost:8080/plan/create?idDirector=${this.department.director.id}`, this.model.selectedPlan,{
            headers: {
                Authorization: this.getCookie('Authorization')
            }
        }).then((repos: any) => {
        });
    }

    async deletePlan(items: any) {
        return await axios.post(`http://localhost:8080/plan/delete`, {items: items},{
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
            selectedPlan: null,
            showMyPlans: false,
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
            deletePlan: action.bound,
            isTeacher: action,
            getMyPlansToApproveAwaiting: action,
            getMyPlansToApproveApproved: action,
            isDirector: action,
        })
    }
}

export default new AppStore() as AppStore;