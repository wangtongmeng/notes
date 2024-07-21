# 集合
## 什么是集合
- 一种**无序且唯一**的数据结构。
- ES6中有集合的数据结构，Set
- 集合的常用操作：去重、判断某个元素是否在集合中、求交集...
```javascript
// 去重
const arr = [1, 1, 2, 2, 3, 3];
console.log([...new Set(arr)]); // [ 1, 2, 3 ]

// 判断元素是否在集合中
const set = new Set(arr);
console.log(set.has(1)); // true

// 求交集
const set2 = new Set([1, 2]);
console.log(new Set([...set].filter((item) => set2.has(item)))); // Set(2) { 1, 2 }
```
## LeetCode: 349.两个数组的交集
[https://leetcode.cn/problems/intersection-of-two-arrays/](https://leetcode.cn/problems/intersection-of-two-arrays/)
```javascript
输入：nums1 = [1,2,2,1], nums2 = [2,2]
输出：[2]
```
解题思路

- 求交集且无序唯一
- 使用集合

解题步骤

- 用集合对 nums1 去重
- 遍历 nums1，筛选出 nums2 中也包含的数值。
```javascript
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
    return [...new Set(nums1)].filter(n => nums2.includes(n))
};
// 时间复杂度 O(^n2) 或者 O(m * n)
// 空间复杂度 O(m) m 是去重后num1的长度
```
