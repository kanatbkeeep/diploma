import {action, makeAutoObservable, runInAction} from 'mobx';
import React from 'react';
import axios from 'axios'

class EditProfileStore {
    model: any;

    editModel(obj: any) {
        this.model = {...this.model, ...obj};
    };

    constructor() {
        this.model = {
            fileBase64: null,
            fileName: null,

        }

        makeAutoObservable(this, {
            editModel: action.bound,
        })
    }
}

export default new EditProfileStore() as EditProfileStore;