import React from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-300 via-gray-100 to-white p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full border border-gray-100 relative my-8 overflow-auto">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-modern-accent focus:outline-none"
          onClick={() => navigate('/')}
          aria-label="返回首页"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-xl font-semibold text-gray-700 mb-2 text-center">软件介绍</h2>
        <div className="text-gray-600 text-base leading-relaxed mb-4">
          作者：苏毗 - 贡桑次仁<br/>
          时间：2025 年 7 月 10 日<br/>
          版本：1.0 版
        </div>
        <p className="text-gray-600 mb-6 text-base leading-relaxed">
          央萨尔藏文编码转换器是一款专注于藏文信息处理的工具，旨在为藏文排版提供便利。该工具能够实现藏文班智达字体与 Unicode 编码之间的高效转换，且支持的藏文字符集全面，可满足各类使用需求。（喜马拉雅藏文字体、珠穆拉玛藏文字体等目前常用藏文字体，都是基于国际通用"Unicode 编码"开发的。）
        </p>
        <h2 className="text-xl font-semibold text-gray-700 mb-2 text-center">མཉེན་ཆས་ངོ་སྤྲོད།</h2>
        <div className="text-gray-600 text-base leading-relaxed mb-4">
          རྩོམ་པ་པོ། སུམ་པ་ཀུན་བཟང་ཚེ་རིང་།<br/>
          དུས་ཚོད། ༢༠༢༥ལོའི་ཟླ་༧པའི་ཚེས་༡༠ཉིན།<br/>
          པར་གཞི། ༡.༠
        </div>
        <p className="text-gray-600 mb-6 text-base leading-relaxed">
          དབྱངས་གསལ་་བོད་ཡིག་ཨང་སྒྲིག་སྒྱུར་ཆས་ནི་བོད་ཡིག་ཆ་འཕྲིན་བཀོལ་སྤྱོད་ལ་སྟབས་བདེ་ཡོང་བའི་ཆེད་དུ་སྒྲིག་བཟོ་བྱས་པའི་མཉེན་ཆས་ཤིག་ཡིན། མཉེན་ཆས་འདིས་པཎྜི་ཏའི་བོད་ཡིག་ཨང་སྒྲིག་དང་རྒྱལ་སྤྱིའི་སྤྱི་སྤྱོད་ཀྱི་བོད་ཡིག་ཨང་སྒྲིག་ཕན་ཚུན་བརྗེ་ཐུབ་པ་མ་ཟད། རྒྱབ་སྐྱོར་ཐུབ་པའི་བོད་ཡིག་ཡིག་རྟགས་ཀྱང་ཧ་ཅང་ཕུན་སུམ་ཚོགས་པོ་ཡོད། (ཧི་མ་ལ་ཡའི་བོད་ཡིག་ཡིག་གཟུགས་དང་ཇོ་མོ་གླང་མའི་བོད་ཡིག་ཡིག་གཟུགས་སོགས། མིག་སྔར་སྤྱོད་བཞིན་པའི་་བོད་ཡིག་ཡིག་གཟུགས་མང་ཆེ་བ་རྒྱལ་སྤྱིའི་སྤྱི་སྤྱོད་ཨང་སྒྲིག་"Unicode"ལ་གཞིགས་ནས་གསར་སྤེལ་བྱས་པ་ཡིན།།)
        </p>
        <h3 className="text-lg font-medium text-gray-700 mb-2 mt-6">免责声明</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          本软件免费提供，允许用户使用。虽然我们在开发过程中尽了最大努力确保软件的准确性和稳定性，但不保证在所有系统环境下都能完全正常运行。对于因使用本软件而导致的任何直接或间接损失，作者不承担法律责任。当用户使用本软件时，即表示已充分了解并同意本声明内容。另未经许可，禁止售卖软件，对软件进行反向工程、修改、分发等任何非法使用行为。希望大家合理使用，共同维护良好的软件使用环境。
        </p>
        <h3 className="text-lg font-medium text-gray-700 mb-2">འགན་མེད་གསལ་བསྒྲགས།</h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          མཉེན་ཆས་འདི་རིན་མེད་སྤྱོད་ཆོག་པ་ཡིན། ང་ཚོས་གསར་སྤེལ་བྱེད་པའི་བརྒྱུད་རིམ་ཁྲོད་དུ་མཉེན་ཆས་བཀོལ་སྤྱོད་ཡང་དག་དང་བརྟན་པོ་ཡོང་བའི་ཆེད་དུ་འབད་ཐབས་སྣ་ཚོགས་བྱས་མོད། འོན་ཀྱང་རྩིས་འཕྲུལ་གྱི་མ་ལག་ཡོད་ཚད་ཀྱི་ཁོར་ཡུག་གི་འོག་ཏུ་ཡོངས་སུ་ཡང་དག་པར་སྤྱོད་ཐུབ་པའི་ཁེས་ལེན་བྱེད་མི་ཐུབ། མཉེན་ཆས་འདི་བེད་སྤྱོད་བྱས་རྗེས་ཡིག་སྒྱུར་ནང་དོན་ཡང་དག་མིན་པ་དང་ཡིག་སྒྱུར་ནང་དོན་ཆ་མི་ཚང་བ་བཅས་ཀྱི་གནད་དོན་ལས་གྱོང་གུད་གང་རུང་བྱུང་ཚེ། རྩོམ་པ་པོ་ལ་དེ་འབྲེལ་གྱི་འགན་འཁྲི་གང་ཡང་མེད། སྐུ་ཉིད་ཀྱིས་མཉེན་ཆས་འདི་བེད་སྤྱོད་བྱས་ཚེ། གསལ་བསྒྲགས་འདིའི་ནང་དོན་་ཤེས་རྟོགས་གང་ལེགས་བྱུང་བ་མ་ཟད་དེར་མོས་མཐུན་ཡོད་པར་མཚོན། ། གཞན་ཡང་རྩོམ་པ་པོས་ཆོག་མཆན་མེད་པར་མཉེན་ཆས་འཚོང་བ་དང་དེའི་ཨང་སྒྲིག་ལ་ལྡོག་ཕྱོགས་ཀྱི་བཟོ་སྐྲུན་དང་། བཟོ་བཅོས་རྒྱག་པ། བགོས་འགྲེམ་སོགས་ཁྲིམས་འགལ་གྱི་བེད་སྤྱོད་བྱེད་པའི་བྱ་སྤྱོད་སྤེལ་མི་ཆོག
        </p>
      </div>
    </div>
  );
} 