export const local = `http://localhost:8080`;
export const production = `https://plan-back-deploy.vercel.app`
export const isTest = false;
export const url = isTest ? local : production;