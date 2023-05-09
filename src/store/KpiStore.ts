import {action, makeAutoObservable, runInAction} from 'mobx';
import React from 'react';
import axios from 'axios'
import {ADD_KPI, GET_KPI_SECTIONS} from "../config/rest/creationPlanRest";


class KpiStore {
    model: any;
    kpiSections:any;
    currentSection:any;

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
            }
        });
    }

    async saveKpi(idPlan:any){
        return await axios.post(ADD_KPI(idPlan,this.currentSection.id),
            {
                nameOfTheWork:this.model.chosenOption ? this.model.chosenOption : this.currentSection.name,
                deadlines:this.model.deadlines,
                informationOnImplementation: this.model.infoImplementation !== "Other" ? this.model.infoImplementation: this.model.otherInfoImpl,
                results:this.model.results,
                comments:this.model.comments,
                percentage:2.2,
                authorsNumber:this.model.numberAuthor,
                pdfFile: this.model.fileBase64,
                pdfFileName: this.model.fileName,
            },{
                headers: {
                    Authorization: this.getCookie('Authorization')
                }
            }).then((repos: any) => {
                if(repos.status === 201){
                    window.location.reload();
                }
        });
    }




    constructor() {
        this.model = {
            fileName:"",
            fileBase64:"",
            currentIndSection: 0,
            chosenOption: "",
            isAnotherSection: false,
            chosenNumAuth:null,
            deadlines:"",
            infoImplementation:"",
            results:"",
            comments:"",
            otherInfoImpl:"",
            numberAuthor: 1,
        }
        this.kpiSections = [];
        this.currentSection = null;

        makeAutoObservable(this, {
            editModel: action.bound,
            getKpiSections:action.bound,
            saveKpi: action.bound,

        })
    }
}

export default new KpiStore() as KpiStore;


