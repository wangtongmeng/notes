# gi t

## git  stash 

### 基础操作

```bash
# 暂存当前修改（含未跟踪文件）
git stash push -u -m "暂存描述"

# 暂存指定文件
git stash push path/to/file.vue

# 查看暂存列表（简洁格式）
git stash list --format="%gd: %gs" -n 10
```

> ### **`-u` 的作用详解**
>
> 1. **默认行为**
>    Git stash 默认只会暂存 **已修改（modified）** 和 **已暂存（staged）** 的文件，但会忽略以下两类文件：
>    - 未跟踪的文件（新创建但未 `git add` 的文件）
>    - 被 `.gitignore` 忽略的文件
> 2. **添加 `-u` 后**
>    会将 **未跟踪的文件** 也纳入暂存范围（但仍会忽略 `.gitignore` 中的文件）。
> 3. **极端情况：`-a` 参数**
>    如果需要连 `.gitignore` 的文件也暂存，需用 `-a`（`--all`），但通常不建议。

### 内容查看

```bash
# 查看最新stash的改动统计
git stash show --stat

# 查看指定stash的完整diff（如stash@{1}）
git stash show -p stash@{1}

# 预览stash中的特定文件内容
git show stash@{0}:src/components/Example.vue | head -20
```

### 恢复操作

```bash
# 恢复最新stash并保留记录
git stash apply

# 恢复指定stash（如stash@{2}）
git stash apply stash@{2}

# 恢复并删除stash记录
git stash pop stash@{1}
```

### 删除操作

```bash
# 删除单个stash
git stash drop stash@{3}

# 清空所有stash
git stash clear
```

### 典型工作流示例

```bash
# 1. 开发中途切换任务
git stash push -u -m "开发到一半的首页改版"
git checkout feature-A

# 2. 处理完其他任务后恢复
git stash list
git stash apply stash@{0}

# 3. 确认无误后删除记录
git stash drop stash@{0}
```


## git 配置信息

要设置 Git 的全局邮箱配置，可以使用以下命令：

```bash
git config --global user.email "your_email@example.com"
```

如果你想为当前项目单独设置邮箱（而不是全局设置），可以去掉 --global 参数：

```bash
git config user.email "your_email@example.com"
```


