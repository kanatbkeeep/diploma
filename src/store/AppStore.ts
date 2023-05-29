import {action, makeAutoObservable, runInAction} from 'mobx';
import React from 'react';
import axios, {AxiosError} from 'axios'
import {url} from "../config/rest/common";

export function getCookie(name: any) {
    const value = `; ${document.cookie}`;
    const parts: any = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export let lg = getCookie("lang")?getCookie("lang"):getCookie('locale');

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
    statusRegistration: any;

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
        return await axios.post(`${url}/user/loginUser`, {
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

    async registrationUser() {
        this.isLoading = true;
        this.statusRegistration = null;
        return await axios.post(`${url}/user/register`,
            {
                firstName: this.model.firstName,
                lastName: this.model.middleName,
                middleName: this.model.lastName,
                email: this.model.email,
                password: this.model.password
            }).then((repos: any) => {
            this.isLoading = false;
            if (repos.status === 200) {
                this.statusRegistration = "verify";
                console.log(this.statusRegistration)
            }
        }).catch((reason: AxiosError)=>{
            this.isLoading = false;
            if (reason.response?.status === 400) {
                this.statusRegistration = "found";
                console.log(this.statusRegistration)
            }else{
                this.statusRegistration = "techError";
            }

        });
    }

    async getUser() {
        this.isLoading = true;
        return await axios.get(`${url}/user/getUser`, {
            headers: {
                Authorization: this.getCookie(`Authorization`)
            }
        }).then((repos: any) => {
            this.isLoading = false;
            if (repos.status === 200) {
                this.currentUser = repos.data;
                if (window.location.href.includes(`/login`)) window.location.replace(`/`);
            }
        });
    }

    async getDepartmentByTeacher() {
        this.isLoading = true;
        return await axios.get(`${url}/department/getByTeacher`, {
            headers: {
                Authorization: this.getCookie(`Authorization`)
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
        return await axios.get(`${url}/department/get-by-director`, {
            headers: {
                Authorization: this.getCookie(`Authorization`)
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
        return await axios.get(`${url}/plan/get-my-plans`, {
            headers: {
                Authorization: this.getCookie(`Authorization`)
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
        return await axios.get(`${url}/plan/get-plans-to-me-by-status`, {
            headers: {
                Authorization: this.getCookie(`Authorization`)
            },
            params: { status: `AWAITING` }
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
        return await axios.get(`${url}/plan/get-plans-to-me-by-status`, {
            headers: {
                Authorization: this.getCookie(`Authorization`)
            },
            params: { status: `APPROVED` }
        }).then((repos: any) => {
            this.isLoading = false;
            if (repos.status === 200) {
                this.myPlansToApprove = this.myPlansToApprove.concat(repos.data.reverse());
            }
        });
    }

    async createPlan() {
        this.isLoading = true;
        return await axios.post(`${url}/plan/create?idDirector=${this.department.director.id}`, {},{
            headers: {
                Authorization: this.getCookie(`Authorization`)
            }
        }).then((repos: any) => {
            this.isLoading = false;
        });
    }

    async copyPlan() {
        this.isLoading = true;
        return await axios.post(`${url}/plan/create?idDirector=${this.department.director.id}`, this.model.selectedPlan,{
            headers: {
                Authorization: this.getCookie(`Authorization`)
            }
        }).then((repos: any) => {
            this.isLoading = false;
        });
    }

    async deletePlan(items: any) {
        this.isLoading = true;
        return await axios.post(`${url}/plan/delete`, {items: items},{
            headers: {
                Authorization: this.getCookie(`Authorization`)
            }
        }).then((repos: any) => {
            this.isLoading = false;
        });
    }

    getCookie(name: any) {
        const value = `; ${document.cookie}`;
        const parts: any = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(`;`).shift();
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
            firstName:null,
            lastName:null,
            middleName:null,
        }

        this.currentUser = null;
        this.department = null;
        this.statusRegistration = null;

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
            registrationUser: action.bound,
        })
    }
}

export default new AppStore() as AppStore;