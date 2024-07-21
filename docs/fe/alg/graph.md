# 图
## 图是什么？
- 图是**网络结构**的抽象模型，是一组由**边**连接的**节点**。
- 图可以表示任何二元关系，比如路、航班...
- JS 中没有图，但是可以用 Object 和 Array 构建图。
- 图的表示法：邻接矩阵、邻接表、关联矩阵...
## 图的表示法：邻接矩阵
![image.png](http://cdn.wangtongmeng.com/20230821061043-a4e6fe.png)

## 图的表示法：邻接表
![image.png](http://cdn.wangtongmeng.com/20230821061115-2c3794.png)
## 图的常用操作

- 深度优先遍历
- 广度优先遍历
## 什么是深度/广度优先遍历？

- 深度优先遍历：尽可能深的搜索图的分支。
- 广度优先遍历：先访问离根节点最近的节点。
## 深度优先遍历算法口诀

- 访问根节点。
- 对根节点的**没访问过的相邻节点**挨个进行深度优先遍历。

![image.png](http://cdn.wangtongmeng.com/20230821061136-2c4a41.png)
```javascript
const graph = {
  0: [1, 2],
  1: [2],
  2: [0, 3],
  3: [3],
};

const visited = new Set();
const dfs = (n) => {
  console.log(n);
  visited.add(n);
  graph[n].forEach((c) => {
    if (!visited.has(c)) {
      dfs(c);
    }
  });
};

dfs(2); // 2013
```
## 广度优先遍历算法口诀

- 新建一个队列，把根节点入队。
- 把对头出队并访问。
- 把对头的**没访问过的相邻节点**入队。
- 重复第二、三步，直到队列为空。

<img src="http://cdn.wangtongmeng.com/20230821061151-75f0a4.png" width=300 />

```javascript
const graph = {
  0: [1, 2],
  1: [2],
  2: [0, 3],
  3: [3],
};

const visited = new Set();
visited.add(2);
const q = [2]; // 入队说明访问过了
while (q.length) {
  const n = q.shift();
  console.log(n);
  graph[n].forEach((c) => {
    if (!visited.has(c)) {
      q.push(c);
      visited.add(c);
    }
  });
}
// 2 0 3 1
```
## LeetCode：65.有效数字
解题思路

<img src="http://cdn.wangtongmeng.com/20230821061222-3f446a.png" width=300 />
<img src="http://cdn.wangtongmeng.com/20230821061305-429e83.png" />

解题步骤

- 构建一个表示状态的图。
- 遍历字符串，并沿着图走，如果到了某个节点无路可走就返回 false。
- 遍历结束，如走到 3/5/6，就返回 true，否则返回 false。
```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
var isNumber = function(s) {
    const graph = {
        0: {'blank': 0, 'sign': 1, '.': 2, 'digit': 6},
        1: {'digit': 6, '.':2},
        2: {'digit': 3},
        3: {'digit': 3, 'e':4},
        4: {'digit': 5, 'sign': 7},
        5: {'digit': 5},
        6: {'digit': 6, '.': 3, 'e': 4},
        7: {'digit': 5}
    }
    let state = 0;
    for (c of s.trim()) {
        if (c >= '0' && c <= '9') {
            c = 'digit'
        } else if (c === ' ') {
            c = 'blank'
        } else if (c === '+' || c === '-') {
            c = 'sign'
        }
        state = graph?.[state]?.[c.toLowerCase()] // e E 统一转成 e
        if (state === 'undefine') {
            return false
        }
    }
    if (state === 3 || state === 5 || state === 6) {
        return true
    }
    return false
};

// 时间复杂度 O(n)
// 空间复杂度 O(1)
```
## LeetCode：417.太平洋大西洋水流问题
<img src="http://cdn.wangtongmeng.com/20230821061323-37fdae.png" />

解题思路

- 把矩阵想象成图。
- 从海岸线逆流而上遍历图，所到之处就可以流到某个大洋的坐标。

解题步骤

- 新建两个矩阵，分别记录能流到两个大洋的坐标。
- 从海岸线，多管齐下，同时深度优先遍历图，过程中填充上述矩阵。
- 遍历两个矩阵，找出能流到两个大洋的坐标。
```javascript
/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function(heights) {
    if (!heights || !heights[0]) return [];
    const m = heights.length // 行
    const n = heights[0].length // 列
    const flow1 = Array.from({length: m}, () => new Array(n).fill(false))
    const flow2 = Array.from({length: m}, () => new Array(n).fill(false))

    const dfs = (r, c, flow) => {
        flow[r][c] = true
        const arr = [[r -1, c], [r + 1, c], [r, c - 1], [r, c + 1]]
        arr.forEach(([nr,nc]) => {
            if (
                // 保证在矩阵中
                nr >= 0 && nr < m &&
                nc >= 0 && nc < n &&
                // 防止死循环
                !flow[nr][nc] &&
                // 保证逆流而上
                heights[nr][nc] >= heights[r][c]
            ) {
                dfs(nr, nc, flow)
            }
        })
    }

    // 沿着海岸线逆流而上
    for (let r = 0; r < m; r += 1) {
        dfs(r, 0, flow1)
        dfs(r, n -1, flow2)
    }
    for (let c = 0; c < n; c += 1) {
        dfs(0, c, flow1)
        dfs(m-1,c,flow2)
    }
    // 收集能流到两个大洋的坐标
    const res = []
    for (let r = 0; r < m; r += 1) {
        for (let c = 0; c < n; c+=1) {
            console.log(flow1[r][c], flow2[r][c])
            if (flow1[r][c] && flow2[r][c]) {
                res.push([r,c])
            }
        }
    }
    return res
};

// 时间复杂度 O(m*n)
// 空间复杂度 O(m*n)
```
## LeetCode：133.克隆图

