import {action, makeAutoObservable} from 'mobx';
import axios from 'axios'
import AppStore from "./AppStore";
import {url} from "../config/rest/common";

function getCookie(name: any) {
    const value = `; ${document.cookie}`;
    const parts: any = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(`;`).shift();
}

class NotificationStore {
    model: any;
    notifications: any;

    editModel(obj: any) {
        this.model = {...this.model, ...obj};
    };

    async getNotification() {
        AppStore.isLoading = true;
        return await axios.get(`${url}/notification/get-to-me`,{
            headers: {
                Authorization: getCookie(`Authorization`)
            }
        }).then((repos: any) => {
            AppStore.isLoading = false;
            if (repos.status === 200) {
                this.notifications = repos.data;
            }

        }).catch(() => {AppStore.isLoading = false;});
    }

    constructor() {
        this.model = {

        }

        makeAutoObservable(this, {
            editModel: action.bound,
            getNotification: action.bound,
        })
    }
}

export default new NotificationStore() as NotificationStore;