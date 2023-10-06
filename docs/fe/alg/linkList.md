# 链表

- [LeetCode：203.移除链表元素]() 虚拟头结点

- [LeetCode：707.设计链表]()

- [LeetCode：206.反转链表]() 双指针法 | 递归法

- [LeetCode：24. 两两交换链表中的节点]() 虚拟头结点，想清楚指针指向顺序

- [LeetCode：19.删除链表倒数第N个节点]() 虚拟头结点+双指针，快指针移动n步，再同时移动，快指针到头，则慢指针位置就是倒数第n个了

- [LeetCode: 141.环形链表II]()

  

## 特点

- 多个元素组成的元素
- 元素存储不连续，用 next 指针连在一起。

<img src="http://cdn.wangtongmeng.com/202308202058727.png" alt="drawing" width="400"/>

## 数组 vs 链表

- 数组：增删非首尾元素时往往需要移动元素。
- 链表：增删非首位元素，不需要移动元素，只需要更改 next 的指向即可。

## JS 中的链表

- JavaScript 中没有链表。
- 可以用 Object 模拟链表。

## LeetCode: 237.删除链表中的节点

 [https://leetcode.cn/problems/delete-node-in-a-linked-list](https://leetcode.cn/problems/delete-node-in-a-linked-list)
解题思路

- 无法直接获取被删除节点的上个节点。
- 将被删除节点转移到下个节点。

解题步骤

- 将被删节点的值改为下个节点的值。
- 删除下个节点。

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function(node) {
    node.val = node.next.val
    node.next = node.next.next
};
// 时间和空间复杂度都是 O(1)
```

## LeetCode: 206.反转链表

[https://leetcode.cn/problems/reverse-linked-list/](https://leetcode.cn/problems/reverse-linked-list/)
解题思路

- 反转两个节点：将 n+1 的 next 指向 n。
- 反转多个节点：双指针遍历链表，重复上述操作。

解题步骤

- 双指针一前一后遍历链表。
- 反转双指针。

```javascript
输入: 1->2->3->NULL
输出: 3->2->1->NULL


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let p1 = head;
    let p2 = null;
    while (p1) {
        const tmp = p1.next
        p1.next = p2;
        p2 = p1;
        p1 = tmp
      
    }
    return p2

};

// 时间复杂度 O(n)
// 空间复杂度 O(1)
```

## LeetCode: 2.两数相加

```javascript
输入： (2 -> 4 -> 3) + (5 -> 6 -> 4)
输出： 7 -> 0 -> 8
原因： 342 + 465 = 807

```

解题思路

- 模拟相加操作
- 需要遍历链表

解题步骤

- 新建一个空链表
- 遍历被相加的两个链表，模拟相加操作，将**个位数**追加到新链表上，将十位数留到下一位去相加。

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    const l3 = new ListNode(0)
    let p1 = l1;
    let p2 = l2
    let p3 = l3
    let carry = 0 // 上一位相加的十位数
    while(p1 || p2){
        const v1 = p1 ? p1.val : 0
        const v2 = p2 ? p2.val : 0
        const val = v1 + v2 + carry;
        carry = Math.floor(val / 10)
        p3.next = new ListNode(val % 10)
        if (p1) p1 = p1.next
        if (p2) p2 = p2.next;
        p3 = p3.next
    }
    if (carry) {
        p3.next = new ListNode(carry)
    }
    return l3.next
};
// 时间复杂度 O(n) 一次遍历 n是两个链表长度的较大值
// 空间复杂度 O(n) n两个链表较长的一个或者再加1
```

## LeetCode: 83.删除排序链表中的重复元素

[https://leetcode.cn/problems/remove-duplicates-from-sorted-list/](https://leetcode.cn/problems/remove-duplicates-from-sorted-list/)

```javascript
输入：head = [1,1,2,3,3]
输出：[1,2,3]
```

解题思路

- 因为链表是有序的，所以重复元素一定相邻
- 遍历链表，如果发现当前元素和下个元素值相同，就删除下个元素

解题步骤

- 遍历链表，如果发现当前元素和下个元素值相同，就删除下个元素。
- 遍历结束后，返回原链表的头部。

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
 let p = head
 while(p && p.next) {
     if (p.val === p.next.val) {
         p.next = p.next.next
     } else {
        p = p.next
     }
 }
 return head
};
// 时间复杂度 O(n) 又一次遍历
// 空间复杂度 O(1) 没有额外的内存开销
```

## LeetCode: 141.环形链表

[https://leetcode.cn/problems/linked-list-cycle/](https://leetcode.cn/problems/linked-list-cycle/)
解题思路

- 两个人在圆形操场上的起点同时起跑，速度快的人一定会超过速度慢的人一圈。
- 
- 用一慢一快双指针遍历链表，如果指针能够相逢，那么链表就有环。

解题步骤

- 用一慢一快双指针遍历链表，如果指针能够相逢，就返回 true。
- 遍历结束后，还没有相逢就返回 false。

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    let slow = head
    let fast = head
    while(fast && fast.next) {
        fast = fast.next.next
        slow = slow.next
        if (slow === fast) return true
    }
    return false
};
// 时间复杂度 O(n)
// 空间复杂度 O(1)
```
普通解法：
```javascript
var hasCycle = function(head) {
    let cache = new Set()
    while (head) {
        if (cache.has(head)) {
            return true
        } else {
            cache.add(head)
        }
        head = head.next
    }
    return false
};
```

## 前端与链表：JS中的原型链

原型链

- 本质上是链表
- 原型链上的节点就是各种原型对象，比如 Function.prototype、Object.prototype......
- 原型链通过__proto__属性连接各个原型对象。

```javascript
obj -> Object.prototype -> null
func -> Function.prototype -> Object.prototype -> null
arr -> Array.prototype -> Object.prototype -> null
```
## 203. 移除链表元素
```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
    // 递归的写法
    // if (!head) return head
    // head.next = removeElements(head.next, val)
    // return head.val === val ? head.next : head

    // 定义一个哨兵（减少没有head的判断）
    // 哨兵=>1=>2
    // return 哨兵.next
    let ele = new ListNode(0, head)
    let p = ele
    while (p.next) {
        if (p.next.val === val) {
            p.next = p.next.next
        } else {
            p = p.next
        }
    }
    return ele.next
};
```
## 146. LRU 缓存
```javascript
/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.cache = new Map()
    this.max = capacity
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if (this.cache.has(key)) {
        let tmp = this.cache.get(key)
        this.cache.delete(key)
        this.cache.set(key, tmp)
        return tmp
    }
    return -1
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if (this.cache.has(key)) {
        this.cache.delete(key)
    } else if (this.cache.size >= this.max ) {
        // 新增就要有缓存的淘汰机制
        this.cache.delete(this.cache.keys().next().value)
    }
    this.cache.set(key, value)
};
```