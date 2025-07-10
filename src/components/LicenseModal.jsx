import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';

const SECRET = 'YangsaL2025SecretKey'; // 与生成脚本一致
const TRIAL_DAYS = 30;

function verifyCode(inputCode) {
  try {
    const decoded = atob(inputCode.replace(/-/g, '+').replace(/_/g, '/'));
    const parts = decoded.split('|');
    
    if (parts.length !== 5) {
      return { valid: false, reason: 'format' };
    }
    
    const [activationMarker, licenseType, days, maxUses, sign] = parts;
    
    // 检查是否是新的激活码格式
    if (activationMarker === 'ACTIVATE_DATE') {
      const data = `${activationMarker}|${licenseType}|${days}|${maxUses}`;
      const expectedSign = CryptoJS.HmacSHA256(data, SECRET).toString().slice(0, 16);
      
      if (sign === expectedSign) {
        return { 
          valid: true, 
          licenseType,
          days: parseInt(days),
          maxUses: parseInt(maxUses)
        };
      } else {
        return { valid: false, reason: 'invalid' };
      }
    } else {
      // 兼容旧的激活码格式
      return { valid: false, reason: 'format' };
    }
  } catch {
    return { valid: false, reason: 'format' };
  }
}

function getCodeUsageInfo(code) {
  // 获取激活码使用信息
  const usageInfo = JSON.parse(localStorage.getItem('codeUsage') || '{}');
  return usageInfo[code] || null;
}

function updateCodeUsage(code, activationDate) {
  // 更新激活码使用信息
  const usageInfo = JSON.parse(localStorage.getItem('codeUsage') || '{}');
  
  if (!usageInfo[code]) {
    // 第一次使用
    usageInfo[code] = {
      firstActivation: activationDate,
      useCount: 1,
      lastUsed: activationDate
    };
  } else {
    // 后续使用
    usageInfo[code].useCount += 1;
    usageInfo[code].lastUsed = activationDate;
  }
  
  localStorage.setItem('codeUsage', JSON.stringify(usageInfo));
  return usageInfo[code];
}

function checkCodeValidity(code, maxUses, maxDays) {
  // 检查激活码是否还能使用
  const usageInfo = getCodeUsageInfo(code);
  
  if (!usageInfo) {
    return { canUse: true, reason: 'first_use' };
  }
  
  if (usageInfo.useCount >= maxUses) {
    return { canUse: false, reason: 'max_uses_reached', useCount: usageInfo.useCount };
  }
  
  // 检查是否过期（基于第一次激活时间）
  const firstActivation = new Date(usageInfo.firstActivation);
  const now = new Date();
  const daysSinceFirstActivation = Math.floor((now - firstActivation) / (1000 * 60 * 60 * 24));
  
  if (daysSinceFirstActivation >= maxDays) {
    return { canUse: false, reason: 'expired', firstActivation: usageInfo.firstActivation };
  }
  
  return { 
    canUse: true, 
    reason: 'valid', 
    useCount: usageInfo.useCount,
    firstActivation: usageInfo.firstActivation,
    daysLeft: maxDays - daysSinceFirstActivation
  };
}

function getTrialInfo() {
  let trialStart = localStorage.getItem('trialStart');
  if (!trialStart) {
    trialStart = new Date().toISOString();
    localStorage.setItem('trialStart', trialStart);
  }
  const start = new Date(trialStart);
  const now = new Date();
  const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  const left = TRIAL_DAYS - diff;
  const expireDate = new Date(start.getTime() + TRIAL_DAYS * 24 * 60 * 60 * 1000);
  return { left, expireDate };
}

export default function LicenseModal({ visible, onActivated, onClose }) {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('');
  const [activated, setActivated] = useState(false);
  const [expireDate, setExpireDate] = useState(null);
  const [trial, setTrial] = useState(getTrialInfo());

  useEffect(() => {
    // 检查本地激活状态
    const lic = localStorage.getItem('license');
    if (lic) {
      const res = verifyCode(lic);
      if (res.valid) {
        setActivated(true);
        // 计算到期日期
        const usageInfo = getCodeUsageInfo(lic);
        if (usageInfo) {
          const firstActivation = new Date(usageInfo.firstActivation);
          const expireDt = new Date(firstActivation.getTime() + res.days * 24 * 60 * 60 * 1000);
          setExpireDate(expireDt.toISOString().split('T')[0]);
          if (onActivated) onActivated(expireDt.toISOString().split('T')[0]);
        }
      } else {
        setActivated(false);
        setExpireDate(null);
      }
    }
  }, [visible]);

  const handleActivate = () => {
    const code = input.trim();
    
    // 验证激活码格式
    const res = verifyCode(code);
    if (!res.valid) {
      setStatus('fail');
      return;
    }
    
    // 检查激活码使用情况
    const validity = checkCodeValidity(code, res.maxUses, res.days);
    if (!validity.canUse) {
      if (validity.reason === 'max_uses_reached') {
        setStatus('max_uses');
      } else if (validity.reason === 'expired') {
        setStatus('expired');
        setExpireDate(validity.firstActivation);
      }
      return;
    }
    
    // 激活成功
    const activationDate = new Date().toISOString().split('T')[0];
    updateCodeUsage(code, activationDate);
    
    // 保存激活信息
    localStorage.setItem('license', code);
    localStorage.setItem('activationDate', activationDate);
    localStorage.setItem('licenseType', res.licenseType);
    
    // 计算到期日期
    const firstActivation = validity.firstActivation || activationDate;
    const firstActivationDt = new Date(firstActivation);
    const expireDt = new Date(firstActivationDt.getTime() + res.days * 24 * 60 * 60 * 1000);
    const expireDateStr = expireDt.toISOString().split('T')[0];
    
    setActivated(true);
    setExpireDate(expireDateStr);
    setStatus('success');
    if (onActivated) onActivated(expireDateStr);
  };

  // 试用到期判断
  const trialExpired = trial.left <= 0;

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-[90vw] max-w-xs border border-gray-100 relative">
        <h2 className="text-lg font-semibold text-center mb-2 text-gray-700">软件激活</h2>
        {activated ? (
          <div className="text-green-600 text-center mb-4">
            已激活，有效期至 <b>{expireDate}</b>
          </div>
        ) : trialExpired ? (
          <div className="text-red-500 text-center mb-4">试用已到期，请输入激活码</div>
        ) : (
          <div className="text-gray-500 text-center mb-4">
            当前为试用版，剩余 <b>{trial.left}</b> 天<br />
            到期后需输入激活码继续使用
          </div>
        )}
        {!activated && (
          <>
            <input
              className="w-full border rounded px-3 py-2 mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="请输入激活码"
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={activated}
            />
            <button
              className="w-full bg-blue-500 text-white rounded py-2 font-medium hover:bg-blue-600 transition mb-2"
              onClick={handleActivate}
              disabled={activated}
            >激活</button>
            {status === 'success' && <div className="text-green-600 text-center text-xs">激活成功！</div>}
            {status === 'fail' && <div className="text-red-500 text-center text-xs">激活码无效</div>}
            {status === 'expired' && <div className="text-orange-500 text-center text-xs">激活码已过期</div>}
            {status === 'max_uses' && <div className="text-red-500 text-center text-xs">激活码使用次数已达上限（10次）</div>}
          </>
        )}
        {activated && (
          <button className="absolute top-2 right-2 text-gray-400 hover:text-blue-500" onClick={onClose}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
} 