import { action, makeAutoObservable, runInAction } from 'mobx';
import React from 'react';

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
        {id:1, name:"Research project"},
        {id:2, name:"Research"},
        {id:3, name:"Research article"},
    ];

    constructor() {

        this.step1 = {
            nameDiscipline:"",
            course: null,
            trimester: null,
            group:null,
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
            discipline:null,
            nameWork:"",
            deadlines:"",
            infoImplementation:null,
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
        },)
    }

}

export default new CreationPlanStore() as CreationPlanStore;