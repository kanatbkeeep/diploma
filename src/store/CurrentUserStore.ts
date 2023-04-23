import {action, makeAutoObservable, runInAction} from 'mobx';
import React from 'react';

class CurrentUserStore {
    currentUser: any;
    model: any;

    editModel(obj: any) {
        this.model = {...this.model, ...obj};
    };

    constructor() {
        this.model = {}
        makeAutoObservable(this, {
            editModel: action.bound,
        })
    }

}