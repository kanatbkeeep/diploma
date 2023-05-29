import {action, makeAutoObservable, runInAction} from 'mobx';
import React from 'react';
import axios from "axios";
import {
    ADD_ACADEMIC_METHOD,
    ADD_ACADEMIC_WORK,
    ADD_EDUCATION_WORK, ADD_KPI, ADD_RESEARCH_WORK, ADD_SOCIAL_WORK, CHANGE_YEAR_PLAN,
    DELETE_ACADEMIC_METHOD,
    DELETE_ACADEMIC_WORK, DELETE_EDUCATION_WORK, DELETE_KPI, DELETE_RESEARCH_WORK, DELETE_SOCIAL_WORK,
    EDIT_ACADEMIC_METHOD,
    EDIT_ACADEMIC_WORK, EDIT_EDUCATION_WORK, EDIT_KPI, EDIT_RESEARCH_WORK, EDIT_SOCIAL_WORK, GET_KPI_SECTIONS,
    GET_LATEST_PLAN, GET_PLAN_BY_ID, IMPORT_PLAN, SEND_PLAN
} from "../config/rest/creationPlanRest";
import AppStore from "./AppStore";
import t from "../utils/Lang";
import {url} from "../config/rest/common";

class CreationPlanStore {

    step1: any;
    step2: any;
    step3: any;
    step4: any;
    step5: any;
    step6: any;
    years: any;
    academWorks: any;
    eduMethWorks: any;
    researchWorks: any;
    kpiWorks: any;
    eduWorks: any;
    socialWorks: any;
    plan: any;
    currentSection:any;
    checked: any;
    kpiSections: any;
    user:any;

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

