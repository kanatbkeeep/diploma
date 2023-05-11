import {action, makeAutoObservable, runInAction} from 'mobx';
import React from 'react';
import axios from "axios";
import {
    ADD_ACADEMIC_METHOD,
    ADD_ACADEMIC_WORK,
    ADD_EDUCATION_WORK, ADD_RESEARCH_WORK, ADD_SOCIAL_WORK, CHANGE_YEAR_PLAN,
    DELETE_ACADEMIC_METHOD,
    DELETE_ACADEMIC_WORK, DELETE_EDUCATION_WORK, DELETE_RESEARCH_WORK, DELETE_SOCIAL_WORK,
    EDIT_ACADEMIC_METHOD,
    EDIT_ACADEMIC_WORK, EDIT_EDUCATION_WORK, EDIT_RESEARCH_WORK, EDIT_SOCIAL_WORK,
    GET_LATEST_PLAN, GET_PLAN_BY_ID
} from "../config/rest/creationPlanRest";

class CreationPlanStore {

    step1: any;
    step2: any;
    step3: any;
    step4: any;
    step5: any;
    years: any;
    academWorks: any;
    eduMethWorks: any;
    researchWorks: any;
    kpiWorks: any;
    eduWorks: any;
    socialWorks: any;
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

    editStep4Modal(obj: any) {
        this.step4 = {...this.step4, ...obj};
    };

    editStep5Modal(obj: any) {
        this.step5 = {...this.step5, ...obj};
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
        {id: 2, name: "Offline"},
        {id: 2, name: "Other"},
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


    async getPlan(id: any = null) {
        this.years = "";
        if(id !== null){
            return await axios.get(GET_PLAN_BY_ID(id), {
                headers: {
                    Authorization: this.getCookie('Authorization')
                }
            }).then((repos: any) => {
                if (repos.status === 200) {
                    this.plan = repos.data;
                    this.academWorks = repos.data.academicWorks;
                    this.eduMethWorks = repos.data.academicMethods;
                    this.eduWorks = repos.data.educationalWorks;
                    this.socialWorks = repos.data.socialWorks;
                    this.kpiWorks = repos.data.kpis;
                    this.years = this.plan.year;
                    this.researchWorks = repos.data.researchWorks;
                }
            });
        }else{
            return await axios.get(GET_LATEST_PLAN, {
                headers: {
                    Authorization: this.getCookie('Authorization')
                }
            }).then((repos: any) => {
                if (repos.status === 200) {
                    this.plan = repos.data;
                    this.academWorks = repos.data.academicWorks;
                    this.eduMethWorks = repos.data.academicMethods;
                    this.eduWorks = repos.data.educationalWorks;
                    this.socialWorks = repos.data.socialWorks;
                    this.kpiWorks = repos.data.kpis;
                    this.years = this.plan.year;
                    this.researchWorks = repos.data.researchWorks;
                }
            });
        }

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

    async saveResearchWork() {
        return await axios.post(ADD_RESEARCH_WORK,
            {
                idPlan: this.plan.id,
                nameOfTheWork: this.step3.nameOfTheWork,
                deadlines: this.step3.deadlines,
                infoImplementation: this.step3.infoImplementation !== "Other" ? this.step3.infoImplementation : this.step3.anotherInfoImpl,
                results: this.step3.results,
                comments: this.step3.comments,
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

    async saveEduWork() {
        return await axios.post(ADD_EDUCATION_WORK,
            {
                idPlan: this.plan.id,
                nameOfTheWork: this.step4.nameOfTheWork,
                deadlines: this.step4.deadlines,
                infoImplementation: this.step4.infoImplementation !== "Other" ? this.step4.infoImplementation : this.step4.anotherInfoImpl,
                results: this.step4.results,
                comments: this.step4.comments,
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

    async saveSocialWork() {
        return await axios.post(ADD_SOCIAL_WORK,
            {
                idPlan: this.plan.id,
                nameOfTheWork: this.step5.nameOfTheWork,
                deadlines: this.step5.deadlines,
                infoImplementation: this.step5.infoImplementation !== "Other" ? this.step5.infoImplementation : this.step5.anotherInfoImpl,
                results: this.step5.results,
                comments: this.step5.comments,
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

    async updateSearchWork(item:any) {
        return await axios.post(EDIT_RESEARCH_WORK,
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

    async updateEduWork(item:any) {
        return await axios.post(EDIT_EDUCATION_WORK,
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

    async updateSocialWork(item:any) {
        return await axios.post(EDIT_SOCIAL_WORK,
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

    async deleteResearchWorks(itemsToDelete:any[]) {
        return await axios.post(DELETE_RESEARCH_WORK,
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

    async deleteEduWorks(itemsToDelete:any[]) {
        return await axios.post(DELETE_EDUCATION_WORK,
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

    async deleteSocialWorks(itemsToDelete:any[]) {
        return await axios.post(DELETE_SOCIAL_WORK,
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

    async changeYear() {
        return await axios.post(CHANGE_YEAR_PLAN,
            {
                plan: this.plan,
                year: this.years
            },
            {
                headers: {
                    Authorization: this.getCookie('Authorization')
                }
            }).then((repos: any) => {

        });
    }

    getKPIPercentage = () => {
        if(this.kpiWorks.length > 0){
            let per:any= 0.0;

            this.kpiWorks.map((item:any)=>{
                per = per + item.percentage;
            })

            return per;
        }else{
            return 0
        }
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
            nameOfTheWork: "",
            deadlines: "",
            infoImplementation: "",
            anotherInfoImpl:"",
            results: "",
            comments: "",
        }

        this.step4 = {
            nameOfTheWork: "",
            deadlines: "",
            infoImplementation: "",
            anotherInfoImpl:"",
            results: "",
            comments: "",
        }

        this.step5 = {
            nameOfTheWork: "",
            deadlines: "",
            infoImplementation: "",
            anotherInfoImpl:"",
            results: "",
            comments: "",
        }

        this.years = "";

        this.eduMethWorks = [];
        this.academWorks = [];
        this.researchWorks = [];
        this.eduWorks = [];
        this.socialWorks = [];
        this.kpiWorks = [];
        this.plan = null;


        makeAutoObservable(this, {
            editStep1Modal: action,
            editStep2Modal: action.bound,
            editStep3Modal: action.bound,
            editStep4Modal: action.bound,
            editStep5Modal: action.bound,
            getPlan: action.bound,
            saveAcademicWork: action.bound,
            updateAcademicWork: action.bound,
            deleteAcademicWorks: action.bound,
            saveAcademicMethod: action.bound,
            updateAcademicMethod: action.bound,
            deleteAcademicMethods: action.bound,
            saveEduWork: action.bound,
            updateEduWork: action.bound,
            deleteEduWorks: action.bound,
            saveSocialWork: action.bound,
            updateSocialWork: action.bound,
            deleteSocialWorks: action.bound,
            changeYear: action.bound,
            getKPIPercentage: action.bound,
            saveResearchWork: action.bound,
            updateSearchWork: action.bound,
            deleteResearchWorks: action.bound,
        },)
    }

}

export default new CreationPlanStore() as CreationPlanStore;