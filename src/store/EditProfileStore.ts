import {action, makeAutoObservable, runInAction} from 'mobx';
import React from 'react';
import axios from 'axios'

class EditProfileStore {
    model: any;
    positionList: any = [
        {id: 2, nameRu: "asdasd", nameKz: "asdasda", nameEn: "Associate Professor"},
        {id: 2, nameRu: "asdasd", nameKz: "asdasda", nameEn: "Associate Professor"},
        {id: 2, nameRu: "asdasd", nameKz: "asdasda", nameEn: "Associate Professor"},
        {id: 2, nameRu: "asdasd", nameKz: "asdasda", nameEn: "Associate Professor"},
    ];
    rateList: any = ['1', '0.5', '0.25'];
    degreeList: any = [
        {"id": 7, nameRu: "Research", nameKz: "Research", nameEn: "Research"},
        {"id": 7, nameRu: "Research", nameKz: "Research", nameEn: "Research"},
        {"id": 7, nameRu: "Research", nameKz: "Research", nameEn: "Research"},
        {"id": 7, nameRu: "Research", nameKz: "Research", nameEn: "Research"},
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
            lastName: null,
            firstName: null,
            middleName: null,
        }

        makeAutoObservable(this, {
            editModel: action.bound,
        })
    }
}

export default new EditProfileStore() as EditProfileStore;