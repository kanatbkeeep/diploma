export const local = `http://localhost:8080`;
export const production = `https://aitu-plan.herokuapp.com`
export const isTest = true;
export const url = isTest ? local : production;