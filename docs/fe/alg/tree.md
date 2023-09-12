# 树
## 概念
- 一种**分层**数据的抽象模型。
- 前端中常见的树包括： DOM树、级联选择、树形控件.....
- JS 中没有树，可以用 Object 和 Array 构建树。
- 树的常用操作：深度/广度优先遍历、先中后序遍历。
## 深度/广度优先遍历

- 深度优先遍历：尽可能深的搜索树的分支。
- 广度优先遍历：先访问里根节点最近的节点。
## 深度优先遍历算法口诀

<img src="http://cdn.wangtongmeng.com/20230821055919-f4268d.png" width=200 />

- 访问根节点。
- 对根节点的 children 挨个进行深度优先遍历。
## 广度优先遍历算法口诀
<img src="http://cdn.wangtongmeng.com/20230821060452-6e4ce6.png" width=200 />

- 新建一个队列，把根节点入队。
- 把对头出队并访问。
- 把对头的children挨个入队。
- 重复第二、三步，直到队列为空。
## 二叉树的先中后序遍历
### 二叉树是什么？

- 树中每个节点最多只能有两个子节点。
- 在 JS 中通常用 Object来模拟二叉树。
### 先序遍历算法口诀
<img src="http://cdn.wangtongmeng.com/20230821060529-218ef9.png" width=200 />

- 访问**根**节点。
- 对根节点的**左**子树进行先序遍历。
- 对根节点的**右**子树进行先序遍历。
```javascript
const bt = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
      left: null,
      right: null,
    },
    right: {
      val: 5,
      left: null,
      right: null,
    },
  },
  right: {
    val: 3,
    left: {
      val: 6,
      left: null,
      right: null,
    },
    right: {
      val: 7,
      left: null,
      right: null,
    },
  },
};

const preOrder = (root) => {
  if (!root) return;
  console.log(root.val);
  preOrder(root.left);
  preOrder(root.right);
};

preOrder(bt);
// 1
// 2
// 4
// 5
// 3
// 6
// 7
```
### 中序遍历算法口诀
<img src="http://cdn.wangtongmeng.com/20230821060552-f845cb.png" width=200 />

- 对根节点的**左**子树进行中序遍历。
- 访问**根**节点。
- 对根节点的**右**子树进行中序遍历。
```javascript
中序遍历
const inOrder = (root) => {
  if (!root) return;
  inOrder(root.left);
  console.log(root.val);
  inOrder(root.right);
};

inOrder(bt); //4251637
```
### 后序遍历算法口诀

<img src="http://cdn.wangtongmeng.com/20230821060636-371a40.png" width=200 />

- 对根节点的**左**子树进行后序遍历。
- 对根节点的**右**子树进行后续遍历。
- 访问**根**节点。
```javascript
const postOrder = (root) => {
  if (!root) return;
  postOrder(root.left);
  postOrder(root.right);
  console.log(root.val);
};


postOrder(bt); // 4526731
```
## 二叉树的先中后序遍历（非递归版）
### 先序遍历
```javascript
const preOrder = (root) => {
  if (!root) return;
  const stack = [root];
  while (stack.length) {
    const n = stack.pop();
    console.log(n.val);
    if (n.right) stack.push(n.right);
    if (n.left) stack.push(n.left);
  }
};

preOrder(bt);
// 1
// 2
// 4
// 5
// 3
// 6
// 7

```
### 中序遍历
```javascript
const inOrder = (root) => {
  if (!root) return;
  const stack = [];
  let p = root;
  while (stack.length || p) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const n = stack.pop();
    console.log(n.val);
    p = n.right;
  }
};

inOrder(bt); //4251637

```
### 后序遍历
```javascript
const postOrder = (root) => {
  if (!root) return;
  const outputStack = [];
  const stack = [root];
  while (stack.length) {
    const n = stack.pop();
    outputStack.push(n); // 先存储
    if (n.left) stack.push(n.left);
    if (n.right) stack.push(n.right);
  }
  while (outputStack.length) {
    const n = outputStack.pop();
    console.log(n.val);
  }
};

postOrder(bt); // 4526731
```
## LeetCode：104.二叉树的最大深度
解题思路

- 求最大深度，考虑使用深度优先遍历。
- 在深度优先遍历过程中，记录每个节点所在的层级，找出最大层级即可。

