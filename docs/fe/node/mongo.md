## 安装
### 在mac下使用homebrew安装mongo
https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/

```bash
brew tap mongodb/brew
brew update
brew install mongodb-community@7.0
brew services start mongodb-community@7.0 # 启动mongo服务
mongosh # 连接数据库
show dbs; # 显示数据库
```

Mongo Shell 执行环境

windows添加环境变量