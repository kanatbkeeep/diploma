import {action, makeAutoObservable} from 'mobx';
import axios from 'axios'
import {ADD_KPI, DELETE_KPI, EDIT_KPI, GET_KPI_SECTIONS} from "../config/rest/creationPlanRest";
import AppStore from "./AppStore";


class KpiStore {
    model: any;
    kpiSections:any;
    currentSection:any;
    checked:any;

    numberAuthors = [1,2,3,4,5,6,7,8,9,10];

    infoImplementation = [
        {id: 1, name: "Online"},
        {id: 2, name: "Offline"},
        {id: 2, name: "Other"}
    ]

    editModel(obj: any) {
        this.model = {...this.model, ...obj};
    };
    getCookie(name: any) {
        const value = `; ${document.cookie}`;
        const parts: any = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    clean(){
        this.model = {
            fileName:"",
            fileBase64:"",
            currentIndSection: this.model.currentIndSection,
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
        this.kpiSections.forEach((item:any)=>{
            item.options.forEach((item:any)=>{
                arr.push({id:item, checked:false});
            })
        })
        this.checked = arr;
    }


    async getKpiSections(namePosition:any, nameDegree:any) {
        return await axios.get(GET_KPI_SECTIONS(nameDegree,namePosition),
            {
                headers: {
                    Authorization: this.getCookie('Authorization')
                }
            }).then((repos: any) => {
            if (repos.status === 200) {
                this.kpiSections = repos.data;
                this.currentSection = this.kpiSections[this.model.currentIndSection];
                let arr:any = [];
                this.kpiSections.forEach((item:any)=>{
                    item.options.forEach((item:any)=>{
                        arr.push({id:item, checked:false});
                    })
                })
                this.checked = arr;
            }
        }).catch(() => {AppStore.isLoading = false;});
    }

    async saveKpi(idPlan:any, planStore:any){
        const isAverPer =this.currentSection.name === "Средний процент независимого анкетирования \"Преподаватель глазами студентов\""
        return await axios.post(ADD_KPI(idPlan,this.currentSection.id),
            {
                nameOfTheWork:this.model.chosenOption ? this.model.chosenOption : this.currentSection.name,
                deadlines:this.model.deadlines,
                informationOnImplementation: this.model.infoImplementation !== "Other" ? this.model.infoImplementation: this.model.otherInfoImpl,
                results: !isAverPer ? this.model.results : this.model.averagePer,
                comments:this.model.comments,
                percentage:this.model.currentPercentage,
                authorsNumber:this.model.numberAuthor,
                pdfFile: this.model.fileBase64,
                pdfFileName: this.model.fileName,
                anotherSectionNumber: this.model.isAnotherSection ? this.model.anotherSectionNumber : null,
            },{
                headers: {
                    Authorization: this.getCookie('Authorization')
                }
            }).then((repos: any) => {
                if(repos.status === 201){
                    planStore.getPlan(idPlan);
                }
        }).catch(() => {AppStore.isLoading = false;});
    }

    async updateKpi(id:any, planStore:any){
        const isAverPer =this.currentSection.name === "Средний процент независимого анкетирования \"Преподаватель глазами студентов\""
        return await axios.post(EDIT_KPI,
            {
                id:id,
                nameOfTheWork:this.model.chosenOption ? this.model.chosenOption : this.currentSection.name,
                deadlines:this.model.deadlines,
                informationOnImplementation: this.model.infoImplementation !== "Other" ? this.model.infoImplementation: this.model.otherInfoImpl,
                results: !isAverPer ? this.model.results : this.model.averagePer,
                comments:this.model.comments,
                percentage:this.model.currentPercentage,
                authorsNumber:this.model.numberAuthor,
                pdfFile: this.model.fileBase64,
                pdfFileName: this.model.fileName,
                anotherSectionNumber: this.model.isAnotherSection ? this.model.anotherSectionNumber : null,
            },{
                headers: {
                    Authorization: this.getCookie('Authorization')
                }
            }).then((repos: any) => {
            if(repos.status === 200){
                planStore.getPlan(id);
            }
        }).catch(() => {AppStore.isLoading = false;});
    }

    async deleteKpis(items:any[], planStore:any){
        return await axios.post(DELETE_KPI,
            {
                items:items
            },{
                headers: {
                    Authorization: this.getCookie('Authorization')
                }
            }).then((repos: any) => {
            if(repos.status === 200){
                planStore.getPlan(planStore.plan.id);
            }
        }).catch(() => {AppStore.isLoading = false;});
    }

    constructor() {
        this.model = {
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

        makeAutoObservable(this, {
            editModel: action.bound,
            getKpiSections:action.bound,
            saveKpi: action.bound,
            clean: action.bound,
            resetChecked: action.bound,
            updateKpi:action.bound,
            deleteKpis:action.bound,
        })
    }
}

export default new KpiStore() as KpiStore;


