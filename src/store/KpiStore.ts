import {action, makeAutoObservable, runInAction} from 'mobx';
import React from 'react';
import axios from 'axios'

class KpiStore {
    model: any;

    editModel(obj: any) {
        this.model = {...this.model, ...obj};
    };

    constructor() {
        this.model = {
            fileName:"",
        }

        makeAutoObservable(this, {
            editModel: action.bound,

        })
    }
}

export default new KpiStore() as KpiStore;