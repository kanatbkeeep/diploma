import {action, makeAutoObservable, runInAction} from 'mobx';
import React from 'react';
import axios from "axios";
import {
    ADD_ACADEMIC_METHOD,
    ADD_ACADEMIC_WORK, DELETE_ACADEMIC_METHOD, DELETE_ACADEMIC_WORK, EDIT_ACADEMIC_METHOD, EDIT_ACADEMIC_WORK,
    GET_LATEST_PLAN
} from "../config/rest/creationPlanRest";

class CreationPlanStore {

    step1: any;
    step2: any;
    step3: any;
    academWorks: any;
    eduMethWorks: any;
    researchWorks: any;
    plan: any;

    editStep1Modal(obj: any) {
        this.step1 = {...this.step1, ...obj};
    };

    editStep2Modal(obj: any) {
        this.step2 = {...this.step2, ...obj};
    };

    editStep3Modal(obj: any) {
        this.step3 = {...this.step3, ...obj};
    };

    courses = [
        {id: 1, name: "1"},
        {id: 2, name: "2"},
        {id: 3, name: "3"},
    ];

    trimesters = [
        {id: 1, name: "1"},
        {id: 2, name: "2"},
        {id: 3, name: "3"},
    ];

    groups = [
        {id: 1, name: "SE-2014"},
        {id: 2, name: "IT-2002"},
        {id: 3, name: "SE-2015"},
        {id: 4, name: "SE-2013"},
        {id: 5, name: "SE-2012"},
        {id: 6, name: "SE-2011"}
    ];

    disciplines = [
        {id: 1, name: "Java programming"},
        {id: 2, name: "C++ programming"},
        {id: 3, name: "C# programming"},
        {id: 4, name: "Python programming"},
        {id: 5, name: "Web programming"},
        {id: 6, name: "Machine learning"}
    ];

    infoImplementation = [
        {id: 1, name: "Online"},
        {id: 2, name: "Offline"}
    ]

    typeWork = [
        {id: 1, name: "Preparation of an Article"},
        {id: 2, name: "Participation in a Conference"},
        {id: 3, name: "Scientific guidance"},
        {id: 4, name: "Other"},
    ];

    getCookie(name: any) {
        const value = `; ${document.cookie}`;
        const parts: any = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }


    async getPlan() {
        return await axios.get(GET_LATEST_PLAN, {
            headers: {
                Authorization: this.getCookie('Authorization')
            }
        }).then((repos: any) => {
            if (repos.status === 200) {
                this.plan = repos.data;
                this.academWorks = repos.data.academicWorks;
                this.eduMethWorks = repos.data.academicMethods;
            }
        });
    }

    async saveAcademicWork() {
        return await axios.post(ADD_ACADEMIC_WORK,
            {
                idPlan: this.plan.id,
                ...this.step1
            },
            {
                headers: {
                    Authorization: this.getCookie('Authorization')
                }
            }).then((repos: any) => {
            if (repos.status === 201) {
                window.location.reload();
            }
        });
    }

    async saveAcademicMethod() {
        return await axios.post(ADD_ACADEMIC_METHOD,
            {
                idPlan: this.plan.id,
                ...this.step2
            },
            {
                headers: {
                    Authorization: this.getCookie('Authorization')
                }
            }).then((repos: any) => {
            if (repos.status === 201) {
                window.location.reload();
            }
        });
    }

    async updateAcademicWork(item:any) {
        return await axios.post(EDIT_ACADEMIC_WORK,
            {
                ...item,
            },
            {
                headers: {
                    Authorization: this.getCookie('Authorization')
                }
            }).then((repos: any) => {
            if (repos.status === 200) {
                window.location.reload();
            }
        });
    }

    async updateAcademicMethod(item:any) {
        return await axios.post(EDIT_ACADEMIC_METHOD,
            {
                ...item,
            },
            {
                headers: {
                    Authorization: this.getCookie('Authorization')
                }
            }).then((repos: any) => {
            if (repos.status === 200) {
                window.location.reload();
            }
        });
    }

    async deleteAcademicWorks(itemsToDelete:any[]) {
        return await axios.post(DELETE_ACADEMIC_WORK,
            {
                items: itemsToDelete
            },
            {
                headers: {
                    Authorization: this.getCookie('Authorization')
                }
            }).then((repos: any) => {
            if (repos.status === 200) {
                window.location.reload();
            }
        });
    }

    async deleteAcademicMethods(itemsToDelete:any[]) {
        return await axios.post(DELETE_ACADEMIC_METHOD,
            {
                items: itemsToDelete
            },
            {
                headers: {
                    Authorization: this.getCookie('Authorization')
                }
            }).then((repos: any) => {
            if (repos.status === 200) {
                window.location.reload();
            }
        });
    }


    constructor() {

        this.step1 = {
            nameOfDiscipline: "",
            course: "",
            trimester: "",
            groups: "",
            lecturesPlan: "",
            lecturesFact: "",
            practicesPlan: "",
            practicesFact: "",
            hoursPlan: "",
            hoursFact: "",
            totalPlan: "",
            totalFact: "",
        }

        this.step2 = {
            discipline: "",
            nameWork: "",
            deadlines: "",
            infoImplementation: "",
            comment: "",
        }

        this.step3 = {
            typeWork: null,
            journal: "",
            deadline: "",
            article: "",
            infoImplementation: null,
            comment: "",
        }

        this.eduMethWorks = [];
        this.academWorks = [];
        this.researchWorks = [];
        this.plan = null;


        makeAutoObservable(this, {
            editStep1Modal: action,
            editStep2Modal: action.bound,
            editStep3Modal: action.bound,
            getPlan: action.bound,
            saveAcademicWork: action.bound,
            updateAcademicWork: action.bound,
            deleteAcademicWorks: action.bound,
            saveAcademicMethod: action.bound,
            updateAcademicMethod: action.bound,
            deleteAcademicMethods: action.bound,
        },)
    }

}

export default new CreationPlanStore() as CreationPlanStore;