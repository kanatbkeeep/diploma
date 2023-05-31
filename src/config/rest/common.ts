export const local = `http://localhost:8080`;
export const production = `https://ipp-aitu.herokuapp.com`
export const isTest = false;
export const url = isTest ? local : production;