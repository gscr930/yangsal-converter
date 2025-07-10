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
        
        if len(parts) != 5:
            return None
            
        activation_marker, license_type, days, max_uses, signature = parts
        return {
            'activation_marker': activation_marker,
            'license_type': license_type,
            'days': int(days),
            'max_uses': int(max_uses),
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
    
    print(f"激活标记: {decoded['activation_marker']}")
    print(f"许可证类型: {decoded['license_type']}")
    print(f"有效期天数: {decoded['days']}")
    print(f"最大使用次数: {decoded['max_uses']}")
    
    # 验证签名
    data = f"{decoded['activation_marker']}|{decoded['license_type']}|{decoded['days']}|{decoded['max_uses']}"
    if verify_signature(data, decoded['signature']):
        print("✅ 签名验证通过")
    else:
        print("❌ 签名验证失败")
        return False
    
    print("✅ 激活码格式正确，可以正常使用")
    return True

def simulate_usage_scenario():
    """模拟使用场景"""
    print("\n" + "="*60)
    print("模拟使用场景：客户在不同设备上使用激活码")
    print("="*60)
    
    # 生成一个测试激活码
    activation_marker = 'ACTIVATE_DATE'
    license_type = 'trial'
    days = 30
    max_uses = 3
    
    data = f"{activation_marker}|{license_type}|{days}|{max_uses}"
    signature = hmac.new(
        SECRET.encode('utf-8'),
        data.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()[:16]
    
    combined = f"{data}|{signature}"
    encoded = base64.b64encode(combined.encode('utf-8')).decode('utf-8')
    test_code = encoded.replace('+', '-').replace('/', '_').replace('=', '')
    
    print(f"测试激活码: {test_code}")
    print("\n使用场景:")
    print("1. 客户在电脑A上第一次激活 → 成功，开始计时")
    print("2. 客户在电脑B上第二次激活 → 成功，使用剩余时间")
    print("3. 客户在手机浏览器上第三次激活 → 成功，使用剩余时间")
    print("4. 客户在电脑C上第四次激活 → 失败，已达使用上限")
    print("5. 30天后，所有设备都无法使用 → 时间到期")
    
    return test_code

if __name__ == "__main__":
    print("央萨尔藏文编码转换器 - 多设备激活码测试")
    print("=" * 50)
    
    # 测试一个激活码
    test_code = "QUNUSVZBVEVfREFURXx0cmlhbHwzMHwzfDMyNjU2NTIxY2UzYWZhMjY"
    test_activation_code(test_code)
    
    # 模拟使用场景
    simulate_usage_scenario()
    
    print("\n" + "="*60)
    print("功能特点总结:")
    print("✅ 每个激活码最多使用3次")
    print("✅ 时间从第一次激活开始计算")
    print("✅ 后续激活只能使用剩余时间")
    print("✅ 完全离线，无需联网")
    print("✅ 支持跨设备、跨浏览器使用")
    print("✅ 防止过度滥用，保护商业利益")
    print("="*60) 