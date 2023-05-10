import en from './lang/en'
import kz from './lang/kz'
import ru from './lang/ru'

function getCookie(name: any) {
    const value = `; ${document.cookie}`;
    const parts: any = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const text: any = {
    "ru": ru,
    "en": en,
    "kz": kz
}

const t = (txt: string) => {
    let lg = getCookie('lang')?getCookie('lang'):getCookie('locale');

    if (lg === "en" && text["en"][txt]) {
        return text["en"][txt];
    } else if (lg === "kz" && text["kz"][txt]) {
        return text["kz"][txt];
    } else if (lg === "kk" && text["kz"][txt]) {
        return text["kz"][txt];
    } else if (lg === "ru" && text["ru"][txt]) {
      return text["ru"][txt];
    }
    else
        return text["ru"][txt] ? text["ru"][txt] :
                text["en"][txt] ? text["en"][txt] :
                 text["kz"][txt] ? text["kz"][txt] : '-';
}

export const l = (fieldName: any) => {
    let lg = getCookie('lang')?getCookie('lang'):getCookie('locale');
    return lg ? lg === 'ru' ? `${fieldName}Ru` :
            lg === 'kk' ? `${fieldName}Kz` :
            lg === 'kz' ? `${fieldName}Kz` :
             lg === 'en' ? `${fieldName}En` :
             `${fieldName}Ru` ? `${fieldName}Ru` :
               fieldName : `${fieldName}Ru`;
}

export const lnorukk = (fieldName: any) => {
    let lg = getCookie('lang')?getCookie('lang'):getCookie('locale');
    return lg ? lg === 'ru' ? `${fieldName}` :
            lg === 'kk' ? `${fieldName}Kk` :
            lg === 'kz' ? `${fieldName}Kk` :
             lg === 'en' ? `${fieldName}En` :
             `${fieldName}Kk` ? `${fieldName}Kk` :
               fieldName : `${fieldName}`;
}

export const lrus = (fieldName: any) => {
    let lg = getCookie('lang')?getCookie('lang'):getCookie('locale');
    return lg ? lg === 'ru' ? `${fieldName}Rus` :
           lg === 'kk' ? `${fieldName}Kz` :
            lg === 'kz' ? `${fieldName}Kz` :
             lg === 'en' ? `${fieldName}Rus` :
             `${fieldName}Kz` ? `${fieldName}Kz` :
                fieldName : `${fieldName}Rus`;
}

export const lkk = (fieldName: any) => {
    let lg = getCookie('lang')?getCookie('lang'):getCookie('locale');
    return lg ? lg === 'ru' ? `${fieldName}Ru` :
            lg === 'kk' ? `${fieldName}Kk` :
            lg === 'kz' ? `${fieldName}Kk` :
             lg === 'en' ? `${fieldName}Ru` :
              `${fieldName}Kk` ? `${fieldName}Kk` :
               fieldName : `${fieldName}Ru`;
}

export const lshortkk = (fieldName: any) => {
    let lg = getCookie('lang')?getCookie('lang'):getCookie('locale');
    return lg ? lg === 'ru' ? fieldName.ru :
            lg === 'kk' ? fieldName.kk :
            lg === 'kz' ? fieldName.kk :
             lg === 'en' ? fieldName.ru :
             fieldName.kk ? fieldName.kk :
              fieldName : fieldName.ru;
}

export const lshortkz = (fieldName: any) => {
    let lg = getCookie('lang')?getCookie('lang'):getCookie('locale');
    return lg ? lg === 'ru' ? fieldName.ru :
            lg === 'kk' ? fieldName.kz :
            lg === 'kz' ? fieldName.kz :
             lg === 'en' ? fieldName.ru :
             fieldName.kz ? fieldName.kz :
              fieldName : fieldName.ru;
}

export const getCurrentLang = () : string => {
    const currentLang = getCookie('lang')?getCookie('lang'):getCookie('locale');

    return currentLang || "kk"
}

export const lkaz = (fieldName: any) => {
    let lg = getCookie('lang')?getCookie('lang'):getCookie('locale');
    return lg ? lg === 'ru' ? `${fieldName}Rus` :
           lg === 'kk' ? `${fieldName}Kaz` :
            lg === 'kz' ? `${fieldName}Kaz` :
             lg === 'en' ? `${fieldName}Rus` :
              `${fieldName}Kaz` ? `${fieldName}Kaz` :
               fieldName : `${fieldName}Rus`;
}

export const lUCase = (fieldName: any) => {
    let lg = getCookie('lang')?getCookie('lang'):getCookie('locale');
    return lg ? lg === 'ru' ? `${fieldName}RU` :
            lg === 'kk' ? `${fieldName}KZ` :
            lg === 'kz' ? `${fieldName}KZ` :
             lg === 'en' ? `${fieldName}RU` :
             `${fieldName}KZ` ? `${fieldName}KZ` :
             fieldName : `${fieldName}RU`;
}

export const lbin = (fieldName: any) => {
    let lg = getCookie('lang')?getCookie('lang'):getCookie('locale');
    return lg ? lg === 'ru' ? `${fieldName}` :
           lg === 'kk' ? `${fieldName}Kk` :
            lg === 'kz' ? `${fieldName}Kk` :
             lg === 'en' ? `${fieldName}En` :
             `${fieldName}Kk` ? `${fieldName}Kk` :
              fieldName : `${fieldName}`;
}

export const l_kz = (fieldName: any) => {
    let lg = getCookie('lang')?getCookie('lang'):getCookie('locale');
    return lg ? lg === 'ru' ? `${fieldName}_ru` :
           lg === 'kk' ? `${fieldName}_kz` :
            lg === 'kz' ? `${fieldName}_kz` :
             lg === 'en' ? `${fieldName}_kz` :
              `${fieldName}_kz` ? `${fieldName}_kz` :
               fieldName : `${fieldName}_ru`;
}

export const l_kk = (fieldName: any) => {
    let lg = getCookie('lang')?getCookie('lang'):getCookie('locale');
    return lg ? lg === 'ru' ? `${fieldName}_ru` :
           lg === 'kk' ? `${fieldName}_kk` :
            lg === 'kz' ? `${fieldName}_kk` :
             lg === 'en' ? `${fieldName}_kk` :
              `${fieldName}_kk` ? `${fieldName}_kk` :
               fieldName : `${fieldName}_ru`;
}

export const llowkz = (fieldName: any) => {
    let lg = getCookie('lang')?getCookie('lang'):getCookie('locale');
    return lg ? lg === 'ru' ? `${fieldName}ru` :
           lg === 'kk' ? `${fieldName}kz` :
            lg === 'kz' ? `${fieldName}kz` :
             lg === 'en' ? `${fieldName}kz` :
              `${fieldName}kz` ? `${fieldName}kz` :
               fieldName : `${fieldName}ru`;
}


export default t;