    editStep6Modal(obj: any) {
        this.step6 = {...this.step6, ...obj};
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

    infoImplementation = [
        {id: 1, name: "Executed/Выполнен/Орындалды"},
        {id: 2, name: "In process/В процессе/Жұмыс барысында"},
        {id: 2, name: "Other/Другое/Басқа"},
    ]



    getCookie(name: any) {
        const value = `; ${document.cookie}`;
        const parts: any = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(`;`).shift();
    }


    async getPlan(id: any = null) {
        this.years = "";
        AppStore.isLoading = true;
        if (id !== null) {
            return await axios.get(GET_PLAN_BY_ID(id), {
                headers: {
                    Authorization: this.getCookie(`Authorization`)
                }
            }).then((repos: any) => {
                AppStore.isLoading = false;
                if (repos.status === 200) {
                    this.plan = repos.data;
                    this.user = this.plan.createdBy.email === AppStore.currentUser.email ? AppStore.currentUser : this.plan.createdBy;
                    this.academWorks = repos.data.academicWorks;
                    this.eduMethWorks = repos.data.academicMethods;
                    this.eduWorks = repos.data.educationalWorks;
                    this.socialWorks = repos.data.socialWorks;
                    this.kpiWorks = repos.data.kpis;
                    this.years = this.plan.year;
                    this.researchWorks = repos.data.researchWorks;
                }
            });
        } else {
            return await axios.get(GET_LATEST_PLAN, {
                headers: {
                    Authorization: this.getCookie(`Authorization`)
                }
            }).then((repos: any) => {
                AppStore.isLoading = false;
                if (repos.status === 200) {
                    this.plan = repos.data;
                    this.user = this.plan.createdBy.email === AppStore.currentUser.email ? AppStore.currentUser : this.plan.createdBy;
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

    async importPlan(file: any) {
        AppStore.isLoading = true;
        return await axios.post(IMPORT_PLAN,
            {
                fileBase64: file
            },
            {
                headers: {
                    Authorization: this.getCookie(`Authorization`)
                },
            }).then((repos: any) => {
            AppStore.getMyPlans();
            AppStore.isLoading = false;
        }).catch(() => {
            AppStore.isLoading = false;
        });
    }

    async sendPlan(byTeacher: boolean) {
        AppStore.isLoading = true;
        return await axios.post(`${url}/notification/send?planId=` + this.plan.id + `&byTeacher=` + byTeacher,
            {
                status: `AWAITING`
            },
            {
                headers: {
                    Authorization: this.getCookie(`Authorization`)
                },
            }).then((repos: any) => {
            AppStore.isLoading = false;
            if (repos.status === 201) {
                this.getPlan(this.plan.id);
            }
        });
    }

    async saveAcademicWork() {
        AppStore.isLoading = true;
        return await axios.post(ADD_ACADEMIC_WORK,
            {
                idPlan: this.plan.id,
                ...this.step1
            },
            {
                headers: {
                    Authorization: this.getCookie(`Authorization`)
                }
            }).then((repos: any) => {
            AppStore.isLoading = false;
            if (repos.status === 201) {
                this.getPlan(this.plan.id);
            }
        });
    }

    async saveAcademicMethod() {
        AppStore.isLoading = true;
        return await axios.post(ADD_ACADEMIC_METHOD,
            {
                idPlan: this.plan.id,
                discipline: this.step2.discipline === t(`other`) ? this.step2.anotherDiscipline : this.step2.discipline,
                nameWork: this.step2.nameWork,
                deadlines: this.step2.deadlines,
                infoImplementation: this.step2.infoImplementation !== "Other/Другое/Басқа" ? this.step2.infoImplementation : this.step2.anotherInfoImpl,
                comment: this.step2.comment,
            },
            {
                headers: {
                    Authorization: this.getCookie(`Authorization`)
                }
            }).then((repos: any) => {
            AppStore.isLoading = false;
            if (repos.status === 201) {
                this.getPlan(this.plan.id);
            }
        });
    }

    async saveResearchWork() {
        AppStore.isLoading = true;
        return await axios.post(ADD_RESEARCH_WORK,
            {
                idPlan: this.plan.id,
                nameOfTheWork: this.step3.nameOfTheWork,
                deadlines: this.step3.deadlines,
                infoImplementation: this.step3.infoImplementation !== "Other/Другое/Басқа" ? this.step3.infoImplementation : this.step3.anotherInfoImpl,
                results: this.step3.results,
                comments: this.step3.comments,
            },
            {
                headers: {
                    Authorization: this.getCookie(`Authorization`)
                }
            }).then((repos: any) => {
            AppStore.isLoading = false;
            if (repos.status === 201) {
                this.getPlan(this.plan.id);
            }
        });
    }

    async saveEduWork() {
        AppStore.isLoading = true;
        return await axios.post(ADD_EDUCATION_WORK,
            {
                idPlan: this.plan.id,
                nameOfTheWork: this.step4.nameOfTheWork,
                deadlines: this.step4.deadlines,
                infoImplementation: this.step4.infoImplementation !== "Other/Другое/Басқа" ? this.step4.infoImplementation : this.step4.anotherInfoImpl,
                results: this.step4.results,
                comments: this.step4.comments,
            },
            {
                headers: {
                    Authorization: this.getCookie(`Authorization`)
                }
            }).then((repos: any) => {
            AppStore.isLoading = false;
            if (repos.status === 201) {
                this.getPlan(this.plan.id);
            }
        });
    }

    async saveSocialWork() {
        AppStore.isLoading = true;
        return await axios.post(ADD_SOCIAL_WORK,
            {
                idPlan: this.plan.id,
                nameOfTheWork: this.step5.nameOfTheWork,
                deadlines: this.step5.deadlines,
                infoImplementation: this.step5.infoImplementation !== "Other/Другое/Басқа" ? this.step5.infoImplementation : this.step5.anotherInfoImpl,
                results: this.step5.results,
                comments: this.step5.comments,
            },
            {
                headers: {
                    Authorization: this.getCookie(`Authorization`)
                }
            }).then((repos: any) => {
            AppStore.isLoading = false;
            if (repos.status === 201) {
                this.getPlan(this.plan.id);
            }
        });
    }

    async updateAcademicWork(item: any) {
        AppStore.isLoading = true;
        return await axios.post(EDIT_ACADEMIC_WORK,
            {
                ...item,
            },
            {
                headers: {
                    Authorization: this.getCookie(`Authorization`)
                }
            }).then((repos: any) => {
            AppStore.isLoading = false;
            if (repos.status === 200) {
                this.getPlan(this.plan.id);
            }
        });
    }

    async updateAcademicMethod(item: any) {
        AppStore.isLoading = true;
        return await axios.post(EDIT_ACADEMIC_METHOD,
            {
                ...item,
            },
            {
                headers: {
                    Authorization: this.getCookie(`Authorization`)
                }
            }).then((repos: any) => {
            AppStore.isLoading = false;
            if (repos.status === 200) {
                this.getPlan(this.plan.id);
            }
        });
    }

    async updateSearchWork(item: any) {
        AppStore.isLoading = true;
        return await axios.post(EDIT_RESEARCH_WORK,
            {
                ...item,
            },
            {
                headers: {
                    Authorization: this.getCookie(`Authorization`)
                }
            }).then((repos: any) => {
            AppStore.isLoading = false;
            if (repos.status === 200) {
                this.getPlan(this.plan.id);
            }
        });
    }

    async updateEduWork(item: any) {
        AppStore.isLoading = true;
        return await axios.post(EDIT_EDUCATION_WORK,
            {
                ...item,
            },
            {
                headers: {
                    Authorization: this.getCookie(`Authorization`)
                }
            }).then((repos: any) => {
            AppStore.isLoading = false;
            if (repos.status === 200) {
                this.getPlan(this.plan.id);
            }
        });
    }

    async updateSocialWork(item: any) {
        AppStore.isLoading = true;
        return await axios.post(EDIT_SOCIAL_WORK,
            {
                ...item,
            },
            {
                headers: {
                    Authorization: this.getCookie(`Authorization`)
                }
            }).then((repos: any) => {
            AppStore.isLoading = false;
            if (repos.status === 200) {
                this.getPlan(this.plan.id);
            }
        });
    }

    async deleteAcademicWorks(itemsToDelete: any[]) {
        AppStore.isLoading = true;
        return await axios.post(DELETE_ACADEMIC_WORK,
            {
                items: itemsToDelete
            },
            {
                headers: {
                    Authorization: this.getCookie(`Authorization`)
                }
            }).then((repos: any) => {
            AppStore.isLoading = false;
            if (repos.status === 200) {
                this.getPlan(this.plan.id);
            }
        });
    }

    async deleteAcademicMethods(itemsToDelete: any[]) {
        AppStore.isLoading = true;
        return await axios.post(DELETE_ACADEMIC_METHOD,
            {
                items: itemsToDelete
            },
            {
                headers: {
                    Authorization: this.getCookie(`Authorization`)
                }
            }).then((repos: any) => {
            AppStore.isLoading = false;
            if (repos.status === 200) {
                this.getPlan(this.plan.id);
            }
        });
    }

    async deleteResearchWorks(itemsToDelete: any[]) {
        AppStore.isLoading = true;
        return await axios.post(DELETE_RESEARCH_WORK,
            {
                items: itemsToDelete
            },
            {
                headers: {
                    Authorization: this.getCookie(`Authorization`)
                }
            }).then((repos: any) => {
            AppStore.isLoading = false;
            if (repos.status === 200) {
                this.getPlan(this.plan.id);
            }
        });
    }

    async deleteEduWorks(itemsToDelete: any[]) {
        AppStore.isLoading = true;
        return await axios.post(DELETE_EDUCATION_WORK,
            {
                items: itemsToDelete
            },
            {
                headers: {
                    Authorization: this.getCookie(`Authorization`)
                }
            }).then((repos: any) => {
            AppStore.isLoading = false;
            if (repos.status === 200) {
                this.getPlan(this.plan.id);
            }
        });
    }

    async deleteSocialWorks(itemsToDelete: any[]) {
        AppStore.isLoading = true;
        return await axios.post(DELETE_SOCIAL_WORK,
            {
                items: itemsToDelete
            },
            {
                headers: {
                    Authorization: this.getCookie(`Authorization`)
                }
            }).then((repos: any) => {
            AppStore.isLoading = false;
            if (repos.status === 200) {
                this.getPlan(this.plan.id);
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
                    Authorization: this.getCookie(`Authorization`)
                }
            }).then((repos: any) => {

        });
    }

    getKPIPercentage = () => {
        if (this.kpiWorks.length > 0) {
            let per: any = 0.0;

            this.kpiWorks.map((item: any) => {
                per = per + item.percentage;
            })

            return per;
        } else {
            return 0
        }
    }

    // KPI PART

    numberAuthors = [1,2,3,4,5,6,7,8,9,10];

    clean(){
        this.step6 = {
            fileName:"",
            fileBase64:"",
            currentIndSection: this.step6.currentIndSection,
            chosenOption: "",
            isAnotherSection: false,
            chosenNumAuth:null,
            deadlines:"",
            infoImplementation:"",
            results:"",
            comments:"",
            otherInfoImpl:"",
            numberAuthor: 1,
            currentPercentage: 0.0,
            averagePer:0,
            anotherWork: null,
        }
    }

    resetChecked(){
        let arr:any = [];
        this.kpiSections.map((item:any,ind:any)=>{
            item.options.map((item:any,ind:any)=>{
                arr.push({id:item, checked:false});
            })
        })
        this.checked = arr;
    }


    async getKpiSections(namePosition:any, nameDegree:any) {
        AppStore.isLoading = true;
        return await axios.get(GET_KPI_SECTIONS(nameDegree,namePosition),
            {
                headers: {
                    Authorization: this.getCookie(`Authorization`)
                }
            }).then((repos: any) => {
            AppStore.isLoading = false;
            if (repos.status === 200) {
                this.kpiSections = repos.data;
                this.currentSection = this.kpiSections[this.step6.currentIndSection];
                let arr:any = [];
                this.kpiSections.map((item:any,ind:any)=>{
                    item.options.map((item:any,ind:any)=>{
                        arr.push({id:item, checked:false});
                    })
                })
                this.checked = arr;
            }
        });
    }

    async saveKpi(){
        AppStore.isLoading = true;
        const isAverPer =this.currentSection.name === "Средний процент независимого анкетирования \"Преподаватель глазами студентов\""
        return await axios.post(ADD_KPI(this.plan.id,this.currentSection.id),
            {
                nameOfTheWork:this.step6.chosenOption ? this.step6.chosenOption : this.currentSection.name,
                deadlines:this.step6.deadlines,
                informationOnImplementation: this.step6.infoImplementation !== "Other/Другое/Басқа" ? this.step6.infoImplementation: this.step6.otherInfoImpl,
                results: !isAverPer ? this.step6.results : this.step6.averagePer,
                comments:this.step6.comments,
                percentage:this.step6.currentPercentage,
                authorsNumber:this.step6.numberAuthor,
                pdfFile: this.step6.fileBase64,
                pdfFileName: this.step6.fileName,
                anotherSectionNumber: this.step6.isAnotherSection ? this.step6.anotherSectionNumber : null,
            },{
                headers: {
                    Authorization: this.getCookie(`Authorization`)
                }
            }).then((repos: any) => {
            AppStore.isLoading = true;
            if(repos.status === 201){
                this.getPlan(this.plan.id);
            }
        });
    }

    async updateKpi(id:any){
        AppStore.isLoading = true;
        const isAverPer =this.currentSection.name === "Средний процент независимого анкетирования \"Преподаватель глазами студентов\""
        return await axios.post(EDIT_KPI,
            {
                id:id,
                nameOfTheWork:this.step6.chosenOption ? this.step6.chosenOption : this.currentSection.name,
                deadlines:this.step6.deadlines,
                informationOnImplementation: this.step6.infoImplementation !== "Other/Другое/Басқа" ? this.step6.infoImplementation: this.step6.otherInfoImpl,
                results: !isAverPer ? this.step6.results : this.step6.averagePer,
                comments:this.step6.comments,
                percentage:this.step6.currentPercentage,
                authorsNumber:this.step6.numberAuthor,
                pdfFile: this.step6.fileBase64,
                pdfFileName: this.step6.fileName,
                anotherSectionNumber: this.step6.isAnotherSection ? this.step6.anotherSectionNumber : null,
            },{
                headers: {
                    Authorization: this.getCookie(`Authorization`)
                }
            }).then((repos: any) => {
            AppStore.isLoading = true;
            if(repos.status === 200){
                this.getPlan(this.plan.id);
            }
        });
    }

    async deleteKpis(items:any[]){
        AppStore.isLoading = true;
        return await axios.post(DELETE_KPI,
            {
                items:items
            },{
                headers: {
                    Authorization: this.getCookie(`Authorization`)
                }
            }).then((repos: any) => {
            AppStore.isLoading = true;
            if(repos.status === 200){
                this.getPlan(this.plan.id);
            }
        });
    }


    constructor() {

        this.step1 = {
            nameOfDiscipline: "",
            course: "",
            trimester: "",
            groups: "",
            lecturesPlan: null,
            lecturesFact: null,
            practicesPlan: null,
            practicesFact: null,
            hoursPlan: null,
            hoursFact: null,
            totalPlan: 0,
            totalFact: 0,
        }

        this.step2 = {
            discipline: "",
            anotherDiscipline:"",
            nameWork: "",
            deadlines: "",
            infoImplementation: "",
            anotherInfoImpl:"",
            comment: "",
        }

        this.step3 = {
            nameOfTheWork: "",
            deadlines: "",
            infoImplementation: "",
            anotherInfoImpl: "",
            results: "",
            comments: "",
        }

        this.step4 = {
            nameOfTheWork: "",
            deadlines: "",
            infoImplementation: "",
            anotherInfoImpl: "",
            results: "",
            comments: "",
        }

        this.step5 = {
            nameOfTheWork: "",
            deadlines: "",
            infoImplementation: "",
            anotherInfoImpl: "",
            results: "",
            comments: "",
        }

        this.step6 = {
            fileName:"",
            fileBase64:"",
            currentIndSection: 0,
            chosenOption: "",
            isAnotherSection: false,
            anotherSectionNumber: null,
            deadlines:"",
            infoImplementation:"",
            results:"",
            comments:"",
            otherInfoImpl:"",
            numberAuthor: 1,
            currentPercentage: 0.0,
            averagePer:0,
            anotherWork: null,
        }
        this.kpiSections = [];
        this.currentSection = null;
        this.checked = [];

        this.years = "";

        this.eduMethWorks = [];
        this.academWorks = [];
        this.researchWorks = [];
        this.eduWorks = [];
        this.socialWorks = [];
        this.kpiWorks = [];
        this.plan = null;
        this.user = null;


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
            editStep6Modal: action.bound,
            saveKpi: action.bound,
            updateKpi: action.bound,
            deleteKpis: action.bound,
            resetChecked: action.bound,
            getKpiSections: action.bound,
            clean: action.bound,
            importPlan: action.bound,
        },)
    }

}

export default new CreationPlanStore() as CreationPlanStore;