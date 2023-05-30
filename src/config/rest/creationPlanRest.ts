import {url} from "./common";

export const ADD_ACADEMIC_WORK = `${url}/plan/add-academic-work`;
export const EDIT_ACADEMIC_WORK = `${url}/academic-work/update`;
export const DELETE_ACADEMIC_WORK = `${url}/academic-work/delete`;
export const ADD_ACADEMIC_METHOD = `${url}/plan/add-academic-methods`;
export const EDIT_ACADEMIC_METHOD = `${url}/academic-method/update`;
export const DELETE_ACADEMIC_METHOD = `${url}/academic-method/delete`;
export const ADD_EDUCATION_WORK = `${url}/plan/add-educational-work`;
export const EDIT_EDUCATION_WORK = `${url}/educational-work/update`;
export const DELETE_EDUCATION_WORK = `${url}/educational-work/delete`;
export const ADD_SOCIAL_WORK = `${url}/plan/add-social-work`;
export const EDIT_SOCIAL_WORK = `${url}/social-work/update`;
export const DELETE_SOCIAL_WORK = `${url}/social-work/delete`;
export const GET_LATEST_PLAN = `${url}/plan/get-last-plan`;
export const GET_PLAN_BY_ID = (id: any) => `${url}/plan/get-by-id?id=${id}`;

export const ADD_KPI = (idPlan:any,id:any) => `${url}/plan/add-kpi?id=${idPlan}&idSection=${id}`;
export const EDIT_KPI = `${url}/kpi/update`;
export const DELETE_KPI = `${url}/kpi/delete`;
export const GET_KPI_SECTIONS = (degree:any,position:any) => `${url}/kpi-section/get-all?positionName=${position}&degreeName=${degree}`;
export const CHANGE_YEAR_PLAN = `${url}/plan/change-year`;

export const ADD_RESEARCH_WORK = `${url}/plan/add-research-work`;
export const EDIT_RESEARCH_WORK = `${url}/research-work/update`;
export const DELETE_RESEARCH_WORK = `${url}/research-work/delete`;

export const SEND_PLAN = (id:any) => `${url}/plan/send?id=${id}`;
export const IMPORT_PLAN = `${url}/plan/upload-docx`;