解题步骤

- 新建一个变量，记录最大深度
- 深度优先遍历整棵树，并记录每个节点的层级，同步不断刷新最大深度这个变量。
- 遍历结束后返回最大深度这个变量。
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    debugger
    let res = 0;
    // 深度优先遍历 
    const dfs = (n, l) => {
        if (!n) return;

        if (!n.left && !n.right) {
            res = Math.max(res, l)
        }

        dfs(n.left, l + 1);
        dfs(n.right, l + 1);
    }

    dfs(root, 1)
    return res
};

// 时间复杂度 O(n) 遍历了树一遍
// 空间负责度 O(logn) ~ O(n)
```
## LeetCode：111.二叉树的最小深度
解题思路

- 求最小深度，考虑使用广度优先遍历。
- 在广度优先遍历中，遇到叶子节点，停止遍历，直接返回节点层级。

解题步骤

- 广度优先遍历整棵树，并记录每个节点的层级。
- 遇到叶子节点，返回节点层级，并停止遍历。
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function(root) {
    if (!root) return 0;
    const q = [[root, 1]];
    // 广度优先
    while (q.length) {
        const [n , l] =  q.shift()
        if (!n.left && !n.right) {
            return l
        }
        if (n.left) q.push([n.left, l + 1])
        if (n.right) q.push([n.right, l + 1])
    }

};

// 时间复杂度 O(n) 最大n是节点的数量
// 空间负责度 O(n) 最大n是节点的数量
```
## LeetCode：102.二叉树的层序遍历
解题思路

- 层序遍历顺序就是广度优先遍历。
- 遍历时需要记录当前节点所处的层级，方便将其添加到不同的数组中。

解题步骤

- 广度优先遍历
- 遍历过程中，记录每个节点嗯层级，并将其添加到不同的数组中。
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if (!root) return [];
    const q = [[root, 0]]
    const res = []
    while (q.length) {
        const [n ,level]  = q.shift()
        if (!res[level]) {
            res.push([n.val])
        } else {
            res[level].push(n.val)
        }
        if (n.left) q.push([n.left, level + 1])
        if (n.right) q.push([n.right, level + 1])
    }
    return res
};


// 遍历时只需要知道每层的个数，就可以一次性push了
var levelOrder = function(root) {
    if (!root) return []
    const q = [root]
    const res = []
    while (q.length) {
        let len = q.length // len 为每层的节点
        res.push([])
        while (len--) {
            const n = q.shift()
            res[res.length -1].push(n.val)
            if (n.left) q.push(n.left)
            if (n.right) q.push(n.right)
        }
    }
    return res
};
// 时间复杂度 O(n)
// 空间复杂度 O(n)
```
## LeetCode：94.二叉树的中序遍历
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 递归版
var inorderTraversal = function(root) {
    const res = []
    const rec = (n) => {
        if (!n) return;
        rec(n.left);
        res.push(n.val)
        rec(n.right)
    }
    rec(root)
    return res
};
// 遍历的方式
var inorderTraversal = function(root) {
    const res = []
    const stack = []
    let p = root
    while (stack.length || p) {
        while (p) {
            stack.push(p)
            p = p.left
        }
        const n = stack.pop()
        res.push(n.val)
        p = n.right
    }
    return res
};
// 时间和空间复杂度都是O(n)
```
## LeetCode：112.路径总和
解题思路

- 在深度优先遍历的过程中，记录当前路径的节点值的和。
- 在叶子节点处，判断当前路径的节点值的和是否等于目标值。

解题步骤

- 深度优先遍历二叉树，在叶子节点处，判断当前路径的节点值的和是否等于目标值，是就返回true。
- 遍历结束，如何没有匹配，就返回false。
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function(root, targetSum) {
    if (!root) return false;
    let res = false
    const dfs = (n, s, x) => {
        if (!n.left && !n.right && s === targetSum) {
            res = true
        }
        if (n.left) dfs(n.left, s + n.left.val);
        if (n.right) dfs(n.right, s + n.right.val);
    }
    dfs(root, root.val)
    return res
};

// 时间复杂度 O(n)
// 空间复杂度 O(n) n是递归堆栈的高度
```
## 前端与树：遍历JSON的所有节点值

