## docker 安装 pxc 集群

```bash
docker pull percona/percona-xtradb-cluster
```

创建内部集群

出于安全考虑，需要给 PXC 集群实例创建 Dockerj 内部网络

```bash
docker network create --subnet=172.18.0.0/24 znet  # 172.18.0.0/24 网段/子网掩码 
docker network inspect znet
docker network rm znet
```

创建 Docker 卷

```bash
docker volume create --name v1
```

创建PXC容器

<img src="http://cdn.wangtongmeng.com/20240724162106.png" style="zoom:33%;" />

配置haproxy https://zhangge.net/5125.html



进入haproxy，并启动它

```bash
docker exec -it haproxy1 bash
启动 haproxy
haproxy -f /usr/local/etc/haproxy/haproxy.cfg # -f 是加载的意思
```

