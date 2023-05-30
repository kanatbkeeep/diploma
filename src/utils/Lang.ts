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

export default t;
