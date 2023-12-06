express中间件基本使用

中间件分类

- 应用程序级别中间件
- 路由级别中间件
- 错误处理中间件
- 内置中间件
- 第三方中间件

## 使用 node 连接 mongo数据库

### 创建项目并安装依赖

```bash
npm init -y
npm i mongodb
```

### index.js

```js
const {MongoClient} = require('mongodb')
const client = new MongoClient('mongodb://127.0.0.1:27017')


// const main = async () => {
//   await client.connect()
//   const db = client.db('test1')
//   const users = db.collection('users')
//   const res = await users.find()
//   console.log(await res.toArray());
// }
// main().finally(() => client.close())

const clientFun = async function(c) {
  await client.connect()
  const db = client.db('test1') // 数据库名称
  return db.collection(c)
}

const main = async () => {
  const users = await clientFun('users')

  // 查询集合全部
  // const res = await users.find()
  // console.log(await res.toArray());

  // 插入一条
  // const d = await users.insertOne({name: 'lisi', age: 18})
  // console.log(d);

  // 插入多条
  // const d = await users.insertMany([
  //   {name: 'user1', age: 1},
  //   {name: 'user2', age: 2},
  //   {name: 'user3', age: 3},
  //   {name: 'user4', age: 4},
  // ])
  // console.log(d);

  // 查询集合中的一条
  // const d = await users.findOne({age: {$gt: 15}})
  // console.log(d);

  // 更新集合中的一条
  // const d = await users.updateOne({age: {$gt: 15}}, {$set: {name: 'lisi-update'}})
  // console.log(d);

  // 更新集合中的多条
  // const d = await users.updateMany({age: {$lt: 15}}, {$set: {name: 'lisi-update'}})
  // console.log(d);

  // 删除集合中的一条
  // const d = await users.deleteOne({age: {$lt: 10}})
  // console.log(d);

   // 删除集合中的多条
   const d = await users.deleteMany({age: {$lt: 10}})
   console.log(d);
}
main().finally(() => client.close()) // 需要手动断开
```

## 执行文件

```bash
nodemon ./index.js
```

## 项目基础设计搭建优化

核心就是router路由层只做路由的事情，controller来处理具体路由的事情

### 安装依赖

```bash
npm i express cors morgan
```

基础中间件、路由模块、业务逻辑模块

### app.js

```js
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

const router = require('./router')

const PORT = process.env.PORT || 3000

// 解析客户端请求中间件
app.use(express.json())
app.use(express.urlencoded())
// 跨域
app.use(cors())
// 日志
app.use(morgan('dev')) // 开发环境记录日志

app.use('/api/v1', router)

app.listen(PORT, () => {
  console.log(`Server is running at http://127.0.0.1:${PORT}`);
})
```

### router/index.js

```js
const express = require('express')

const router = express.Router()

router.use('/user', require('./user'))
router.use('/video', require('./video'))

module.exports = router
```

### router/user.js

```js
const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
router.get('/', (req, res) => {
  res.send('/index')
})
router
.get('/list', userController.list)
.delete('/', userController.delete)

module.exports = router
```

### router/video.js

```js
const express = require('express')
const router = express.Router()
const videoController = require('../controller/videoController')
router.get('/', videoController.index)
router.get('/list', videoController.list)

module.exports = router
```

### controller/index.js

### controller/userController.js

```js
exports.list = async (req, res) => {
  res.send('/users')
}

exports.delete = async (req, res) => {
  
}
```

### controller/videoController.js

```js
exports.list = async (req, res) => {
  res.send('/list')
}

exports.index = async (req, res) => {
  res.send('/index')
}
```

### package.json

```json
{
  "scripts": {
    "dev": "nodemon ./app.js"
  },
  "description": "",
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "morgan": "^1.10.0"
  }
}
```

### 启动项目

```bash
npm run dev
```

通过postman访问

```bash
http://127.0.0.1:3000/api/v1/user
http://127.0.0.1:3000/api/v1/user/list
http://127.0.0.1:3000/api/v1/video
http://127.0.0.1:3000/api/v1/video/list
```

## 用户注册 - Mongoose 数据库模型

https://mongoosejs.com/

### 安装依赖

```bash
npm i mongoose
```

### model/index.js

通过mongose连接数据库，不用关心手动断开的问题，这里创建定义一个Schema，并以此创建一个model，并写入数据库，通过node 执行index.js

```js
const mongoose = require('mongoose')
async function main() {
  await mongoose.connect('mongodb://localhost:27017/test1')
}
main().then(res => {
  console.log('mongo连接成功');
}).catch(err => {
  console.log(err);
  console.log('mongo连接失败');
})

const user = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
})

