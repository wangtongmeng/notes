RUN 是构建镜像时执行的

CMD 是构建容器时执行的

docker-compose 安装

https://www.runoob.com/docker/docker-compose.html

## docker 镜像源

docker被墙替换镜像 https://cloud.tencent.com/developer/article/2428707

```bash
sudo mkdir -p /etc/docker
#sudo tee /etc/docker/daemon.json <<-'EOF'
#{
#  "registry-mirrors": ["https://fwvjnv59.mirror.aliyuncs.com"]
#}
#EOF

sudo tee /etc/docker/daemon.json <<-'EOF'
{ 
  "registry-mirrors" : 
    [ 
      "https://docker.m.daocloud.io", 
      "https://noohub.ru", 
      "https://huecker.io",
      "https://dockerhub.timeweb.cloud" 
    ] 
}
EOF

sudo systemctl daemon-reload
sudo systemctl restart docker.service
```

