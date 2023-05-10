import {action, makeAutoObservable, runInAction} from 'mobx';
import React from 'react';
import axios from 'axios'

class EditProfileStore {
    model: any;
    positionList: any = [
        {nameRu: "asdasd", nameKz: "asdasda", nameEn: "Associate Professor"},
        {nameRu: "asdasd", nameKz: "asdasda", nameEn: "Associate Professor"},
        {nameRu: "asdasd", nameKz: "asdasda", nameEn: "Associate Professor"},
        {nameRu: "asdasd", nameKz: "asdasda", nameEn: "Associate Professor"},
    ];
    rateList: any = [
        {rate: '1'},
        {rate: '0.5'},
        {rate: '0.25'},
    ];
    degreeList: any = [
        {nameRu: "Research", nameKz: "Research", nameEn: "Research"},
        {nameRu: "Research", nameKz: "Research", nameEn: "Research"},
        {nameRu: "Research", nameKz: "Research", nameEn: "Research"},
        {nameRu: "Research", nameKz: "Research", nameEn: "Research"},
    ];
    departmentList: any = [
        {nameRu: "Computer Engineering", nameKz: "Computer Engineering", nameEn: "Computer Engineering"},
        {nameRu: "Computer Engineering", nameKz: "Computer Engineering", nameEn: "Computer Engineering"},
    ]

    editModel(obj: any) {
        this.model = {...this.model, ...obj};
    };

    constructor() {
        this.model = {
            fileBase64: null,
            fileName: null,
            position: null,
            rate: null,
            degree: null,
            department: null,
        }

        makeAutoObservable(this, {
            editModel: action.bound,
        })
    }
}

export default new EditProfileStore() as EditProfileStore;