## K8S初始化报错：CRI v1 runtime API is not implemented for endpoint \"unix:///var/run/containerd/containerd.sock\"

参考 https://www.cnblogs.com/yourstars/p/17572125.html

```bash
vi /etc/containerd/config.toml

# 注释掉其中的
# disabled_plugins = ["cri"]

# 重启 containerd 和 kubelet 服务
systemctl restart containerd
systemctl restart kubelet

# 拉取组件名
kubeadm config images pull --config init-kubeadm.conf
```

