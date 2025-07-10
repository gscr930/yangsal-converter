#!/bin/bash

# 央萨尔藏文编码转换器 - 自动部署脚本
echo "🚀 开始部署央萨尔藏文编码转换器..."

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：请在项目根目录运行此脚本"
    exit 1
fi

# 步骤1：重新构建项目
echo "📦 重新构建项目..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败，请检查错误信息"
    exit 1
fi

# 步骤2：清理并重新创建docs目录
echo "🗂️  准备docs目录..."
rm -rf docs
mkdir -p docs
cp -r build/* docs/

# 步骤3：检查Git状态
if [ ! -d ".git" ]; then
    echo "📝 初始化Git仓库..."
    git init
    git add .
    git commit -m "Initial commit - 央萨尔藏文编码转换器"
    echo "⚠️  请手动设置远程仓库："
    echo "   git remote add origin https://github.com/你的用户名/yangsal-tibetan-converter.git"
    echo "   git push -u origin main"
else
    echo "📝 提交更改..."
    git add .
    git commit -m "Update deployment - $(date)"
    
    # 检查是否有远程仓库
    if git remote -v | grep -q "origin"; then
        echo "🚀 推送到远程仓库..."
        git push
    else
        echo "⚠️  请手动设置远程仓库："
        echo "   git remote add origin https://github.com/你的用户名/yangsal-tibetan-converter.git"
        echo "   git push -u origin main"
    fi
fi

echo "✅ 部署准备完成！"
echo ""
echo "📋 下一步操作："
echo "1. 在GitHub上创建新仓库：yangsal-tibetan-converter"
echo "2. 设置仓库为Public（免费用户要求）"
echo "3. 运行以下命令推送代码："
echo "   git remote add origin https://github.com/你的用户名/yangsal-tibetan-converter.git"
echo "   git push -u origin main"
echo "4. 在GitHub仓库设置中启用Pages："
echo "   - 进入Settings > Pages"
echo "   - Source选择 'Deploy from a branch'"
echo "   - Branch选择 'main'，文件夹选择 '/docs'"
echo "5. 等待几分钟，网站将在以下地址可用："
echo "   https://你的用户名.github.io/yangsal-tibetan-converter"
echo ""
echo "🎉 部署完成后，用户可以通过激活码使用你的应用！" 