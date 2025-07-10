import React from "react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./components/LanguageSelector";
import EnterButton from "./components/EnterButton";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import About from "./pages/About";
import ConvertPage from "./pages/ConvertPage";
import LicenseModal from './components/LicenseModal';
import LicenseBanner from './components/LicenseBanner';

function HomeCard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <div className="relative z-10 flex flex-col items-center -mt-20 bg-white rounded-3xl shadow-2xl p-12 mx-8 max-w-4xl w-full border border-gray-100">
        <h2 className="text-3xl md:text-5xl font-extralight text-gray-500 mb-6 text-center tracking-wide">
          {t('appNameBo')}
        </h2>
        <h1 className="text-2xl md:text-4xl font-light text-gray-500 mb-8 text-center tracking-wide">
          {t('appNameZh')}
        </h1>
        <LanguageSelector />
        <EnterButton onEnter={() => navigate('/convert')} />
        {/* 关于按钮 */}
        <button
          className="absolute bottom-3 right-4 px-3 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-modern-accent shadow focus:outline-none focus:ring-2 focus:ring-modern-accent focus:ring-opacity-50 text-sm font-medium"
          onClick={() => navigate('/about')}
        >
          关于（དེ་འབྲེལ།）
        </button>
      </div>
      <div className="mt-4 text-xs text-gray-400 text-center select-none">
        © 2025.07.10 - 版本 1.0.0
      </div>
    </>
  );
}

export default function App() {
  const [licenseVisible, setLicenseVisible] = React.useState(false);
  const [expireDate, setExpireDate] = React.useState(null);

  React.useEffect(() => {
    // 检查激活状态和试用期
    const lic = localStorage.getItem('license');
    let valid = false;
    let exp = null;
    if (lic) {
      try {
        const decoded = atob(lic.replace(/-/g, '+').replace(/_/g, '/'));
        const [ed, sign] = decoded.split('|');
        // 简单校验（与LicenseModal一致）
        const CryptoJS = window.CryptoJS;
        if (CryptoJS) {
          const expectedSign = CryptoJS.HmacSHA256(ed, 'YangsaL2025SecretKey').toString().slice(0, 16);
          if (sign === expectedSign) {
            exp = ed;
            valid = new Date() <= new Date(ed);
          }
        }
      } catch {}
    }
    if (!valid) setLicenseVisible(true);
    setExpireDate(exp);
  }, []);

  return (
    <Router>
      <LicenseBanner expireDate={expireDate} />
      <LicenseModal visible={licenseVisible} onActivated={ed => { setExpireDate(ed); setLicenseVisible(false); }} onClose={() => setLicenseVisible(false)} />
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-300 via-gray-100 to-white overflow-hidden">
        <Routes>
          <Route path="/" element={<HomeCard />} />
          <Route path="/about" element={<About />} />
          <Route path="/convert" element={<ConvertPage />} />
        </Routes>
      </div>
    </Router>
  );
} 