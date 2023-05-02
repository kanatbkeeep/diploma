import { action, makeAutoObservable, runInAction } from 'mobx';
import React from 'react';
import axios from "axios";
import {AM_DELETE, AM_GET, AW_DELETE, AW_GET, AW_SAVE, AW_UPDATE} from "../config/rest/creationPlanRest";

class CreationPlanStore {

    step1: any;
    step2: any;
    step3: any;
    academWorks: any;
    eduMethWorks: any;
    researchWorks: any;

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
        {id:1, name:"1"},
        {id:2, name:"2"},
        {id:3, name:"3"},
    ];

    trimesters = [
        {id:1, name:"1"},
        {id:2, name:"2"},
        {id:3, name:"3"},
    ];

    groups = [
        {id:1, name:"SE-2014"},
        {id:2, name:"IT-2002"},
        {id:3, name:"SE-2015"},
        {id:4, name:"SE-2013"},
        {id:5, name:"SE-2012"},
        {id:6, name:"SE-2011"}
    ];

    disciplines = [
        {id:1, name:"Java programming"},
        {id:2, name:"C++ programming"},
        {id:3, name:"C# programming"},
        {id:4, name:"Python programming"},
        {id:5, name:"Web programming"},
        {id:6, name:"Machine learning"}
    ];

    infoImplementation = [
        {id:1, name:"Online"},
        {id:2, name:"Offline"}
    ]

    typeWork = [
        {id:1, name:"Preparation of an Article"},
        {id:2, name:"Participation in a Conference"},
        {id:3, name:"Scientific guidance"},
        {id:4, name:"Other"},
    ];

    getCookie(name: any) {
        const value = `; ${document.cookie}`;
        const parts: any = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    async getCreationPlanPart(type:any) {
        let rest:any;
        if(type === 1)rest = AW_GET;
        else if(type === 2)rest = AM_GET;

        return await axios.get(rest, {
            headers: {
                Authorization: this.getCookie('Authorization')
            }
        }).then((repos: any) => {
            if (repos.status === 200) {
                if(type === 1) this.academWorks = repos.data;
                else if(type === 2) this.eduMethWorks = repos.data;
            }
        });
    }


    async deleteCreationPlanPart(itemsToDelete:any[],type:any) {
        let rest:any;
        if(type === 1)rest = AW_DELETE;
        else if(type === 2)rest = AM_DELETE;
        return await axios.post(rest, {
             items:[...itemsToDelete]
        },{
            headers: {
                Authorization: this.getCookie('Authorization')
            }
        }).then((repos: any) => {
            window.location.reload();
        });
    }

    async addAcademicWork() {
        return await axios.post(AW_SAVE, {
            nameOfDiscipline: this.step1.nameOfDiscipline,
            course:this.step1.course,
            trimester:this.step1.trimester,
            groups:this.step1.groups,
            lecturesPlan:this.step1.lecturesPlan,
            lecturesFact:this.step1.lecturesFact,
            practicesPlan:this.step1.practicesPlan,
            practicesFact:this.step1.practicesFact,
            hoursPlan:this.step1.hoursPlan,
            hoursFact:this.step1.hoursFact,
            totalPlan:this.step1.totalPlan,
            totalFact:this.step1.totalFact,
        },{
            headers: {
                Authorization: this.getCookie('Authorization')
            }
        }).then((repos: any) => {
            if (repos.status === 200 || repos.status === 201) {
                this.step1 = {
                    nameOfDiscipline:"",
                    course: null,
                    trimester: null,
                    groups:null,
                    lecturesPlan:"",
                    lecturesFact:"",
                    practicesPlan:"",
                    practicesFact:"",
                    hoursPlan:"",
                    hoursFact:"",
                    totalPlan:"",
                    totalFact:"",
                }
                window.location.reload();
            }
        });
    }

    async updateAcademicWorks(item:any) {
        return await axios.post(AW_UPDATE, {
            id: item.id,
            nameOfDiscipline: item.nameOfDiscipline,
            course:item.course,
            trimester:item.trimester,
            groups:item.groups,
            lecturesPlan:item.lecturesPlan,
            lecturesFact:item.lecturesFact,
            practicesPlan:item.practicesPlan,
            practicesFact:item.practicesFact,
            hoursPlan:item.hoursPlan,
            hoursFact:item.hoursFact,
            totalPlan:item.totalPlan,
            totalFact:item.totalFact,
        },{
            headers: {
                Authorization: this.getCookie('Authorization')
            }
        }).then((repos: any) => {
            window.location.reload();
        });
    }


    constructor() {

        this.step1 = {
            nameOfDiscipline:"",
            course: "",
            trimester: "",
            groups:"",
            lecturesPlan:"",
            lecturesFact:"",
            practicesPlan:"",
            practicesFact:"",
            hoursPlan:"",
            hoursFact:"",
            totalPlan:"",
            totalFact:"",
        }

        this.step2 = {
            discipline:"",
            nameWork:"",
            deadlines:"",
            infoImplementation:"",
            comment:"",
        }

        this.step3 = {
            typeWork:null,
            journal:"",
            deadline:"",
            article:"",
            infoImplementation:null,
            comment:"",
        }

        this.eduMethWorks = [];
        this.academWorks = [];
        this.researchWorks = [];


        makeAutoObservable(this, {
            editStep1Modal: action,
            editStep2Modal: action.bound,
            editStep3Modal: action.bound,
            getCreationPlanPart:action.bound,
            addAcademicWork: action.bound,
            deleteCreationPlanPart: action.bound,
            updateAcademicWorks: action.bound,
        },)
    }

}

export default new CreationPlanStore() as CreationPlanStore;