import hashlib
import hmac
import base64
from datetime import datetime, timedelta
import json

SECRET = 'YangsaL2025SecretKey'

def generate_activation_code(license_type, days):
    """
    生成最多使用3次的激活码
    license_type: 'trial' 或 'yearly'
    days: 有效期天数
    """
    # 使用特殊标记表示激活日期将在激活时确定
    activation_marker = 'ACTIVATE_DATE'
    max_uses = 3  # 最多使用3次
    
    # 创建数据包：激活标记|许可证类型|天数|最大使用次数
    data = f"{activation_marker}|{license_type}|{days}|{max_uses}"
    
    # 生成签名
    signature = hmac.new(
        SECRET.encode('utf-8'),
        data.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()[:16]
    
    # 组合数据
    combined = f"{data}|{signature}"
    
    # Base64编码并格式化
    encoded = base64.b64encode(combined.encode('utf-8')).decode('utf-8')
    formatted = encoded.replace('+', '-').replace('/', '_').replace('=', '')
    
    return formatted

def generate_batch_codes():
    """生成批量激活码"""
    codes = []
    
    # 生成试用版激活码 (30天)
    print("生成试用版激活码...")
    for i in range(1000):
        code = generate_activation_code('trial', 30)
        codes.append({
            'code': code,
            'type': 'trial',
            'days': 30,
            'max_uses': 3,
            'description': f'试用版激活码 #{i+1:04d}'
        })
    
    # 生成年度版激活码 (365天)
    print("生成年度版激活码...")
    for i in range(1000):
        code = generate_activation_code('yearly', 365)
        codes.append({
            'code': code,
            'type': 'yearly', 
            'days': 365,
            'max_uses': 3,
            'description': f'年度版激活码 #{i+1:04d}'
        })
    
    return codes

def save_codes_to_files(codes):
    """保存激活码到文件"""
    # 按类型分组
    trial_codes = [c for c in codes if c['type'] == 'trial']
    yearly_codes = [c for c in codes if c['type'] == 'yearly']
    
    # 保存试用版激活码
    with open('trial_codes.txt', 'w', encoding='utf-8') as f:
        f.write("央萨尔藏文编码转换器 - 试用版激活码\n")
        f.write("=" * 50 + "\n\n")
        for i, code_info in enumerate(trial_codes, 1):
            f.write(f"{i:04d}. {code_info['code']}\n")
            f.write(f"    类型: {code_info['description']}\n")
            f.write(f"    有效期: {code_info['days']}天\n")
            f.write(f"    最大使用次数: {code_info['max_uses']}次\n")
            f.write(f"    说明: 激活后从第一次激活当天开始计时\n")
            f.write(f"    说明: 最多可在3台设备/浏览器上使用\n\n")
    
    # 保存年度版激活码
    with open('yearly_codes.txt', 'w', encoding='utf-8') as f:
        f.write("央萨尔藏文编码转换器 - 年度版激活码\n")
        f.write("=" * 50 + "\n\n")
        for i, code_info in enumerate(yearly_codes, 1):
            f.write(f"{i:04d}. {code_info['code']}\n")
            f.write(f"    类型: {code_info['description']}\n")
            f.write(f"    有效期: {code_info['days']}天\n")
            f.write(f"    最大使用次数: {code_info['max_uses']}次\n")
            f.write(f"    说明: 激活后从第一次激活当天开始计时\n")
            f.write(f"    说明: 最多可在3台设备/浏览器上使用\n\n")
    
    # 保存JSON格式（用于数据库导入）
    with open('activation_codes.json', 'w', encoding='utf-8') as f:
        json.dump(codes, f, ensure_ascii=False, indent=2)
    
    print(f"已生成 {len(trial_codes)} 个试用版激活码")
    print(f"已生成 {len(yearly_codes)} 个年度版激活码")
    print("\n文件已保存:")
    print("- trial_codes.txt (试用版激活码)")
    print("- yearly_codes.txt (年度版激活码)")
    print("- activation_codes.json (JSON格式)")
    print("\n重要说明:")
    print("- 每个激活码最多可使用3次")
    print("- 时间从第一次激活当天开始计算")
    print("- 后续激活只能使用剩余时间")
    print("- 完全离线，无需联网")

if __name__ == "__main__":
    print("央萨尔藏文编码转换器 - 激活码生成器")
    print("=" * 50)
    
    codes = generate_batch_codes()
    save_codes_to_files(codes)
    
    print("\n激活码生成完成！")
    print("注意：每个激活码最多使用3次，时间从第一次激活开始计算") 