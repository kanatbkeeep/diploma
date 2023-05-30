import {action, makeAutoObservable} from 'mobx';
import axios from 'axios'
import AppStore from "./AppStore";
import {url} from "../config/rest/common";

function getCookie(name: any) {
    const value = `; ${document.cookie}`;
    const parts: any = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(`;`).shift();
}

class ResetPasswordStore {
    model: any;
    status: any;

    editModel(obj: any) {
        this.model = {...this.model, ...obj};
    };

    async forgotPassword() {
        AppStore.isLoading = true;
        return await axios.post(`${url}/user/forgotPassword?email=` + this.model.email,
            {
                newPassword: this.model.newPassword,
                confirmNewPassword: this.model.confirmNewPassword,
            }).then((repos: any) => {
            if (repos.status === 200) {
                this.status = "verify";
            }
            AppStore.isLoading = false;
        }).catch((error: any) => {
            if (error.response?.status === 400) {
                this.status = "found";
            } else{
                this.status = "techError";
            }
            AppStore.isLoading = false;
        });
    }

    async resetPassword() {
        AppStore.isLoading = true;
        return await axios.post(`${url}/user/resetPassword`,
            {
                oldPassword: this.model.oldPassword,
                newPassword: this.model.newPassword,
                confirmNewPassword: this.model.confirmNewPassword,
            }, {
                headers: {
                    Authorization: getCookie(`Authorization`)
                },
            }).then((repos: any) => {
            if (repos.status === 200) {
                this.status = "verify";
            }
            AppStore.isLoading = false;
        }).catch((error: any) => {
            if (error.response?.status === 400) {
                this.status = "found";
            } else{
                this.status = "techError";
            }
            AppStore.isLoading = false;
        });
    }

    constructor() {
        this.model = {
            email: null,
            oldPassword: null,
            newPassword: null,
            confirmNewPassword: null
        }

        makeAutoObservable(this, {
            editModel: action.bound,
            resetPassword: action.bound,
            forgotPassword: action.bound,
        })
    }
}

export default new ResetPasswordStore() as ResetPasswordStore;
