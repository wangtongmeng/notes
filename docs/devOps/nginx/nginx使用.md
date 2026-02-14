## 什么时候放 nginx.conf 什么时候放default.conf

全局配置放 nginx.conf 针对所有的 server 生效

dfault.conf 对应一个站点的数据，内部通常是一个http server

## server 匹配顺序

- 精确匹配
- *在前
- *在后
- 按文件中的顺序匹配正则式域名
- default server

```bash
server { # 1
	server_name www.baidu.com
}

server { # 2
	server_name *.baidu.com
}
server { # 3
	server_name www.baidu.*
}
server { # 4
	server_name \w+.baidu.\w+
}
server { # 5
	server_name default_server
}
```



## nginx.conf的优先级

nginx.conf 包含 default.conf ，被包含的优先级高

## 一个nginx可以配多个域名

一个http中可以挂多个server，每个 server 对应一个网站

修改hosts 

```bash
vi /ets/hosts
43.138.67.183 www.tmbaidu.com
43.138.67.183 www.tmqq.com

ping www.tmbaidu.com


mkdir -p /data/baidu
echo baidu > /data/baidu/index.html
mkdir -p /data/qq
echo qq > /data/qq/index.html

cd /etc/nginx/conf.d
cp default.conf baidu.conf
cp default.conf qq.conf

```

修改 baidu.conf

```bash
# vi baidu.conf
server {
    listen       80;
    server_name  www.tmbaidu.com; # 1

    location / {
        root   /data/baidu; # 2
        index  index.html index.htm;
    }
}
```

修改 qq.conf

```bash
# cp baid.conf qq.conf
# vi qq.conf
server {
    listen       80;
    server_name  www.qq.com; # 1

    location / {
        root   /data/qq; # 2
        index  index.html index.htm;
    }
}
```

重启 nginx

```bash
nginx -t # 检查 nginx
systemctl reload nginx.service
```

访问

```bash
curl http://www.tmbaidu.com
baidu
curl http://www.tmqq.com
qq
```

## 一个 server 可以配多个 location

每个 server 可以配多个 location，每个 location 代表不同的路径处理

```bash
# vi baidu.conf
server {
    listen       80;
    server_name  www.tmbaidu.com;

    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /data/baidu;
        index  index.html index.htm;
    }
    location = /a {
	return 200 'a'; # 1
    }
    location = /b {
        return 200 'b'; # 2
    }
}
```

重启访问

```bash
systemctl reload nginx.service
curl http://www.tmbaidu.com/a
a
curl http://www.tmbaidu.com/b
b
```



## xshell 连接 云服务器乱码

工具栏设置语言为utf-8即可

## 云服务器 xshell4 连接报错

https://blog.csdn.net/jamesdodo/article/details/127781909

```bash
vi /etc/ssh/sshd_config

# 添加 注释掉原来的
KexAlgorithms +diffie-hellman-group-exchange-sha256,diffie-hellman-group1-sha1
!x
# 重启
sudo systemctl restart sshd
```

## 统一腾讯云时区

```bash
# 检查当前时间服务
sudo systemctl status ntpd
sudo systemctl status chronyd
# 停止 NTP 服务
sudo systemctl stop ntpd
sudo systemctl stop chronyd
# 统一腾讯云时区
sudo ntpdate time.tencent.com
```

## 设置 docker 开机启动

```bash
systemctl enable docker
```





