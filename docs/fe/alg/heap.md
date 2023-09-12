# 堆
## 堆是什么？
- 堆是一种特殊的完全二叉树
- 所有的节点都大于等于（最大堆）或小于等于（最小堆）它的子节点
<img src="http://cdn.wangtongmeng.com/20230831062507-95e260.png" width=400 />
# JS 中的堆

- JS 中通常用数组表示堆。
- 左侧子节点的位置是 2 * index + 1。
- 右侧子节点的位置是 2 * index + 2。
- 父节点位置是 (index - 1) / 2。

<img src="http://cdn.wangtongmeng.com/20230831062712-38f712.png" width=400 />
## 堆的应用

- 堆能高效、快速地找出最大值和最小值，时间复杂度：O(1)
- 找出第 K 个最大（小）元素
## 第 K 个最大元素

- 构建一个最小堆，并将元素依次插入堆中。
- 当堆的容量超过 K，就删除堆项。
- 插入结束后，对顶就是第 K 个最大元素。
## JS 实现：最小堆类
```javascript
class MinHeap {
  constructor() {
    this.heap = [];
  }
  swap(i1, i2) {
    const temp = this.heap[i1];
    this.heap[i1] = this.heap[i2];
    this.heap[i2] = temp;
  }
  getParentIndex(i) {
    // return (i - 1) >> 1;
    return Math.floor((i - 1) / 2);
  }
  getLeftIndex(i) {
    return i * 2 + 1;
  }
  getRightIndex(i) {
    return i * 2 + 2;
  }
  shiftUp(index) {
    if (index === 0) return;
    const parentIndex = this.getParentIndex(index);
    if (this.heap[parentIndex] > this.heap[index]) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex);
    }
  }
  shiftDown(index) {
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);

    if (this.heap[leftIndex] < this.heap[index]) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }
    if (this.heap[rightIndex] < this.heap[index]) {
      this.swap(rightIndex, index);
      this.shiftDown(rightIndex);
    }
  }
  // 插入
  // 将值插入堆的底部，即数组的尾部
  // 然后上移：将这个值和父节点进行交换，直到父节点小于等于插入的值。
  // 大小为k的堆中插入元素的时间复杂度为O(logk) 堆的高度
  insert(value) {
    this.heap.push(value);
    this.shiftUp(this.heap.length - 1);
  }
  // 删除堆顶
  // 用数组尾部元素替换堆顶（直接删除会破坏堆结构）。
  // 然后下移：将新堆顶和它的子节点进行交换，直到子节点大于等于这个新堆顶。
  // 大小为 k 的堆中删除堆顶的时间复杂度为 O(logk)
  pop() {
    this.heap[0] = this.heap.pop();
    this.shiftDown(0);
  }

  // 获取堆顶和堆的大小
  // 获取堆顶：返回数组的头部。
  // 获取堆的大小：返回数组的长度。
  peek() {
    return this.heap[0];
  }
  size() {
    return this.heap.length;
  }
}

// 左侧添加红点f5
const h = new MinHeap();
h.insert(3);
h.insert(2);
h.insert(1);
h.pop();

```
在vscode中，可以通过watch观察堆顶和堆的大小的变化
![image.png](http://cdn.wangtongmeng.com/20230831062753-e22568.png)
## LeetCode：215.数组中的第K个最大元素
解题思路

- 看到“第K个最大元素”
- 考虑选择使用最小堆

解题步骤

- 构建一个最小堆，并依次把数组的值插入堆中。
- 当堆的容量超过K，就删除堆顶。
- 插入结束后，堆顶就是第K个最大元素。
```javascript
class MinHeap {
  constructor() {
    this.heap = [];
  }
  swap(i1, i2) {
    const temp = this.heap[i1];
    this.heap[i1] = this.heap[i2];
    this.heap[i2] = temp;
  }
  getParentIndex(i) {
    // return (i - 1) >> 1;
    return Math.floor((i - 1) / 2);
  }
  getLeftIndex(i) {
    return i * 2 + 1;
  }
  getRightIndex(i) {
    return i * 2 + 2;
  }
  shiftUp(index) {
    if (index === 0) return;
    const parentIndex = this.getParentIndex(index);
    if (this.heap[parentIndex] > this.heap[index]) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex);
    }
  }
  shiftDown(index) {
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);

    if (this.heap[leftIndex] < this.heap[index]) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }
    if (this.heap[rightIndex] < this.heap[index]) {
      this.swap(rightIndex, index);
      this.shiftDown(rightIndex);
    }
  }
  insert(value) {
    this.heap.push(value);
    this.shiftUp(this.heap.length - 1);
  }
  pop() {
    this.heap[0] = this.heap.pop();
    this.shiftDown(0);
  }
  peek() {
    return this.heap[0];
  }
  size() {
    return this.heap.length;
  }
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    const h = new MinHeap()
    nums.forEach(n => {
        h.insert(n)
        if (h.size() > k) {
            h.pop()
        }
    })
    return h.peek()
};

// 时间复杂度 O(n * logk)
// 空间复杂度 O(k)
```
## LeetCode：347.前 K 个高频元素
无脑写
```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    const map = new Map()
    nums.forEach(n => {
        map.set(n, map.get(n) ? map.get(n) + 1: 1)
    })
    // Array.from(map) [ [ 1, 3 ], [ 2, 2 ], [ 3, 1 ] ]
    const list = Array.from(map).sort((a, b) => b[1] - a[1])
    return list.slice(0, k).map(n => n[0])
};

// 时间复杂度 > O(nlogn) 不符合题目要求
```
使用堆来写
```javascript
class MinHeap {
  constructor() {
    this.heap = [];
  }
  swap(i1, i2) {
    const temp = this.heap[i1];
    this.heap[i1] = this.heap[i2];
    this.heap[i2] = temp;
  }
  getParentIndex(i) {
    // return (i - 1) >> 1;
    return Math.floor((i - 1) / 2);
  }
  getLeftIndex(i) {
    return i * 2 + 1;
  }
  getRightIndex(i) {
    return i * 2 + 2;
  }
  shiftUp(index) {
    if (index === 0) return;
    const parentIndex = this.getParentIndex(index);
    if (this.heap[parentIndex] && this.heap[parentIndex].value > this.heap[index].value) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex);
    }
  }
  shiftDown(index) {
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);

    if (this.heap[leftIndex] && this.heap[leftIndex].value < this.heap[index].value) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }
    if (this.heap[rightIndex] && this.heap[rightIndex].value < this.heap[index].value) {
      this.swap(rightIndex, index);
      this.shiftDown(rightIndex);
    }
  }
  insert(value) {
    this.heap.push(value);
    this.shiftUp(this.heap.length - 1);
  }
  pop() {
    this.heap[0] = this.heap.pop();
    this.shiftDown(0);
  }
  peek() {
    return this.heap[0];
  }
  size() {
    return this.heap.length;
  }
}
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    const map = new Map()
    nums.forEach(n => {
        map.set(n, map.get(n) ? map.get(n) + 1: 1)
    })
    const h = new MinHeap()
    map.forEach((value, key) => {
        h.insert({value,key})
        if (h.size() > k) {
            h.pop()
        }
    })
    return h.heap.map(a => a.key)
};

// 时间复杂度 nlogk < nlogn
```
## LeetCode：23.合并K个排序链表
```javascript
输入：lists = [[1,4,5],[1,3,4],[2,6]]
输出：[1,1,2,3,4,4,5,6]
解释：链表数组如下：
[
  1->4->5,
  1->3->4,
  2->6
]
将它们合并到一个有序链表中得到。
1->1->2->3->4->4->5->6
```
解题思路

- 新链表的下一个节点一定是 k 个链表头中最小的节点。
- 考虑选择使用最小堆。

解题步骤

- 构建一个最小堆，并依次把链表头插入堆中。
- 弹出堆顶接到输出链表，并将堆顶所在链表的新链表头插入堆中。
- 等堆元素全部弹出，合并工作就完成了。
```javascript
class MinHeap {
  constructor() {
    this.heap = [];
  }
  swap(i1, i2) {
    const temp = this.heap[i1];
    this.heap[i1] = this.heap[i2];
    this.heap[i2] = temp;
  }
  getParentIndex(i) {
    // return (i - 1) >> 1;
    return Math.floor((i - 1) / 2);
  }
  getLeftIndex(i) {
    return i * 2 + 1;
  }
  getRightIndex(i) {
    return i * 2 + 2;
  }
  shiftUp(index) {
    if (index === 0) return;
    const parentIndex = this.getParentIndex(index);
    if (this.heap[parentIndex] && this.heap[parentIndex].val > this.heap[index].val) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex);
    }
  }
  shiftDown(index) {
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);

    // 通过 .val来取 
    if (this.heap[leftIndex] && this.heap[leftIndex].val < this.heap[index].val) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }
    if (this.heap[rightIndex] && this.heap[rightIndex].val < this.heap[index].val) {
      this.swap(rightIndex, index);
      this.shiftDown(rightIndex);
    }
  }
  insert(value) {
    this.heap.push(value);
    this.shiftUp(this.heap.length - 1);
  }
  pop() {
    // pop 需要返回值
    if (this.size() === 1) return this.heap.shift()
    const top = this.heap[0]
    this.heap[0] = this.heap.pop()
    this.shiftDown(0);
    return top
  }
  peek() {
    return this.heap[0];
  }
  size() {
    return this.heap.length;
  }
}

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    const res = new ListNode(0)
    let p = res
    const h = new MinHeap()
    lists.forEach(l => {
        if (l) h.insert(l)
    })
    while (h.size()) {
        const n = h.pop()
        p.next = n
        p = p.next
        if (n.next) h.insert(n.next)
    }
    return res.next
};

// 时间复杂度 O((k + n) * logk)约等于nlogk， k是链表的个数，n是链表节点的个数，logk是指堆的大小最多k个
// 空间复杂度 O(k)
```

