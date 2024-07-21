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

## 使用node连接mongodb

https://www.npmjs.com/package/mongodb

```
npm init -y
npm install mongodb
```

index.js

```js
const {MongoClient} = require('mongodb')
const client = new MongoClient('mongodb://127.0.0.1:27017')
const main = async () => {
  await client.connect()
  const db = client.db('test1')
  const users = db.collection('users')
  const res = await users.find()
  console.log(await res.toArray());
}
main().finally(() => client.close())
```

命令行执行

```bash
node index.js
```