const userModel = mongoose.model("User", user) // 第一个参数如果数据库没有，则则会创建并加上s
const u = new userModel({name: 'lisi', age: 100})
u.save() // 写入数据库
```

### 拆分

schema都在各自的model中定义，在model/index.js中集中导出，在controller中执行具体的业务逻辑

#### model/index.js

```js
const mongoose = require('mongoose')
async function main() {
  await mongoose.connect('mongodb://localhost:27017/test1')
}
main().then(res => {
  console.log('mongo连接成功');
}).catch(err => {
  console.log(err);
  console.log('mongo连接失败');
})

module.exports = {
  User: mongoose.model('User', require('./userModel'))
}
```

#### model/userModel.js

```js
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  // 头像
  image: {
    type: String,
    default: null
  },
  createAt: {
    type: Date,
    default: Date.now()
  },
  updateAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = userSchema
```

#### controller/userController.js

```js
const {User} = require('../model/index')
exports.register = async (req, res) => {
  console.log(req.body);
  const userModel = new User(req.body)
  const dbback = await userModel.save()
  res.status(201).json(dbback)
}

exports.list = async (req, res) => {
  res.send('/users')
}

exports.delete = async (req, res) => {

}
```

#### 启动服务

```bash
npm run dev
```



#### 通过 postman访问

```bash
http://127.0.0.1:3000/api/v1/user/register
body
{
name:lisi
email:xxx@163.com
phone:1892371923
password:asfasdfs
}
```

## 客户端提交数据安全校验

https://express-validator.github.io/docs

### 安装依赖

```bash
npm install express-validator
```

## express-video 接口文档

restful api接口设计规范 https://restfulapi.cn/

### 接口说明

- 基于 RESTful API 接口规范
- 基于 JWT 身份认证
- 使用 CORS 跨域
- 接口基础请求地址： `http://127.0.0.1:3000/api/v1`
- 使用 JSON 格式进行数据通信 

### 用户注册

path: `/user/register`

method: `post`

是否认证：否

| 字段名   | 字段类型 | 是否必须 |
| -------- | -------- | -------- |
| name     | string   | 是       |
| email    | string   | 是       |
| phone    | string   | 是       |
| password | string   | 是       |

请求示例：

```json
{
    "name": "lisi",
    "email": "xxx@xx.com",
    "password": "123",
    "phone": 123123128
}
```

响应示例：

```json
// success
{
    "name": "lisi",
    "email": "xxx@xx.com",
    "password": "123",
    "phone": "123123128",
    "image": null,
    "createAt": "2023-11-29T13:23:53.576Z",
    "updateAt": "2023-11-29T13:23:53.576Z",
    "_id": "65673b6c1b7ef1842423d894",
    "__v": 0
}
```

```json
// error
{
    "error": [
        {
            "type": "field",
            "value": "",
            "msg": "用户名不能为空",
            "path": "name",
            "location": "body"
        }
    ]
}
```

## 用户登录

## 用户登录认证与接口鉴权

### JWT 身份认证

https://restfulapi.cn/jwt

https://jwt.io/libraries

https://github.com/auth0/node-jsonwebtoken

### 安装依赖

```bash
npm install jsonwebtoken
```

### vscode插 件

uuid generator

### router/user.js

```js
const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const validator = require('../middleware/validator/userValidator')
const { verifyToken } = require('../util/jwt')

router.get('/', (req, res) => {
  res.send('/index')
})
router
  .post('/register', validator.register, userController.register) // validator.register 使用中间件校验
  .post('/login', validator.login, userController.login)
  .get('/list', verifyToken, userController.list) // 用户列表接口，需要做登录认证
  .delete('/', userController.delete)

module.exports = router
```

### controller/userController.js

登录时会创建token并返回，请求其他接口时，会在headers中携带token

```js
const {User} = require('../model/index')
const jwt = require('jsonwebtoken')
const {createToken} = require('../util/jwt')

// 用户注册
exports.register = async (req, res) => {
  console.log(req.body);
  const userModel = new User(req.body)
  const dbback = await userModel.save()
  res.status(201).json(dbback)
}
// 用户登录
exports.login = async (req, res) => {
  // 客户端数据验证
  // 连接数据库查询
  let dbBack = await User.findOne(req.body)
  if (!dbBack) {
    res.status(402).json({error: '邮箱或密码不正确'})
  }
  
  dbBack = dbBack.toJSON()
  // dbBack.token = jwt.sign(dbBack, '83d04a25-4be9-46ea-aa08-760b4bc55276')
  dbBack.token = await createToken(dbBack)
  res.status(200).json(dbBack)
}
exports.list = async (req, res) => {
  res.send('/users')
}

exports.delete = async (req, res) => {

}
```

### util/jwt.js

