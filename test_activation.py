import hashlib
import hmac
import base64
from datetime import datetime, timedelta

SECRET = 'YangsaL2025SecretKey'

def decode_activation_code(code):
    """解码激活码"""
    try:
        decoded = base64.b64decode(code.replace('-', '+').replace('_', '/') + '==').decode('utf-8')
        parts = decoded.split('|')
        
        if len(parts) != 4:
            return None
            
        activation_date, expire_date, license_type, signature = parts
        return {
            'activation_date': activation_date,
            'expire_date': expire_date,
            'license_type': license_type,
            'signature': signature
        }
    except:
        return None

def verify_signature(data, signature):
    """验证签名"""
    expected = hmac.new(
        SECRET.encode('utf-8'),
        data.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()[:16]
    return signature == expected

def test_activation_code(code):
    """测试激活码"""
    print(f"测试激活码: {code}")
    
    # 解码
    decoded = decode_activation_code(code)
    if not decoded:
        print("❌ 激活码格式错误")
        return False
    
    print(f"激活日期: {decoded['activation_date']}")
    print(f"到期日期: {decoded['expire_date']}")
    print(f"许可证类型: {decoded['license_type']}")
    
    # 验证签名
    data = f"{decoded['activation_date']}|{decoded['expire_date']}|{decoded['license_type']}"
    if verify_signature(data, decoded['signature']):
        print("✅ 签名验证通过")
    else:
        print("❌ 签名验证失败")
        return False
    
    # 检查是否过期
    expire_date = datetime.strptime(decoded['expire_date'], '%Y-%m-%d')
    now = datetime.now()
    
    if now <= expire_date:
        print("✅ 激活码未过期")
        days_left = (expire_date - now).days
        print(f"剩余天数: {days_left}")
        return True
    else:
        print("❌ 激活码已过期")
        return False

if __name__ == "__main__":
    # 测试一个激活码
    test_code = "MjAyNS0wNy0xMHwyMDI1LTA4LTA5fHRyaWFsfGE4NjhiODYzMDEyYmI0YWE"
    test_activation_code(test_code)
    
    print("\n" + "="*50)
    print("生成一个新的测试激活码")
    
    # 生成一个新的激活码
    activation_date = datetime.now().strftime('%Y-%m-%d')
    expire_date = (datetime.now() + timedelta(days=30)).strftime('%Y-%m-%d')
    license_type = 'trial'
    
    data = f"{activation_date}|{expire_date}|{license_type}"
    signature = hmac.new(
        SECRET.encode('utf-8'),
        data.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()[:16]
    
    combined = f"{data}|{signature}"
    encoded = base64.b64encode(combined.encode('utf-8')).decode('utf-8')
    new_code = encoded.replace('+', '-').replace('/', '_').replace('=', '')
    
    print(f"新生成的激活码: {new_code}")
    test_activation_code(new_code) 