# git

## git pull 和 git fetch 的区别

- **`git fetch`** 只会将远程仓库的最新内容下载到本地，不会自动合并到当前分支，适合查看远程仓库的变化而不影响本地分支。
- **`git pull`** 则是 `git fetch` 后紧接着执行 `git merge` 的缩写，会自动将远程分支的更新合并到当前分支，并更新你的工作目录中的文件。

## git rebase 和 git merge 以及应用场景

`git rebase` 用于重新应用一系列提交到另一个分支上。它的工作原理是将当前分支的提交按顺序逐个应用到目标分支上，并且可以选择性地修改提交历史。具体特点包括：

- **线性历史**：通过重新应用提交，可以生成一个相对干净且线性的提交历史，避免了合并提交的额外记录。
- **修改历史**：可以修改每个提交的提交消息、顺序，甚至可以修改提交内容，这使得可以更加灵活地管理提交历史。
- **潜在冲突**：由于重新应用提交可能会导致冲突，因此在进行 `git rebase` 时需要解决可能出现的冲突。

使用示例：

```
bashCopy Code# 切换到目标分支
git checkout master

# 将当前分支（例如 feature-branch）的提交重新应用到 master 上
git rebase feature-branch
```

### 应用场景选择：

- **使用 `git merge` 的场景**：
  - 当希望保留详细的分支历史，能够清楚地看到各个分支的贡献时，通常选择 `git merge`。
  - 多人协作时，推荐使用 `git merge`，因为它能够保留分支的完整信息，避免历史重写带来的混乱。
- **使用 `git rebase` 的场景**：
  - 当希望生成干净、线性的提交历史，以便更容易理解和管理时，可以选择 `git rebase`。
  - 在进行本地分支的整理、提交历史清理时，常常使用 `git rebase`，可以将多个小的临时提交整理为更有逻辑的提交。

综上所述，`git merge` 和 `git rebase` 都是处理分支合并的有效工具，选择使用哪一个取决于你希望达到的提交历史结构和对分支历史的管理需求。

## git merge 失败如何回退？

git revert 回滚，相当于增加一个commit，但是效果相当于撤销了merge的commit

git reset --head 强制回到某个版本，