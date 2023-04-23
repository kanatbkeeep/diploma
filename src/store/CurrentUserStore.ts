import {action, makeAutoObservable, runInAction} from 'mobx';
import React from 'react';
import axios from 'axios'

class CurrentUserStore {
    currentUser: any;
    model: any;

    loadLogin() {
        axios.post('http://localhost:8080/user/loginUser', {
            email: this.model.email,
            password: this.model.password
        }).then((repos) => {
            document.cookie = "Authorization=" + repos.data;
            this.getUser();
        });

    }

    getUser() {
        axios.get('http://localhost:8080/user/getUser', {headers: {
                Authorization: this.getCookie('Authorization')
            }}).then((repos) => {
            this.currentUser = repos.data;
            window.location.replace('/');
        });
    }

    getCookie(name: any) {
        const value = `; ${document.cookie}`;
        const parts: any = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    editModel(obj: any) {
        this.model = {...this.model, ...obj};
    };

    constructor() {
        this.model = {
            email: null,
            password: null,
        }

        makeAutoObservable(this, {
            editModel: action.bound,
            loadLogin: action.bound,
            getUser: action.bound,
        })
    }
}

export default new CurrentUserStore() as CurrentUserStore;