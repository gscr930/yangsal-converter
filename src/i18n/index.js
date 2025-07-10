import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zh from './zh.json';
import bo from './bo.json';

const savedLang = localStorage.getItem('lang') || 'zh';
i18n
  .use(initReactI18next)
  .init({
    resources: {
      zh: { translation: zh },
      bo: { translation: bo },
    },
    lng: savedLang,
    fallbackLng: 'zh',
    interpolation: { escapeValue: false },
  });

// 劫持changeLanguage，切换时写入localStorage
const realChangeLanguage = i18n.changeLanguage.bind(i18n);
i18n.changeLanguage = function(lang, ...args) {
  localStorage.setItem('lang', lang);
  return realChangeLanguage(lang, ...args);
};

export default i18n; 