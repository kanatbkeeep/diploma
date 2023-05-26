import {action, makeAutoObservable, runInAction} from 'mobx';
import React from 'react';
import axios, {AxiosError} from 'axios'

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
    incorrect: boolean = false;
    model: any;
    lang: any = lg ? lg: "ru";
    langs: any = ["ru", "kz", "en"];
    isLoading: any = false;

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
        this.isLoading = true;
        return await axios.post('http://localhost:8080/user/loginUser', {
            email: this.model.email,
            password: this.model.password
        }).then((repos: any) => {
            this.isLoading = false;
            if (repos.status === 200) {
                document.cookie = "Authorization=" + repos.data;
                this.getUser();
            }
        }).catch((reason: AxiosError) => {
            this.isLoading = false;
            if (reason.response!.status === 400) {
                this.incorrect = true;
            }
            console.log(reason.message)
        });

    }

    async getUser() {
        this.isLoading = true;
        return await axios.get('http://localhost:8080/user/getUser', {
            headers: {
                Authorization: this.getCookie('Authorization')
            }
        }).then((repos: any) => {
            this.isLoading = false;
            if (repos.status === 200) {
                this.currentUser = repos.data;
                if (window.location.href.includes('/login')) window.location.replace('/');
            }
        });
    }

    async getDepartmentByTeacher() {
        this.isLoading = true;
        return await axios.get('http://localhost:8080/department/getByTeacher', {
            headers: {
                Authorization: this.getCookie('Authorization')
            }
        }).then((repos: any) => {
            this.isLoading = false;
            if (repos.status === 200) {
                this.department = repos.data;
            }
        });
    }

    async getDepartmentByDirector() {
        this.isLoading = true;
        return await axios.get('http://localhost:8080/department/get-by-director', {
            headers: {
                Authorization: this.getCookie('Authorization')
            }
        }).then((repos: any) => {
            this.isLoading = false;
            if (repos.status === 200) {
                this.department = repos.data;
            }
        });
    }

    async getMyPlans() {
        this.isLoading = true;
        return await axios.get('http://localhost:8080/plan/get-my-plans', {
            headers: {
                Authorization: this.getCookie('Authorization')
            }
        }).then((repos: any) => {
            this.isLoading = false;
            if (repos.status === 200) {
                this.myPlans = repos.data.reverse();
            }
        });
    }

    async getMyPlansToApproveAwaiting() {
        this.isLoading = true;
        return await axios.get('http://localhost:8080/plan/get-plans-to-me-by-status', {
            headers: {
                Authorization: this.getCookie('Authorization')
            },
            params: { status: 'AWAITING' }
        }).then((repos: any) => {
            this.isLoading = false;
            if (repos.status === 200) {
                this.myPlansToApprove = repos.data.reverse();
                this.getMyPlansToApproveApproved();
            }
        });
    }

    async getMyPlansToApproveApproved() {
        this.isLoading = true;
        return await axios.get('http://localhost:8080/plan/get-plans-to-me-by-status', {
            headers: {
                Authorization: this.getCookie('Authorization')
            },
            params: { status: 'APPROVED' }
        }).then((repos: any) => {
            this.isLoading = false;
            if (repos.status === 200) {
                this.myPlansToApprove = this.myPlansToApprove.concat(repos.data.reverse());
            }
        });
    }

    async createPlan() {
        this.isLoading = true;
        return await axios.post(`http://localhost:8080/plan/create?idDirector=${this.department.director.id}`, {},{
            headers: {
                Authorization: this.getCookie('Authorization')
            }
        }).then((repos: any) => {
            this.isLoading = false;
        });
    }

    async copyPlan() {
        this.isLoading = true;
        return await axios.post(`http://localhost:8080/plan/create?idDirector=${this.department.director.id}`, this.model.selectedPlan,{
            headers: {
                Authorization: this.getCookie('Authorization')
            }
        }).then((repos: any) => {
            this.isLoading = false;
        });
    }

    async deletePlan(items: any) {
        this.isLoading = true;
        return await axios.post(`http://localhost:8080/plan/delete`, {items: items},{
            headers: {
                Authorization: this.getCookie('Authorization')
            }
        }).then((repos: any) => {
            this.isLoading = false;
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