## 算法题

## 数组

[704. 二分查找](https://leetcode.cn/problems/binary-search/) 双指针

[27. 移除元素](https://leetcode.cn/problems/remove-element/) 双指针，快慢指针

[977. 有序数组的平方](https://leetcode.cn/problems/squares-of-a-sorted-array/) 双指针，两端比较取最大

[209. 长度最小的子数组](https://leetcode.cn/problems/minimum-size-subarray-sum/) 双指针，滑动窗口

[66. 加一](https://leetcode.cn/problems/plus-one/) 

[88. 合并两个有序数组](https://leetcode.cn/problems/merge-sorted-array/) 双指针，后序遍历

## hash

[242. 有效的字母异位词](https://leetcode.cn/problems/valid-anagram/) 

[349. 两个数组的交集](https://leetcode.cn/problems/intersection-of-two-arrays/) 使用 set 去重，遍历另一个，如果有则delete

[202. 快乐数](https://leetcode.cn/problems/happy-number/) 使set，如果如果是1返回true，不是1存起来，如果重复出现返回false

[1. 两数之和](https://leetcode.cn/problems/two-sum/)  map

[454. 四数相加 II](https://leetcode.cn/problems/4sum-ii/) map

[383. 赎金信](https://leetcode.cn/problems/ransom-note/) map

[15. 三数之和](https://leetcode.cn/problems/3sum/)  一层遍历确定左节点，双指针收尾遍历，注意三个点的去重

## 字符串 

[344. 反转字符串](https://leetcode.cn/problems/reverse-string/) 双指针

[541. 反转字符串 II](https://leetcode.cn/problems/reverse-string-ii/) 双指针，注意 i + k - 1 去比较

[28. 找出字符串中第一个匹配项的下标](https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/) 暴力法，KMP？

[459. 重复的子字符串](https://leetcode.cn/problems/repeated-substring-pattern/)  从小到大拼接子串，利用repeat方法，比较是否相等

## 二分

[35. 搜索插入位置](https://leetcode.cn/problems/search-insert-position/)  闭区间 right  + 1

## 栈

## 链表

[203. 移除链表元素](https://leetcode.cn/problems/remove-linked-list-elements/) 虚拟头结点

[206. 反转链表](https://leetcode.cn/problems/reverse-linked-list/)  迭代法，暂存 next 节点

[24. 两两交换链表中的节点](https://leetcode.cn/problems/swap-nodes-in-pairs/)  递归，迭代法

[19. 删除链表的倒数第 N 个结点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/) 虚拟头结点 + 快慢双指针

[面试题 02.07. 链表相交](https://leetcode.cn/problems/intersection-of-two-linked-lists-lcci/)  同160 获取两个链表长度，长链表cur节点移动到和短链表相同，两个链表同时向后遍历

[142. 环形链表 II](https://leetcode.cn/problems/linked-list-cycle-ii/) 利用map表(new Set)

[21. 合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists/) 

[83. 删除排序链表中的重复元素](https://leetcode.cn/problems/remove-duplicates-from-sorted-list/) 

[141. 环形链表](https://leetcode.cn/problems/linked-list-cycle/) 快慢指针

[234. 回文链表](https://leetcode.cn/problems/palindrome-linked-list/) 转数组+双指针

[876. 链表的中间结点](https://leetcode.cn/problems/middle-of-the-linked-list/)  快慢指针，或遍历1.5遍链表

## 贪心算法

[121. 买卖股票的最佳时机](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/)  暴力法（超时）、贪心

## 动态规划

[416. 分割等和子集](https://leetcode.cn/problems/partition-equal-subset-sum/) 01背包

[1049. 最后一块石头的重量 II](https://leetcode.cn/problems/last-stone-weight-ii/) 01 背包

[494. 目标和](https://leetcode.cn/problems/target-sum/) 01 背包

[474. 一和零](https://leetcode.cn/problems/ones-and-zeroes/) 01 背包

[518. 零钱兑换 II](https://leetcode.cn/problems/coin-change-ii/) 完全背包

[377. 组合总和 Ⅳ](https://leetcode.cn/problems/combination-sum-iv/) 完全背包，排列

[322. 零钱兑换](https://leetcode.cn/problems/coin-change/)  完全背包

[279. 完全平方数](https://leetcode.cn/problems/perfect-squares/)  完全背包

[139. 单词拆分](https://leetcode.cn/problems/word-break/) 完全背包

[LCR 089. 打家劫舍](https://leetcode.cn/problems/Gu0c2T/) 

[213. 打家劫舍 II](https://leetcode.cn/problems/house-robber-ii/) 

[337. 打家劫舍 III](https://leetcode.cn/problems/house-robber-iii/) 树形 dp

[121. 买卖股票的最佳时机](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/) 暴力法（超时）、贪心、dp

[122. 买卖股票的最佳时机 II](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/) 贪心、dp

[123. 买卖股票的最佳时机 III](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iii/) dp



