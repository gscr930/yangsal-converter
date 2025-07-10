import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const isChinese = i18n.language === 'zh';

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="flex items-center gap-4 mt-6">
      <span className={`text-sm font-medium transition-colors duration-300 ${
        isChinese ? 'text-modern-accent' : 'text-gray-500'
      }`}>
        中文
      </span>
      <div className="relative">
        <button
          className={`w-16 h-8 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-modern-accent focus:ring-opacity-50 ${
            isChinese 
              ? 'bg-modern-accent shadow-lg' 
              : 'bg-gray-300'
          }`}
          onClick={() => handleLanguageChange(isChinese ? 'bo' : 'zh')}
        >
          <div className={`w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-300 ease-in-out transform ${
            isChinese ? 'translate-x-8' : 'translate-x-1'
          }`} />
        </button>
      </div>
      <span className={`text-sm font-medium transition-colors duration-300 ${
        !isChinese ? 'text-modern-accent' : 'text-gray-500'
      }`}>
        བོད་ཡིག
      </span>
    </div>
  );
} 