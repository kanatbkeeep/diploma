export const ADD_ACADEMIC_WORK = `http://localhost:8080/plan/add-academic-work`;
export const EDIT_ACADEMIC_WORK = `http://localhost:8080/academic-work/update`;
export const DELETE_ACADEMIC_WORK = `http://localhost:8080/academic-work/delete`;
export const ADD_ACADEMIC_METHOD = `http://localhost:8080/plan/add-academic-methods`;
export const EDIT_ACADEMIC_METHOD = `http://localhost:8080/academic-method/update`;
export const DELETE_ACADEMIC_METHOD = `http://localhost:8080/academic-method/delete`;
export const ADD_EDUCATION_WORK = `http://localhost:8080/plan/add-educational-work`;
export const EDIT_EDUCATION_WORK = `http://localhost:8080/educational-work/update`;
export const DELETE_EDUCATION_WORK = `http://localhost:8080/educational-work/delete`;
export const ADD_SOCIAL_WORK = `http://localhost:8080/plan/add-social-work`;
export const EDIT_SOCIAL_WORK = `http://localhost:8080/social-work/update`;
export const DELETE_SOCIAL_WORK = `http://localhost:8080/social-work/delete`;
export const GET_LATEST_PLAN = `http://localhost:8080/plan/get-last-plan`;
export const GET_PLAN_BY_ID = (id: any) => `http://localhost:8080/plan/get-by-id?id=${id}`;

export const ADD_KPI = (idPlan:any,id:any) => `http://localhost:8080/plan/add-kpi?id=${idPlan}&idSection=${id}`;
export const EDIT_KPI = `http://localhost:8080/kpi/update`;
export const DELETE_KPI = `http://localhost:8080/kpi/delete`;
export const UPLOAD_FILE_KPI = `http://localhost:8080/kpi/upload-supporting-document`;
export const GET_KPI_SECTIONS = (degree:any,position:any) => `http://localhost:8080/kpi-section/get-all?positionName=${position}&degreeName=${degree}`;
export const CHANGE_YEAR_PLAN = `http://localhost:8080/plan/change-year`;

export const ADD_RESEARCH_WORK = `http://localhost:8080/plan/add-research-work`;
export const EDIT_RESEARCH_WORK = `http://localhost:8080/research-work/update`;
export const DELETE_RESEARCH_WORK = `http://localhost:8080/research-work/delete`;

export const SEND_PLAN = (id:any) => `http://localhost:8080/plan/send?id=${id}`;