 go基础

## go安装

```bash
# 查看go版本
brew search go
# 下载指定版本
brew install go@1.20
# 下载最新版本
brew install go
# 查询下载版本

```

## 设置代理

```bash
go env
go env -w GO111MODULE=on
go env -w GOPROXY='https://goproxy.cn,direct'
```

  ##  go modules

可以自动添加依赖、删除未使用的依赖项

### 查看所有依赖项

```bash
 go list -m all
```

### 查看依赖可用版本

```bash
# 查看依赖可用版本
go list -m -versions github.com/gin-gonic/gin
github.com/gin-gonic/gin v1.1.1 v1.1.2 v1.1.3 v1.1.4 v1.3.0 v1.4.0 v1.5.0 v1.6.0 v1.6.1 v1.6.2 v1.6.3 v1.7.0 v1.7.1 v1.7.2 v1.7.3 v1.7.4 v1.7.5 v1.7.6 v1.7.7 v1.8.0 v1.8.1 v1.8.2 v1.9.0 v1.9.1 v1.10.0 v1.10.1 v1.11.0 v1.12.0
# 下载指定版本
 go get github.com/gin-gonic/gin@v1.8.0
```

### go get

手动下载依赖

下载go-redis https://github.com/redis/go-redis

```bash
go get github.com/redis/go-redis/v9
```

### go mod tidy

安装清理依赖

```bash
go install # 下载依赖
go get -u # 升级到最新的次要版本或者修订版本
go get -u=patch # 升级到最新的修订版本
go get github.com/gin-gonic/gin@v1.8.0 会修改go.mod文件
go mod edit --replace github.com/xx/A=gihub.com/xx/B V1.0.0
```

## 编码规范

代码规范

- 命名规范
  - 包名
    - 尽量和目录保持一致
    - 尽量采取有意义的包名，简短
    - 不要和标准库名冲突
    - 包名采用全部小写
  - 文件名
    - user_name.go 如果有多个单词可以采用蛇形命名法
  - 变量名
    - 蛇形：python、php
    - 驼峰：java、c、go
    - userName
    - UserName
    - 专有名词命名，URLVerison
    - bool 类型，Has、is、can、allow开头
  - 结构体命名
    - 驼峰，User（导出需要首字母大写）
  - 接口命名
    - 和结构体差不多
    - 接口以er结尾
    - Type IRead interface
  - 常量命名
    - 全部大写，如果有多个单词，那么使用蛇形命名法 APP_VERSION

注释规范

- 单行注释 //
- 多行注释 /**/
- 变量后面加注释
- 包注释
- 接口注释
- 函数注释
- 代码逻辑注释 

import规范

- 分成三组 1.go自带的包 2.第三方的包 3.自己内部的包

## 单元测试

## 并发

