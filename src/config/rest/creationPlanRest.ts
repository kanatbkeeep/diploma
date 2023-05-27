export const ADD_ACADEMIC_WORK = `https://aitu-plan.herokuapp.com/plan/add-academic-work`;
export const EDIT_ACADEMIC_WORK = `https://aitu-plan.herokuapp.com/academic-work/update`;
export const DELETE_ACADEMIC_WORK = `https://aitu-plan.herokuapp.com/academic-work/delete`;
export const ADD_ACADEMIC_METHOD = `https://aitu-plan.herokuapp.com/plan/add-academic-methods`;
export const EDIT_ACADEMIC_METHOD = `https://aitu-plan.herokuapp.com/academic-method/update`;
export const DELETE_ACADEMIC_METHOD = `https://aitu-plan.herokuapp.com/academic-method/delete`;
export const ADD_EDUCATION_WORK = `https://aitu-plan.herokuapp.com/plan/add-educational-work`;
export const EDIT_EDUCATION_WORK = `https://aitu-plan.herokuapp.com/educational-work/update`;
export const DELETE_EDUCATION_WORK = `https://aitu-plan.herokuapp.com/educational-work/delete`;
export const ADD_SOCIAL_WORK = `https://aitu-plan.herokuapp.com/plan/add-social-work`;
export const EDIT_SOCIAL_WORK = `https://aitu-plan.herokuapp.com/social-work/update`;
export const DELETE_SOCIAL_WORK = `https://aitu-plan.herokuapp.com/social-work/delete`;
export const GET_LATEST_PLAN = `https://aitu-plan.herokuapp.com/plan/get-last-plan`;
export const GET_PLAN_BY_ID = (id: any) => `https://aitu-plan.herokuapp.com/plan/get-by-id?id=${id}`;

export const ADD_KPI = (idPlan:any,id:any) => `https://aitu-plan.herokuapp.com/plan/add-kpi?id=${idPlan}&idSection=${id}`;
export const EDIT_KPI = `https://aitu-plan.herokuapp.com/kpi/update`;
export const DELETE_KPI = `https://aitu-plan.herokuapp.com/kpi/delete`;
export const UPLOAD_FILE_KPI = `https://aitu-plan.herokuapp.com/kpi/upload-supporting-document`;
export const GET_KPI_SECTIONS = (degree:any,position:any) => `https://aitu-plan.herokuapp.com/kpi-section/get-all?positionName=${position}&degreeName=${degree}`;
export const CHANGE_YEAR_PLAN = `https://aitu-plan.herokuapp.com/plan/change-year`;

export const ADD_RESEARCH_WORK = `https://aitu-plan.herokuapp.com/plan/add-research-work`;
export const EDIT_RESEARCH_WORK = `https://aitu-plan.herokuapp.com/research-work/update`;
export const DELETE_RESEARCH_WORK = `https://aitu-plan.herokuapp.com/research-work/delete`;

export const SEND_PLAN = (id:any) => `https://aitu-plan.herokuapp.com/plan/send?id=${id}`;