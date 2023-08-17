# 队列
- 一个先进先出的结构。
- JavaScript中没有队列，但可以用 Array 实现队列的所有功能。

<img src="/alg/queue/1.png" alt="drawing" width="400"/>

应用场景

- 需要**先进先出**的场景。
- 比如：食堂排队打饭、JS异步中的任务队列、计算最近请求次数。

场景三：计算最近请求次数 [https://leetcode.cn/problems/number-of-recent-calls/](https://leetcode.cn/problems/number-of-recent-calls/)

- 有新请求就入队，3000ms前发出的请求出队。
- 队列的长度就是最近请求次数。
```bash
输入：inputs = [[], [1], [100], [3001], [3002]]
输出：[null, 1, 2, 3, 3]
```
解题思路

- 越早发出的请求，越早不在最近3000ms内的请求里。
- 满足先进先出，考虑用队列。

解题步骤

- 有新请求就入队，3000ms前发出的请求出队。
- 队列的长度就是最近请求次数。
```javascript
var RecentCounter = function() {
    this.q = []
};

RecentCounter.prototype.ping = function(t) {
    this.q.push(t)
    while (this.q[0] < t - 3000) {
        this.q.shift()
    }
    return this.q.length
};

// 时间复杂度 O(n) n是出队的个数
// 空间复杂度 O(n) n是队列的长度
```
