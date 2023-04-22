import { action, makeAutoObservable, runInAction } from 'mobx';
import React from 'react';

class CreationPlanStore{

    model:any;

    editModel(obj: any) {
        this.model = { ...this.model, ...obj };
    };
    constructor() {

        this.model = {

        }

        makeAutoObservable(this,{
            editModel:action.bound
        })
    }

}