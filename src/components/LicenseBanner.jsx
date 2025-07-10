import React from 'react';

export default function LicenseBanner({ expireDate }) {
  if (!expireDate) return null;
  const now = new Date();
  const exp = new Date(expireDate);
  const left = Math.ceil((exp - now) / (1000 * 60 * 60 * 24));
  if (left > 7) return null;
  if (left < 0) return null;
  return (
    <div className="fixed top-0 left-0 w-full z-40 bg-gradient-to-r from-yellow-200 via-yellow-100 to-white text-yellow-800 text-center py-2 shadow-md animate-pulse select-none">
      <b>激活授权即将到期</b>，剩余 <span className="font-bold text-orange-600">{left}</span> 天（到期日：{expireDate}），请及时续费！
    </div>
  );
} 