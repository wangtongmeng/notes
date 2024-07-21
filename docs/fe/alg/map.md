# 字典
## 概念
- 与集合类似，字典也是存储唯一值的数据结构，但它以**键值对**的形式来存储。
- ES6中有字典，名为 Map。
- 字典的常用操作：键值对的增删改查。
## LeetCode: 349.两个数组的交集
[https://leetcode.cn/problems/intersection-of-two-arrays/](https://leetcode.cn/problems/intersection-of-two-arrays/)
```javascript
输入：nums1 = [1,2,2,1], nums2 = [2,2]
输出：[2]
```
解题思路

- 求 nums1 和 nums2 都有的值。
- 用字典简历一个映射关系，记录 nums 1 里有的值。
- // 遍历 num2 ，找出 num1 里的值。

解题步骤

- 新建一个字典，遍历 nums1，填充字典。
- 遍历 nums2，遇到字典里的值就选出，并从字典中删除。
```javascript
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
    const map = new Map()
    nums1.forEach(n => {
        map.set(n, true)
    })
    const res = []
    nums2.forEach(n => {
        if (map.get(n)) {
            res.push(n)
            map.delete(n)
        }
    })
    return res
};

// 时间复杂度 O(m + n)
// 空间复杂度 O(m)
```
## LeetCode: 20.有效的括号
```javascript
示例 1：

输入：s = "()"
输出：true
示例 2：

输入：s = "()[]{}"
输出：true
示例 3：

输入：s = "(]"
输出：false
```
```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    const len = s.length
    if (len % 2 === 1) return false;

    const map = new Map()
    map.set('(', ')')
    map.set('{', '}')
    map.set('[', ']')
    
    const stack = []
    for (let i = 0; i < len; i++) {
        const c = s[i]
        if (map.has(c)) {
            stack.push(c)
        } else {
            const t = stack[stack.length -1]
            if (map.get(t) === c) {
                stack.pop()
            } else {
                return false
            }
        }
    }
    return stack.length === 0
};

// 不如声明对象快，参考栈文章里的

```
## LeetCode: 1.两数之和
```javascript
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
```
解题思路

- 把 nums 想象成相亲者
- 把 target 想象成匹配条件
- 用字典建立一个婚姻介绍所，存储相亲者的数字和下标

解题步骤

- 新建一个字典作为婚姻介绍所
- nums 里的值，逐个来介绍所找对象，没有合适的就先登记，有合适的就牵手成功
```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const map = new Map()
    for (let i = 0; i < nums.length; i +=1) {
        const n = nums[i]
        const n2 = target - n
        if (map.has(n2)) {
            return [map.get(n2), i]
        } else {
            map.set(n, i)
        }
    }
};

// 时间复杂度 O(n)
// 空间复杂度 O(n)
```
## LeetCode: 3.无重复字符的最长子串
```javascript
输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```
解题思路

- 先找出所有的不包含重复字符的子串。
- 找出长度最大那个子串，返回其长度即可。

解题步骤

- 用双指针维护一个滑动窗口，用来剪切子串。
- 不断移动右指针，遇到重复字符，就把左指针移动到重复字符的下一位。
- 过程中，记录所有窗口的长度，并返回最大值。
```javascript
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let leftIndex = 0;
    let max = 0;
    const map = new Map()
    for (let i = 0; i < s.length; i++) {
        const strItem = s[i]
        if (map.has(strItem) && map.get(strItem) >= leftIndex) {
            leftIndex = map.get(strItem) + 1
        }
        max = Math.max(max , i - leftIndex + 1)
        map.set(strItem, i)
    }
    return max
};
 
// 时间复杂度 O(n)
// 空间复杂度 O(n)
```
## LeetCode: 76.最小覆盖子串
```javascript
输入：s = "ADOBECODEBANC", t = "ABC"
输出："BANC"
解释：最小覆盖子串 "BANC" 包含来自字符串 t 的 'A'、'B' 和 'C'。
```
解题思路

- 先找出所有包含t的子串
- 找出长度最小那个子串，返回即可。

解题步骤

- 用双指针维护一个滑动窗口。
- 移动右指针，找到包含T的子串，移动左指针，尽量减少包含T的子串的长度。
- 循环上述过程，找到包含T的最小子串。
```javascript
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    let l = 0;
    let r = 0;
    const need = new Map()
    
    for (let c of t) {
        need.set(c, need.has(c) ? need.get(c) + 1 : 1)
    }
    //  need {A: 1, B: 1, C: 1}

    let needType = need.size
    let res = ''
    while (r < s.length) {
        const c = s[r]
        if (need.has(c)) {
            need.set(c, need.get(c) - 1)
            if (need.get(c) === 0) needType -= 1
        }
        // 找到包含t的子串
        while (needType === 0) {
            const newRes = s.substring(l, r + 1)
            if (!res || newRes.length < res.length) res = newRes
            const c2 = s[l]
            // 缩短满足要求的子串
            if (need.has(c2)) {
                need.set(c2,  need.get(c2) + 1)
                if (need.get(c2) === 1) needType += 1
            }
            l += 1
        }
        r += 1
    }

    return res
};

// 时间复杂度 O(m + n) m是t的长度，n是s的长度
// 空间复杂度 O(m)
```
