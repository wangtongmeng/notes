https://leetcode.cn/studyplan/top-interview-150/

## 数组字符串

### [80. 删除有序数组中的重复项 II](https://leetcode.cn/problems/remove-duplicates-from-sorted-array-ii/)

cpp

```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        int k = 0;
        for (auto x: nums)
            if (k < 2 || (nums[k - 1] != x || nums[k - 2] != x))
                nums[k ++ ] = x;
        return k;
    }
};
```

js

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let k = 0;
    for (let x of nums) {
        if (k < 2 || (nums[k - 1] != x || nums[k - 2] != x)) {
            nums[k++] = x;
        }
    }
    return k;
};
```

### [169. 多数元素](https://leetcode.cn/problems/majority-element/)

思路：一定存在一个元素>所有其他元素的和，所以我们让数作为库存相互抵消，剩下的一定是多数

cpp

```cpp
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int r, c = 0; // r 是库存数，c是库存数的数量
        for (auto x: nums)
            if (!c) r = x, c = 1;
            else if (r == x) c ++ ;
            else  c -- ;
        return r;
    }
};
```

js

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    let r = c = 0;
    for (let x of nums) {
        if (!c) r = x, c = 1;
        else if (r === x) c++;
        else c--;
    }
    return r;
};
```

### [189. 轮转数组](https://leetcode.cn/problems/rotate-array/)

思路：整体翻转，再局部翻转

<img src="http://cdn.wangtongmeng.com/20240921194546-a04b91.png" style="zoom:25%;" />

cpp

```cpp
class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        int n = nums.size();
        k %= n;
        reverse(nums.begin(), nums.end());
        reverse(nums.begin(), nums.begin() + k);
        reverse(nums.begin() + k, nums.end());
    }
};
```

js

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    let n = nums.length;
    k = k % n;
    reverse(nums, 0,  n - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, k, n - 1);
};

function reverse(arr, l, r) {
    let tmp = null;
    while (l < r) {
        tmp = arr[r];
        arr[r] = arr[l];
        arr[l] = tmp;
        l++;
        r--;
    }
}
```

### [121. 买卖股票的最佳时机](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/)

思路：第i天卖出，需要在前面找到一个最小值，可以在遍历过程中进行维护，所以时间复杂度是O(n)的

<img src="http://cdn.wangtongmeng.com/20240921200026-6fa049.png" style="zoom:25%;" />

cpp

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int res = 0;
        for (int i = 0, minp = INT_MAX; i < prices.size(); i ++ ) {
            res = max(res, prices[i] - minp);
            minp = min(minp, prices[i]);
        }
        return res;
    }
};
```

js

```js
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let res = 0, len = prices.length;
    for (let i = 0,  minp = Infinity; i < len; i++ ) {
        res = Math.max(res, prices[i] - minp);
        minp = Math.min(minp, prices[i]);
    }
    return res;
};
```

### [122. 买卖股票的最佳时机 II](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/)

思路：每个交易可以拆成单天交易，所以只需要统计单挑交易为正数的

<img src="http://cdn.wangtongmeng.com/20240921201301-393876.png" style="zoom:25%;" />

cpp

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int res = 0;
        for (int i = 0; i + 1 < prices.size(); i ++ )
            res += max(0, prices[i + 1] - prices[i]);
        
        return res;
    }
};
```

js

```js
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let res = 0, len = prices.length;
    for (let i = 0; i + 1 < len; i++ ) {
        res += Math.max(0, prices[i + 1]  - prices[i]);
    }
    return res;
};
```

### [55. 跳跃游戏](https://leetcode.cn/problems/jump-game/)

思路：每个元素表示最远跳的距离，所以只需要遍历时跟新最远距离即可

cpp

```cpp
class Solution {
public:
    bool canJump(vector<int>& nums) {
        for (int i = 0,j = 0; i < nums.size(); i ++ ) {
            if (j < i) return false;
            j = max(j, i + nums[i]);
        }
        return true;
    }
};
```

js

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    for (let i = 0, j = 0; i < nums.length; i++) {
        if (j < i) return false;
        j = Math.max(j, i + nums[i]);
    }
    return true;
};
```

### [45. 跳跃游戏 II](https://leetcode.cn/problems/jump-game-ii/)

思路

<img src="http://cdn.wangtongmeng.com/20240921205231-9841bf.png" style="zoom:25%;" />

cpp

```cpp
class Solution {
public:
    int jump(vector<int>& nums) {
        int max_far = 0; // 目前能跳的最远位置
        int step = 0;
        int end = 0; // 上次跳跃的右边界
        for (int i = 0; i < nums.size() - 1; i ++ )
        {
            max_far = std::max(max_far, i + nums[i]);
            // 到达上次跳跃的右边界了
            if (i == end)
            {
                end = max_far;
                step++;
            }
        }

        return step;


        // int n = nums.size();
        // vector<int> f(n);

        // for (int i = 1, j = 0; i < n; i ++) {
        //     while (j + nums[j] < i) j ++; // 超过一步的右边界了，走一步
        //     f[i] = f[j] + 1;
        // }

        // return f[n - 1];


    }
};
```