```js
// const jwt = require('jsonwebtoken')
// var token = jwt.sign({foo: 'hello'}, '555')
// console.log(token); // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJoZWxsbyIsImlhdCI6MTcwMTMwMDI5OH0.BXfJUKYUSElBYf7PPrwhp5JiHOE2bCo6ATO42k9PC4I
// var jwts = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJoZWxsbyIsImlhdCI6MTcwMTMwMDI5OH0.BXfJUKYUSElBYf7PPrwhp5JiHOE2bCo6ATO42k9PC4I', '555')
// console.log(jwts); // { foo: 'hello', iat: 1701300298 }

const jwt = require('jsonwebtoken')
const {promisify}  = require('util')
const tojwt = promisify(jwt.sign)
const verify = promisify(jwt.verify)
const {uuid} = require('../config/config.default')

// 在需要登录认证的地方，通过中间件的形式使用，这里在 router/user中的list路由使用
module.exports.verifyToken = async (req, res, next) => {
  let token = req.headers.authorization
  token = token ? token.split('Bearer ')[1] : null
  if (!token) {
    res.status(402).json({error: '请传入 token'})
  }
  try {
    let userInfo = await verify(token, uuid)
    console.log(userInfo);
    next()
  } catch (error) {
    res.status(402).json({error: '无效的token'})
  }
  
}

module.exports.createToken = async userInfo => {
  return await tojwt({userInfo}, uuid, {expiresIn: 60 * 60 * 24}) // 过期时间一天
}
```

### config/config.default.js

```js
module.exports.uuid = '1cef5744-7329-4a8a-9067-a31a1be5331b' // 通过vscode uuid生成
```

## 频道创建与用户信息修改

### router/user.js

```diff
const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const validator = require('../middleware/validator/userValidator')
const { verifyToken } = require('../util/jwt')

router.get('/', (req, res) => {
  res.send('/index')
})
router
  .post('/register', validator.register, userController.register) // validator.register 使用中间件校验
  .post('/login', validator.login, userController.login)
  .get('/list', verifyToken, userController.list) // 用户列表接口，需要做登录认证
+  .put('/', verifyToken, validator.update, userController.update) // 修改用户信息
  .delete('/', userController.delete)

module.exports = router
```

### middleware/validator/userValidator.js

```diff
const { body } = require('express-validator')
const validate = require('./errorBack')
const { User } = require('../../model')
module.exports.register = validate([
  body('name')
    .notEmpty().withMessage('用户名不能为空').bail() // bail 如果验证通过才往下走
    .isLength({ min: 3 }).withMessage('用户名长度不能小于3').bail(),
  body('email')
    .notEmpty().withMessage('邮箱不能为空').bail()
    .isEmail().withMessage('邮箱格式不正确').bail()
    .custom(async val => {
      const emailValidate = await User.findOne({ email: val })
      if (emailValidate) {
        return Promise.reject('邮箱已被注册')
      }
    }).bail(),
  body('phone')
    .notEmpty().withMessage('手机号不能为空').bail()
    .custom(async val => {
      const phoneValidate = await User.findOne({ phone: val })
      if (phoneValidate) {
        return Promise.reject('手机号已被注册')
      }
    }).bail(),
  body('password')
    .notEmpty().withMessage('密码不能为空').bail()
    .isLength({ min: 5 }).withMessage('密码长度不能小于5').bail(),

])

module.exports.login = validate([
  body('email')
    .notEmpty().withMessage('邮箱不能为空').bail()
    .isEmail().withMessage('邮箱格式不正确').bail()
    .custom(async val => {
      const emailValidate = await User.findOne({ email: val })
      if (!emailValidate) {
        return Promise.reject('邮箱未注册')
      }
    }).bail(),
  body('password')
    .notEmpty().withMessage('密码不能为空').bail()
])

+module.exports.update = validate([
  body('email')
    .custom(async val => {
      const emailValidate = await User.findOne({ email: val })
      if (emailValidate) {
        return Promise.reject('邮箱已注册')
      }
    }).bail(),
  body('name')
    .custom(async val => {
      const nameValidate = await User.findOne({ name: val })
      if (nameValidate) {
        return Promise.reject('用户名已注册')
      }
    }).bail(),
    body('phone')
    .custom(async val => {
      const phoneValidate = await User.findOne({ phone: val })
      if (phoneValidate) {
        return Promise.reject('手机已注册')
      }
    }).bail(),
+])
```

### controller/userController.js

```js
exports.update = async (req, res) => {
  console.log('1',req);
  let dbBack = await User.findByIdAndUpdate(req.user.userInfo._id, req.body, {new: true})
  res.status(202).json({user: dbBack})
}
```

## 文件上传

https://www.npmjs.com/package/multer