js

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
    let maxFar = 0, step = 0, end = 0;
    for (let i = 0; i < nums.length -1; i++) { // -1是因为终点就是最后一位
        maxFar = Math.max(maxFar, i + nums[i]); // 更新下一步能到达的右边界
        if (i === end) {
            // 说明本次跳跃到达边界了
            step++;
            end = maxFar;
        }
    }
    return step;
};
```

### [274. H 指数](https://leetcode.cn/problems/h-index/)

思路：从大到小排序，看引用>=h的文章数量是不是>=h，只需要看索引是h-1的数(它是最最小值)是不是>=h

<img src="http://cdn.wangtongmeng.com/20240921211520-b5b08c.png" style="zoom:25%;" />

cpp

```cpp
class Solution {
public:
    int hIndex(vector<int>& c) {
        sort(c.begin(), c.end(), greater<int>()); // 从大到小排序
        for (int h = c.size(); h; h -- )
            if (c[h - 1] >= h) // 看下前h个数是不是大于等于h的，因为是有序的，只需要看索引是h-1即可
                return h;
        return 0;
    }
};
```

js

```js
/**
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function(c) {
    c.sort((a,b)=> b -a);
    for (let h = c.length; h >= 0; h--) {
        if (c[h - 1] >= h) {
            return h;
        }
    }
    return 0;
};
```

### [380. O(1) 时间插入、删除和获取随机元素](https://leetcode.cn/problems/insert-delete-getrandom-o1/)

思路：

- 插入、删除操作，哈希表是O(1)
- 随机获取元素，数组是O(1)
- 插入操作：数组末尾增加一个数，hash表中记录下标关系
- 随机获取操作：直接通过数组
- 删除：通过hash表找到要删除的元素在数组中的下标，让其和数组尾元素交换并pop()，同时更新hash表中的信息

<img src="http://cdn.wangtongmeng.com/20240921213219-1ec39e.png" style="zoom:25%;" />

cpp

```cpp
class RandomizedSet {
public:
    unordered_map<int, int> hash;
    vector<int> nums;

    RandomizedSet() {
    }
    
    bool insert(int x) {
        if (hash.count(x) == 0) {
            nums.push_back(x);
            hash[x] = nums.size() - 1;
            return true;
        }
        return false;
    }
    
    bool remove(int x) {
        if (hash.count(x)) {
            int y = nums.back();
            int px = hash[x], py = hash[y];
            swap(nums[px], nums[py]);
            swap(hash[x], hash[y]);
            nums.pop_back();
            hash.erase(x);

            return true;
        }
        return false;
    }
    
    int getRandom() {
        return nums[rand() % nums.size()];
    }
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * RandomizedSet* obj = new RandomizedSet();
 * bool param_1 = obj->insert(val);
 * bool param_2 = obj->remove(val);
 * int param_3 = obj->getRandom();
 */
```

js

```js

var RandomizedSet = function() {
    this.map = new Map();
    this.nums = [];
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
    if (this.map.has(val)) return false;
    this.nums.push(val);
    this.map.set(val, this.nums.length -1);
    return true;
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
    if (!this.map.has(val)) return false; // 如果不存在，则返回 false

    // 获取要删除元素的索引
    const index = this.map.get(val);
    const lastElement = this.nums[this.nums.length - 1]; // 获取最后一个元素

    // 将最后一个元素移动到被删除元素的位置
    this.nums[index] = lastElement;
    this.map.set(lastElement, index); // 更新最后一个元素的索引

    // 删除最后一个元素
    this.nums.pop();
    this.map.delete(val); // 从 map 中删除元素
    return true;
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
    return this.nums[Math.floor(Math.random() * this.nums.length)];
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
```

### [238. 除自身以外数组的乘积](https://leetcode.cn/problems/product-of-array-except-self/)

思路：前后缀分解

只能开一个数组，需要做些合并

<img src="http://cdn.wangtongmeng.com/20240921224150-580c31.png" style="zoom: 33%;" />

cpp

```cpp
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> p(n, 1); // 前缀数组
        for (int i = 1; i < n; i ++ ) p[i] = p[i - 1] * nums[i - 1]; // 初始化前缀数组
        for (int i = n - 1, s = 1; i >= 0; i -- ) { // 从后往前遍历，用变量s存储后缀乘积
            p[i] *= s;
            s *= nums[i];
        }
        return p;
    }
};
```

js

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    let n = nums.length, p = [1];
    for (let i = 1; i < n; i++) {
        p[i] = p[i - 1] * nums[i - 1];
    }
    for (let i = n - 1, s = 1; i >= 0; i-- ) {
        p[i] *= s;
        s *= nums[i];
    }
    return p;
};
```

### [134. 加油站](https://leetcode.cn/problems/gas-station/)

思路

- 单调队列（通用做法） 参考 https://www.acwing.com/problem/content/description/1090/
- 贪心：先枚举（枚举每个起点），再优化