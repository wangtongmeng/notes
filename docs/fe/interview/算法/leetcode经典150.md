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
- 贪心：先枚举（枚举每个起点），再优化；遍历节点，累计油记录右边界，如果<0，则直接更新遍历点为右边界

cpp

```cpp
class Solution {
public:
    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
        int n = gas.size();
        for (int i = 0, j; i < n;) { // i 是枚举起点
            int left = 0; // 剩余油量
            for (j = 0; j < n; j ++ ) { // j 表示从枚举起点向后走几步
                int k = (i + j) % n; // 计算索引值
                left += gas[k] - cost[k];
                if (left < 0) break;
            }
            if (j == n) return i; // 说明够一圈了，此时的枚举起点i就是答案
            i = i + j + 1; // j 表示走过几步后，油不够了，所以跳过中间的枚举起点
        }
        return -1;
    }
};
```

js

```js
/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function(gas, cost) {
    const n = gas.length;
    for (let i = 0, j; i < n;) { // i 是枚举的起点
        let left = 0; // 剩余油量
        for (j = 0; j < n; j++) {
            let k = (i + j) % n; // 当前索引
            left += gas[k] - cost[k];
            if (left < 0) break;
        }
        if (j === n) return i;
        i = i + j + 1; // 不是n说明不够一圈的，跳过中间枚举起点
    }
    return  -1;
};
```

### [12. 整数转罗马数字](https://leetcode.cn/problems/integer-to-roman/)

思路

<img src="http://cdn.wangtongmeng.com/20240922082229-b702ae.png" style="zoom: 25%;" />

找规律

```bash
2649 （选红圈的数字，保证操作一致）
2649，大于等于 1000, 2649-1000=1649，结果M
1649，大于等于 1000, 1649-1000=649，结果MM
649， 大于等于 500，649-500=149，结果MMD
129，大于等于100，149-100=49，结果MMDC
49，大于等于40，49-40=9，结果MMDCXL
9，大于等于9，结果MMDCXLIX
```



<img src="http://cdn.wangtongmeng.com/20240922082949-b864a0.png" style="zoom:25%;" />

cpp

```cpp
class Solution {
public:
    string intToRoman(int num) {
        int values[] = {
            1000,
            900, 500, 400, 100,
            90, 50, 40, 10,
            9, 5, 4, 1
        };
        string reps[] = {
            "M",
            "CM", "D", "CD", "C",
            "XC", "L", "XL", "X",
            "IX", "V", "IV", "I",
        };
        string res;
        for (int i = 0; i < 13; i ++ ) {
            while (num >= values[i]) {
                num -= values[i];
                res += reps[i];
            }
        }
        return res;
    }
};
```

js

```js
/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {
    const values = [
        1000,
        900, 500, 400, 100,
        90, 50, 40, 10,
        9, 5, 4, 1
    ]
    const reps = [
        "M",
        "CM", "D", "CD", "C",
        "XC", "L", "XL", "X",
        "IX", "V", "IV", "I",
    ]
    let res = '';
    for (let i = 0; i < 13; i++) {
        while (num >= values[i]) {
            num -= values[i];
            res += reps[i];
        }
    }
    return res;
};
```

### [13. 罗马数字转整数](https://leetcode.cn/problems/roman-to-integer/)

思路：我们发现除了绿圈的，其他都是加上罗马数字对应的数字，而绿圈例如4对应的IV可以拆成V-I（I在前小于V）=5-1=4

```bash
MMDCXLIX
M 1000
M 1000
D 500
C 100
X 10 比后面小 -10
L 50
I 1 比后面小 -1
X 10
```



<img src="http://cdn.wangtongmeng.com/20240922091350-0fcbd0.png" style="zoom:25%;" />

cpp

```cpp
class Solution {
public:
    int romanToInt(string s) {
        unordered_map<char, int> hash;
        hash['I'] = 1, hash['V'] = 5;
        hash['X'] = 10, hash['L'] = 50;
        hash['C'] = 100, hash['D'] = 500;
        hash['M'] = 1000;

        int res = 0;
        for (int i = 0; i < s.size(); i ++ ) {
            if (i + 1 < s.size() && hash[s[i]] < hash[s[i + 1]])
                res -= hash[s[i]];
            else
                res += hash[s[i]];
        }
        return res;
    }
};
```

js

```js
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    const map = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    }

    let res = 0;
    for (let i = 0; i < s.length; i++) {
        if (i + 1 < s.length && map[s[i]] < map[s[i + 1]]) {
            res -= map[s[i]];
        }else {
            res += map[s[i]];
        }
    }

    return res;
};
```

### [58. 最后一个单词的长度](https://leetcode.cn/problems/length-of-last-word/)

cpp stringstream

```cpp
class Solution {
public:
    int lengthOfLastWord(string s) {
        stringstream ssin(s);
        int res = 0;
        string word;
        while (ssin >> word) res = word.size();
        return res;
    }
};
```

cpp 双指针

```cpp
class Solution {
public:
    int lengthOfLastWord(string s) {
        for (int i = s.size() - 1; i >= 0; i --) {
            if (s[i] == ' ') continue;
            int j = i - 1;
            while (j >= 0 && s[j] != ' ') j -- ;
            return i - j;
        }

        return 0;
    }
};	
```

js 双指针

```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
    for (let i = s.length - 1; i >= 0; i--) {
        if (s[i] === ' ') continue;
        let j = i - 1;
        while (j >= 0 && s[j] != ' ') j--;
        return i - j;
    }
    return 0;
};
```

### [14. 最长公共前缀](https://leetcode.cn/problems/longest-common-prefix/)

cpp

```cpp
class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        string res;
        if (strs.empty()) return res;

        for (int i = 0;;i ++) {
            if (i >= strs[0].size()) return res;
            char c = strs[0][i];
            for (auto& str: strs)
                if (str.size() <= i || str[i] != c)
                    return res;
            res += c;
        }

        return res;
    }
};
```

js

```js
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    let res = '';
    if (!strs) return res;

    for (let i = 0;; i++) { // 注意这里终止条件不是 i < strs.length
        if (i >= strs[0].length) return res;
        let c = strs[0][i];
        for (let str of strs) {
            if (str.length <= i || str[i] != c) {
                return res;
            }
        }
        res += c;
    }
    return res;
};
```

### [151. 反转字符串中的单词](https://leetcode.cn/problems/reverse-words-in-a-string/)

思路

- 先整体翻转，再局部翻转

<img src="http://cdn.wangtongmeng.com/20240922145316-4958a1.png" style="zoom:25%;" />

删空格

<img src="http://cdn.wangtongmeng.com/20240922145423-b0a507.png" style="zoom:25%;" />

cpp

```cpp
class Solution {
public:
    string reverseWords(string s) {
        int k = 0; // 当前单词的位置
        for (int i  = 0; i < s.size(); i ++ ) {
            if (s[i] == ' ') continue;
            int j = i, t = k;
            // 找到第一个单词，并挪到s的开头
            while (j < s.size() && s[j] != ' ') s[t ++ ] = s[j ++ ];
            reverse(s.begin() + k, s.begin() + t);
            s[t ++ ] = ' '; // 补上空格
            k = t, i = j;
        }
        if (k) k -- ; // 将最后的空格删掉（前面操作每挪动一个单词后面加个一个空格）
        s.erase(s.begin() + k, s.end()); // 删掉k之后的部分
        reverse(s.begin(), s.end()); // 翻转整个字符串
        return s;

    }
};
```

js

```js
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    let res = '';
    
    for (let i = 0; i < s.length;) {
        let word = '';
        let j = i;
        while (s[j] != ' ' && j < s.length) {
            word += s[j];
            j++
        }
        if (word) {
            if (res) {
                res = word + ' ' + res;
            } else {
                res = word;
            }
            
        }
        i = j + 1;
    }

    return res;
};
```

### [6. Z 字形变换](https://leetcode.cn/problems/zigzag-conversion/)

思路

<img src="http://cdn.wangtongmeng.com/20240920111932-c35ad5.png" style="zoom:50%;" />

cpp

```cpp
class Solution {
public:
    string convert(string s, int n) {
        string res;
        if (n == 1) return s;
        for (int i = 0; i < n; i ++ ) {
            // 第一行和最后一行是一个等差数列
            if (i == 0 || i == n - 1) {
                for (int j = i; j < s.size(); j += 2 * n - 2) {
                    res += s[j];
                }
            } else {
                // 中间行是两个等差数列
                for (int j = i, k = 2 * n - 2 - i; j < s.size() || k < s.size(); j += 2 * n - 2, k += 2 * n - 2) {
                    if (j < s.size()) res += s[j];
                    if (k < s.size()) res += s[k];
                }
            }
        }

        return res;
    }
};
```

js

```js
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, n) {
    let res = '';
    if (n === 1) return s;
    let len = s.length;
    for (let i = 0; i < n; i++) {
        if (i === 0 || i === n - 1) {
            for (let j = i; j < len; j += 2 * n - 2)
                res += s[j];
        } else {
            for (let j = i, k = 2 * n - 2 - i; j < len || k < len; j += 2 * n - 2, k += 2 * n - 2) {
                if (j < len) res += s[j];
                if (k < len) res += s[k];
            }
        }
    }
    return res;
};



提取下变量
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, n) {
    let res = '', len = s.length, step = 2 * n - 2;
    if (n === 1) return s;
    for (let i = 0; i < n; i++) {
        if (i === 0 || i === n - 1) {
            for (let j = i; j < len; j += step) {
                res += s[j];
            }
        } else {
            for (let j = i, k = step - j; j < len || k < len; j += step, k += step) {
                if (j < len) res += s[j];
                if (k < len) res += s[k];
            }
        }
    }
    return res;
};
```

### [28. 找出字符串中第一个匹配项的下标](https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/)

思路：KMP

next[1] = 0 ，需要特判一下，下标是从1开始的，自身不能算，所以是0。

<img src="http://cdn.wangtongmeng.com/20240922214139-7b36ca.png" style="zoom:25%;" />

cpp

```cpp
class Solution {
public:
    int strStr(string s, string p) {
        if (p.empty()) return 0;
        int n = s.size(), m = p.size();
        s = ' ' + s, p = ' ' + p; // 加空格是为了从1开始

        vector<int> next(m + 1);
        for (int i = 2, j = 0; i <= m; i ++ ) {
            while (j && p[i] != p[j + 1]) j = next[j];
            if (p[i] == p[j + 1]) j ++ ;
            next[i] = j;
        }

        for (int i = 1, j = 0; i <= n; i ++ ) {
            while (j && s[i] != p[j + 1]) j = next[j];
            if (s[i] == p[j + 1]) j ++ ;
            if (j == m) return i - m; // i - m + 1 - 1 结果是从0开始的所以-1
        }
        return -1;
    }
};
```

js

```js
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(s, p) {
    if (!p) return 0;
    let n = s.length, m = p.length;
    s = ' ' + s, p = ' ' + p;
    let next = new Array(m + 1).fill(0);
    for (let i = 2, j = 0; i <= m; i++) {
        while (j && p[i] !== p[j+1]) j = next[j];
        if (p[i] === p[j + 1]) j++;
        next[i] = j;
    }

    for (let i = 1, j = 0; i <= n; i++) {
        while (j && s[i] != p[j + 1]) j = next[j];
        if (s[i] === p[j + 1]) j++;
        if (j === m) return i - m;
    }
    return -1;
};
```

## 双指针

### [125. 验证回文串](https://leetcode.cn/problems/valid-palindrome/)

cpp

```cpp
class Solution {
public:
    bool check(char c) {
        return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z' || c >= '0' && c <= '9';
    }

    bool isPalindrome(string s) {
        for (int i = 0, j = s.size() - 1; i < j; i ++, j -- ) {
            while (i < j && !check(s[i])) i ++ ;
            while (i < j && !check(s[j])) j -- ;
            if (i < j && tolower(s[i]) != tolower(s[j])) return false;
        }

        return true;
    }
};
```

js

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {

    function check(c) {
        return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z' || c >= '0' && c <= '9';
        // return /^[a-zA-Z0-9]$/.test(c);
    }


    for (let i = 0, j = s.length - 1; i <j; i++, j--) {
        while (i < j && !check(s[i])) i++;
        while (i < j && !check(s[j])) j--;
        if (i < j && s[i].toLowerCase() !== s[j].toLowerCase()) return false; 
    }
    return true;
};
```

### [392. 判断子序列](https://leetcode.cn/problems/is-subsequence/)

给定字符串 **s** 和 **t** ，判断 **s** 是否为 **t** 的子序列

思路：遍历t，维护一个索引k，看t中字符是否是s最前面的字符，如果是k+1,看下一个字符，如果子序列则k===s.length

cpp

```cpp
class Solution {
public:
    bool isSubsequence(string s, string t) {
        int k = 0; // k 表示子序列的索引，查找索引对应字符是否在t中有
        for (auto c: t)
            if (k < s.size() && c == s[k])
                k ++ ;
        return k == s.size();
    }
};
```

js

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function(s, t) {
    let k = 0;
    for (let c of t) {
        if (k < s.length && c === s[k]) {
            k++;
        }
    }
    return k === s.length;
};
```

### [167. 两数之和 II - 输入有序数组](https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/)

思路：经典的双指针算法，先暴力，再看有没有单调性做优化

a[i]+a[j] = target，当i++时，j只能j--，有单调性

当i=0时，找到a[i]+a[j] > target 的最小j

当i++时，满足和等于target的j一定是更小的

cpp

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        for (int i = 0, j = numbers.size() - 1; i < j; i ++ ) {
            while (i < j && numbers[i] + numbers[j] > target) j -- ; // 找到最小的j，满足和大于 target
            if (i < j && numbers[i] + numbers[j] == target) return {i + 1, j + 1}; // 下标从1开始，这里+1
        }
        return {};
    }
};
```

js

```js
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    for (let i = 0, j = numbers.length -1; i < j; i++) {
        while (i < j && numbers[i] + numbers[j] > target) j--;
        if (i < j && numbers[i] + numbers[j] === target) return [i + 1, j + 1];
    }
    return {};
};
```

### [11. 盛最多水的容器](https://leetcode.cn/problems/container-with-most-water/)

思路

```bash
const values = [1,8,6,2,5,6,8,3,7]
const index =  [0,1,2,3,4,5,6,7,8]
l=0,r=8,area=min(1,7)*(8-0)=8
1比较矮
l=1,r=8,area=min(8,7)*(8-1)=49 最大值
...
```

为什么这样可以

<img src="http://cdn.wangtongmeng.com/20240923001042-77b476.png" style="zoom: 50%;" />

cpp

```cpp
class Solution {
public:
    int maxArea(vector<int>& height) {
        int res = 0;
        for (int i = 0, j = height.size() - 1; i < j;) {
            res = max(res, min(height[i], height[j]) * (j - i));
            // 假设左边是最大边界，那么右侧不断向左靠拢一定会找到右侧的最大边界
            if (height[i] > height[j]) j --; // 如果左边大于右边，则右边一定不是最优解的边，所以j--
            else i ++;
        }
        return res;
    }
};
```

js

```js
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let res = 0, len = height.length;
    for (let i = 0, j = len - 1; i < j;) {
        res = Math.max(res, Math.min(height[i], height[j]) * (j - i));
        if (height[i] > height[j]) j--;
        else i++;
    }
    return res;
};
```

### [15. 三数之和](https://leetcode.cn/problems/3sum/)

思路

- 双指针，先不考虑重复的问题，先排序
- 要求指针 i<j<k，当i固定后，jk就可以做双指针了
- 找到一个最小的j，使得nums[j]+nums[k]+nums[i]>=0
- j越大，k越小，有单调性
- i一层循环，加上jk的O(n)，时间复杂度是O(n^2)
- 重复的问题

```bash
1 1 1 1 1 -2
i
  i
如果num[i]和上一个num[i]相同说明相同，跳过
```

cpp

```cpp
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        vector<vector<int>> res;
        sort(nums.begin(), nums.end()); // 排序
        // 三个指针 i < j < k
        for (int i = 0; i < nums.size(); i ++ ) {
            if (i && nums[i] == nums[i - 1]) continue; // 去重
            for (int j = i + 1, k = nums.size() - 1; j < k; j ++ ) { // j对应值有可能和i对应值相同的
                if (j > i + 1 && nums[j] == nums[j - 1]) continue; // 去重 j > i + 1 表示 j 不能是第一个数
                // 在i固定的情况下，找到最小的j
                while (j < k - 1 && nums[i] + nums[j] + nums[k - 1] >= 0) k -- ; // j < k - 1, k-1是k的下一个数，看下是否满足条件
                if (nums[i] + nums[j] + nums[k] == 0) {
                    res.push_back({nums[i], nums[j], nums[k]});
                }
            }
        }
        return res;
    }
};
```

js

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    const res = [], len = nums.length;

    // 从小到大排序
    nums.sort((a,b)=>a-b); // 注意：nums.sort()不行

    for (let i = 0; i < len; i++) {
        if (i && nums[i] === nums[i - 1]) continue; // 去重
        for (j = i + 1, k =  len - 1; j < k; j++) { // 双指针算法
            if (j > i + 1 && nums[j] === nums[j - 1]) continue; // 去重
            // 找到最小的k满足条件，注意这里是k-1
            while (j < k - 1 && nums[i] + nums[j] + nums[k - 1] >= 0) k--;

            if (nums[i] + nums[j] + nums[k] === 0) {
                res.push([nums[i], nums[j], nums[k]]);
            }
        }
    }

    return res;
};
```

## 滑动窗口

## 矩阵

### [36. 有效的数独](https://leetcode.cn/problems/valid-sudoku/)

思路：每行、每列、每个九宫格内是不是有重复元素

cpp

```cpp
class Solution {
public:
    bool isValidSudoku(vector<vector<char>>& board) {
        bool st[9];

        // 判断行
        for (int i = 0; i < 9; i ++) {
            memset(st, 0, sizeof st); // 清空数组
            for (int j = 0; j < 9; j ++ ) {
                if (board[i][j] != '.') {
                    int t = board[i][j] - '1'; // 要把字符的1-9变成0-8
                    if (st[t]) return false; // 如果出现过返回false
                    st[t] = true;
                }
            }
        }

        // 判断列
        for (int i = 0; i < 9; i ++) {
            memset(st, 0, sizeof st); // 清空数组
            for (int j = 0; j < 9; j ++ ) {
                if (board[j][i] != '.') { // 交换i j 即可
                    int t = board[j][i] - '1';
                    if (st[t]) return false;
                    st[t] = true;
                }
            }
        }

        // 判断小方格
        for (int i = 0; i < 9; i += 3) {
            for (int j = 0; j < 9; j += 3) {
                // i j 是每个小方格的起点
                memset(st, 0, sizeof st);
                for (int x = 0; x < 3; x ++ )
                    for (int y = 0; y < 3; y ++ ) {
                        if (board[i + x][j + y] != '.') {
                            int t = board[i + x][j + y] - '1';
                            if (st[t]) return false;
                            st[t] = true;
                        }
                    }
            }
        }

        return true;
    }
};
```

js

```js
/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
    // 检查每行、每列、每个九宫格是否有重复元素
    let set = new Set(); // 记录数字是否出现过

    // 检查行
    for (let i = 0; i < 9; i++) {
        set.clear(); // 清空set
        for (let j = 0; j < 9; j++) {
            if (board[i][j] !== '.') {
                let t = Number(board[i][j]);
                if (set.has(t)) return false;
                set.add(t);
            }
        }
    }

    // 检查列
    for (let i = 0; i < 9; i++) {
        set.clear(); // 清空set
        for (let j = 0; j < 9; j++) {
            if (board[j][i] !== '.') {
                let t = Number(board[j][i]);
                if (set.has(t)) return false;
                set.add(t);
            }
        }
    }

    // 检查九宫格
    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
            set.clear(); // 清空set
            for (let x = 0; x < 3; x++) {
                for (let y = 0; y < 3; y++) {
                    if (board[i + x][j + y] !== '.') {
                        let t = Number(board[i + x][j + y]);
                        if (set.has(t)) return false;
                        set.add(t);
                    }
                }
            }
        }
    }
    return true;
};
```

### [54. 螺旋矩阵](https://leetcode.cn/problems/spiral-matrix/)

思路：偏移量的做法

定义四个方向

<img src="http://cdn.wangtongmeng.com/20240923232015-56f080.png" style="zoom: 25%;" />

cpp

```cpp
class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        vector<int> res;
        int n = matrix.size(); // 行数
        if (!n) return res;
        int m = matrix[0].size(); // 列数

        // x轴(向下)y轴(向右)偏移量
        int dx[] = {0, 1,0, -1}, dy[] = {1, 0, -1, 0}; // 右 下 左 上
        vector<vector<bool>> st(n, vector<bool>(m)); // 记录走过的坐标

        // i < n * m 控制遍历总数量;x,y是数的坐标；d是方向
        for (int i = 0, x = 0, y = 0, d = 0; i < n * m; i ++ ) {
            res.push_back(matrix[x][y]);
            st[x][y] = true;

            int a = x + dx[d], b = y + dy[d]; // 下一个点的坐标
            if (a < 0 || a >= n || b < 0 || b >= m || st[a][b]) {
                // 若越界或者重复了，则改变方向
                d = (d + 1) % 4;
                a = x + dx[d], b = y + dy[d]; 
            }

            x = a, y = b;
        }

        return res;
    }
};
```

js

```js
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    let res = [];
    let n = matrix.length; // 行数
    if (!n) return res;
    let m = matrix[0].length; // 列数
    let st = Array.from({length: n}, () => Array(m).fill(false)); // 记录是否走过
    // 偏移量 x轴朝下，y轴朝右
    let dx = [0 , 1, 0, -1], dy = [1, 0, -1, 0];  // 右->下->左->上

    for (let i = 0, x = 0, y = 0, d = 0; i < n * m; i++) {
        res.push(matrix[x][y]);
        st[x][y] = true;

        let a = x + dx[d], b = y + dy[d];
        if (a < 0 || a >= n || b < 0 || b >= m || st[a][b]) {
            d = (d + 1) % 4;
            a = x + dx[d], b = y + dy[d];
        }
        x = a, y = b;
    }
    return res;
};
```

### [48. 旋转图像](https://leetcode.cn/problems/rotate-image/)

思路：先沿对角线翻转，再左右翻转

cpp

```cpp
class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int n = matrix.size();
        // 沿斜对角线翻转
        for (int i = 0; i < n; i ++ )
            for (int j = 0; j < i; j ++ )
                swap(matrix[i][j], matrix[j][i]);
        
        // 左右翻转
        for (int i = 0; i < n; i ++)
            for (int j = 0, k = n - 1; j < k; j ++, k -- )
                swap(matrix[i][j], matrix[i][k]);
    }
};
```

js

```js
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
    let n = matrix.length;

    function swap(matrix, x1, y1, x2, y2) {
        let tmp = matrix[x1][y1];
        matrix[x1][y1] = matrix[x2][y2];
        matrix[x2][y2] = tmp;
    }

    // 沿对角线翻转
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            swap(matrix, i, j, j, i);
        }
    }
    // 左右翻转
    for (let i = 0; i < n; i++) {
        for (let j = 0, k = n - 1; j < k; j++, k--) {
            swap(matrix, i, j, i, k);
        }
    }
};
```

### [73. 矩阵置零](https://leetcode.cn/problems/set-matrix-zeroes/)

思路

- 方法1：暴力做法

暴力做法

<img src="http://cdn.wangtongmeng.com/20240924082737-213a7a.png"  />

优化

每列只用刷一次

用数组记录下来需要刷的行和列

![](http://cdn.wangtongmeng.com/20240924083047-081592.png)

继续优化空间，空间能优化到O(1)

![](http://cdn.wangtongmeng.com/20240924083532-1397c7.png)

cpp

```cpp
class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        if (matrix.empty() || matrix[0].empty()) return; // 若行或列为空则不继续
        int n = matrix.size(), m = matrix[0].size(); // n 行数 m 列数
        int r0 = 1, c0 = 1; // r0 首行 c0 首列
        // 首行是否需要设为0
        for (int i = 0; i < m; i ++ ) {
            if (!matrix[0][i])
                r0 = 0;
        }
        // 首列是否需要设为0
        for (int i = 0; i < n; i ++ ) {
            if (!matrix[i][0])
                c0 = 0;
        }
        // 除首行外的其他每行是否设为0
        for (int i = 1; i < n; i ++ ) {
            for (int j = 0; j < m; j ++ )
                if (!matrix[i][j])
                    matrix[i][0] = 0;
        }
        // 除首列外的其他每列是否设为0
        for (int i = 1; i < m; i ++ )
            for (int j = 0; j < n; j ++ )
                if (!matrix[j][i])
                    matrix[0][i] = 0;
        // 把除首行外的所有标记的行设为0
        for (int i = 1; i < n; i++) {
            if (!matrix[i][0])
                for (int j = 0; j < m; j ++ )
                    matrix[i][j] = 0;
        }  
        // 把除首列外的所有标记的列设为0
        for (int i = 1; i < m; i++) {
            if (!matrix[0][i])
                for (int j = 0; j < n; j ++ ) {
                    matrix[j][i] = 0;
                }
        }
        // 首行是否设为0
        if (!r0)
            for (int i = 0; i < m; i ++ ) 
                matrix[0][i] = 0;
        // 首列是否设为0
        if (!c0)
            for (int i = 0; i < n; i ++ )
                matrix[i][0] = 0;
    }
};
```

js

```js
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
    if (!matrix.length || !matrix[0].length) return;  // 若行或列为空则不继续
    let n = matrix.length, m = matrix[0].length; // n 行数 m 列数
    let r0 = 1, c0 = 1; // r0 首行是否设为0 c0 首列是否设为0
    // 首行是否需要设为0
    for (let i = 0; i < m; i++) {
        if (!matrix[0][i]) {
            r0 = 0;
        }
    }
    // 首列是否需要设为0
    for (let i = 0; i < n; i++) {
        if (!matrix[i][0]) {
            c0 = 0;
        }
    }
    // 除首行外的其他每行是否设为0
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < m; j++){
            if (!matrix[i][j]) {
                matrix[i][0] = 0;
            }
        }
    }
    // 除首列外的其他每列是否设为0
    for (let i = 1; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (!matrix[j][i]) {
                matrix[0][i] = 0;
            }
        }
    }
    // 把除首行外的所有标记的行设为0
    for (let i = 1; i < n; i++) {
        if (!matrix[i][0]) {
            for (let j = 0; j < m; j++) {
                matrix[i][j] = 0;
            }
        }
    }
    // 把除首列外的所有标记的列设为0
    for (let i = 1; i < m; i++) {
        if (!matrix[0][i]) {
            for (let j = 0; j < n; j++) {
                matrix[j][i] = 0;
            }
        }
    }
    // 首行是否设为0
    if (!r0) {
        for (let i = 0; i < m; i++) {
            matrix[0][i] = 0;
        }
    }
    // 首列是否设为0
    if (!c0) {
        for (let i = 0; i < n; i++) {
            matrix[i][0] = 0;
        }
    }
};
```

### [289. 生命游戏](https://leetcode.cn/problems/game-of-life/)

思路：

每个细胞活的用1表示，死的用0表示

当细胞是活的，周围或<2或者>3，它将死亡

当细胞是死的，只有周围活细胞数=3，才会复活



如果不影响老值的情况存储新值：利用位的前一位存储

一个细胞只能是 0 或 1，对应二进制是00 01，那么左边的0是可以用来记录新值的

若新结果是1，则 1 << 1的二进制就是 10，00 |= 00，10 这样同时存储了新值和老值

这样当遍历下一个节点时，只需要判断 xx & 1，只是用右边一位进行判断就不影响老值的判断了

<img src="http://cdn.wangtongmeng.com/20240924101008-1e871c.png" style="zoom: 25%;" />

cpp

```cpp
class Solution {
public:
    void gameOfLife(vector<vector<int>>& board) {
        if (board.empty() || board[0].empty()) return;
        int n = board.size(), m = board[0].size();
        for (int i = 0; i < n; i ++ )
            for (int j = 0; j < m; j ++ ) {
                int live = 0; // 记录细胞周围8个点的存活数
                for (int x = max(0, i - 1); x <= min(n - 1, i + 1); x ++ )
                    for (int y = max(0, j - 1); y <= min(m - 1, j + 1); y ++ )
                        if ((x != i || y != j) && (board[x][y] & 1)) // x != i || y != j 表示要去掉自身
                            live ++ ;
                int cur = board[i][j] & 1, next; // cur 是自身细胞是否存活
                if (cur) { // 自身是活的
                    if (live < 2 || live > 3) next = 0;
                    else next = 1;
                } else { // 自身是死的，只有周围有三个活细胞时才能复活
                    if (live == 3) next = 1;
                    else next = 0;
                }
                board[i][j] |= next << 1; // 利用位左移一位记录(原数值还在原位的)
            }

        for (int i = 0; i < n; i ++ )
            for (int j = 0; j < m; j ++ )
                board[i][j] >>= 1; // 取每个网格的第二位，得到更新后状态
    }
};
```

js

```js
/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var gameOfLife = function(board) {
   if (!board.length || !board[0].length) return;
   let n = board.length; m = board[0].length; 
   for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
        let live = 0; // 记录细胞周围8个点的存活数
        for (let x = Math.max(0, i - 1); x <= Math.min(n - 1, i + 1); x++ ) {
            for (let y = Math.max(0, j - 1); y <= Math.min(m - 1, j + 1); y++) {
                 // x != i || y != j 表示要去掉自身 注意要用||！！
                 // board[i][j] & 1 表示周围的这个点是存活的
                if ((x !== i || y !== j) && board[x][y] & 1) {
                    live++;
                }
            }
        }
        let cur = board[i][j] & 1, next; // cur 是自身细胞是否存活
        if (cur) {
            if (live < 2 || live > 3) next = 0;
            else next = 1;
        } else { // 自身是死的，只有周围有三个活细胞时才能复活
            if (live === 3) next = 1;
            else next = 0;
        }
        board[i][j] |= next << 1; // 利用位将新结果存储在老值位的左边
    }
   }

   for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
        board[i][j] >>= 1; // 将值像右位移一位就是新的值
    }
   }
};
```



## 哈希表

### [383. 赎金信](https://leetcode.cn/problems/ransom-note/)

cpp

```cpp
class Solution {
public:
    bool canConstruct(string a, string b) {
        unordered_map<char, int> hash;
        for (auto c: b) hash[c] ++ ;
        for (auto c: a)
            if (!hash[c]) return false;
            else hash[c] --;
        return true;
    }
};
```

js

```js
/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function(a, b) {
    if (b.length < a.length) return false;
    let hash = {};
    for (let c of b) hash[c] ? hash[c]++ : hash[c] = 1;
    for (let c of a) {
        if (!hash[c]) return false;
        else hash[c]--;
    }
    return true;
};
```

### [205. 同构字符串](https://leetcode.cn/problems/isomorphic-strings/)

思路

- 所有相同字符都映射到相同字符 s的t的映射
- 不同字符不能映射到相同字符 t到s的映射

cpp

```cpp
class Solution {
public:
    bool isIsomorphic(string s, string t) {
        unordered_map<char, char> st, ts; // st s到t的映射，ts t到s的映射
        for (int i = 0; i < s.size(); i ++ )
        {
            int a = s[i], b = t[i];
            if (st.count(a) && st[a] != b) return false; // 若s到t的映射不是同一个字符，返回false
            st[a] = b; // 存储s字符到t字符的映射
            if (ts.count(b) && ts[b] != a) return false; // 不同字符不能映射到同一个字符上
            ts[b] = a;
        }
        return true;
    }
};
```

js

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function(s, t) {
    let st = {}, ts = {}; // 注意这里分开写，连等会出错
    for (let i = 0; i < s.length; i++) {
        let a = s[i], b = t[i];
        if (st[a] && st[a] !== b) return false; // 说明s到t，相同字符映射的不是同一个字符，返回false
        st[a] = b;
        if (ts[b] && ts[b] !== a) return false; // 说明s到t,不同的字符映射到了同一个字符，返回false
        ts[b] = a;
    }
    return true;
};
```

### [290. 单词规律](https://leetcode.cn/problems/word-pattern/)

知识：离散数学

思路：

- 满射：patten的字符数=s的单词数
- 单射：判断A里面是否有两个不同元素映射到B里相同元素

<img src="http://cdn.wangtongmeng.com/20240926090345-896d0b.png" style="zoom:33%;" />



cpp

```cpp
class Solution {
public:
    bool wordPattern(string pattern, string s) {
        vector <string> words;
        stringstream ssin(s);
        string word;
        while (ssin >> word) words.push_back(word);
        if (pattern.size() != words.size()) return false;
        unordered_map<char, string> pw;
        unordered_map<string, char> wp;
        for (int i = 0; i < pattern.size(); i ++ ) {
            auto a= pattern[i];
            auto b = words[i];
            if (pw.count(a) && pw[a] != b) return false;
            pw[a] = b;
            if (wp.count(b) & wp[b] != a) return false;
            wp[b] = a;
        }
        return true;
    }
};
```

js

```js
/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function(pattern, s) {
    let words = s.split(' '); 
    if (pattern.length !== words.length) return false;
    let pw = {}, wp = {};
    for (let i = 0; i < pattern.length; i++) {
        let a = pattern[i];
        let b = words[i];
        //  "dog constructor constructor dog" 这个constructor如果用对象来保存的时候，拿出去判断空的时候，会判断原型中的constructor方法，这样导致结果出错。所以只能用hasOwnProperty去判断这个方法是不是属于该对象的自有属性。
        if (pw.hasOwnProperty(a) && pw[a] !== b) return false;
        pw[a] = b;
        if (wp.hasOwnProperty(b) && wp[b] !== a) return false;
        wp[b] = a;
    }
    return true;
    
};
```

### [242. 有效的字母异位词](https://leetcode.cn/problems/valid-anagram/)

思路：hash表

cpp

```cpp
class Solution {
public:
    bool isAnagram(string s, string t) {
        unordered_map<char, int> a, b; // 如果输入字符串包含 unicode  可以unorderd_map<string, int>
        for (auto c: s) a[c] ++ ;
        for (auto c: t) b[c] ++ ;
        return a == b; // c++中的容器都是支持比较运算的
    }
};
```

js

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    if (s.length !== t.length) return false;
    let sHash = new Map(), tHash = new Map();
    for (let c of s) {
        if (sHash.get(c)) {
            sHash.set(c, sHash.get(c) + 1);
        } else {
            sHash.set(c, 1);
        }
    }

    for (let c of t) {
        if (!sHash.get(c)) return false;
        sHash.set(c, sHash.get(c) - 1);
    }

    return true;
};
```

### [49. 字母异位词分组](https://leetcode.cn/problems/group-anagrams/)

思路：把每个单词排序，这样字母异或位词就相等了

cpp

```cpp
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> hash;
        for (auto& str: strs) {
            string nstr = str;
            sort(nstr.begin(), nstr.end()); // 将单词的字母排序，作为hash表的key
            hash[nstr].push_back(str);
        }

        vector<vector<string>> res;
        for (auto& item : hash) res.push_back(item.second);

        return res;
    }
};
```

js

```js
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    let hash = new Map();
    for (let str of strs) {
        let nstr = str.split("").sort().join(""); // 排过序的单词，作为hash表的key
        let val = hash.get(nstr) ? hash.get(nstr) : [];
        val.push(str);
        hash.set(nstr, val); 
    }
    
    let res = [];
    hash.forEach((val) => {
        res.push(val);
    })
    return res;
};
```

### [1. 两数之和](https://leetcode.cn/problems/two-sum/)

cpp

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // map Olog(N) unordered map O(1)
        unordered_map<int, int> heap;
        for (int i  = 0; i < nums.size(); i ++ ) {
            int r = target - nums[i];
            if (heap.count(r)) return {heap[r], i};
            heap[nums[i]]  = i;
        }
        return {};
    }
};
```

js

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
   let map = new Map()
   for (let i = 0; i <= nums.length - 1; i++) {

       let n = nums[i]
       let n2 = target - n

       if (!map.has(n2)) {
           map.set(n, i)
       } else {
           return [i, map.get(n2)]
       }
   }
};
```

### [202. 快乐数](https://leetcode.cn/problems/happy-number/)

思路：双指针

cpp

```cpp
class Solution {
public:
    int get(int x) {
        int res = 0;
        while (x) {
            res += (x % 10) * (x % 10);
            x /= 10;
        }
        return res;
    }

    bool isHappy(int n) {
        int fast = get(n), slow = n;
        while (fast != slow) {
            fast = get(get(fast));
            slow = get(slow);
        }
        return fast == 1;
    }
};
```

js

```js
```



## 区间

### [228. 汇总区间](https://leetcode.cn/problems/summary-ranges/)

思路：双指针

cpp

```cpp
class Solution {
public:
    vector<string> summaryRanges(vector<int>& nums) {
        vector<string> res;
        for (int i = 0; i < nums.size(); i ++ ) {
            int j = i + 1;
            while (j < nums.size() && nums[j] == nums[j - 1] + 1) j ++ ;
            if (j == i + 1) res.push_back(to_string(nums[i]));
            else res.push_back(to_string(nums[i]) + "->" + to_string(nums[j - 1]));
            i = j - 1;
        }
        return res;
    }
};
```

js

```js
/**
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function(nums) {
    const res = [], len = nums.length;
    for (let i = 0; i < len; i++) {
        let j = i + 1;
        while (j < len && nums[j] === nums[j - 1] + 1) j++;
        if (j === i + 1) res.push("" + nums[i]);
        else res.push(`${nums[i]}->${nums[j - 1]}`);
        i = j - 1; // 这里是 j - 1的原因是循环里有i++，这样就抵消了
    }
    return res;
};
```

### [56. 合并区间](https://leetcode.cn/problems/merge-intervals/)

思路

![](http://cdn.wangtongmeng.com/20241004061238-28ee3f.png)

cpp

```cpp
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& a) {
        vector<vector<int>> res;
        if (a.empty()) return res;

        sort(a.begin(), a.end());
        int l = a[0][0], r = a[0][1];
        for (int i = 1; i < a.size(); i ++ ) {
            if (a[i][0] > r) { // 没交集
                res.push_back({l, r});
                l = a[i][0], r = a[i][1];
            } else r = max(r, a[i][1]);
        }
        res.push_back({l, r});
        return res;
    }
};
```

js

```js
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(a) {
    const res = [];
    if (!a.length) return res;

    a.sort((a,b) => a[0] - b[0]); // 按区间左端点排序
    let l = a[0][0], r = a[0][1];
    for (let i = 1; i < a.length; i++) {
        if (a[i][0] > r) {
            res.push([l, r]);
            l = a[i][0], r = a[i][1];
        } else r = Math.max(r, a[i][1]);
    }

    res.push([l, r])

    return res;
};
```

### [57. 插入区间](https://leetcode.cn/problems/insert-interval/)

题意

![](http://cdn.wangtongmeng.com/20241004090152-b7b245.png)

思路：三部分，前后没交集的不用动，中间有交集的合并

![](http://cdn.wangtongmeng.com/20241005081306-4c452a.png)

cpp

```cpp
class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& a, vector<int>& b) {
        vector<vector<int>> res;
        int k = 0;
        while (k < a.size() && a[k][1] < b[0]) res.push_back(a[k ++ ]); // 左边完全没交集的部分

        if (k < a.size()) {
            b[0] = min(b[0], a[k][0]); // 有交集的区间最左边
            // a[k][0] <= b[1] 说明有交集，max(b[1], a[k ++ ][1]) 取两个区间右边最大值
            while (k < a.size() && a[k][0] <= b[1]) b[1] = max(b[1], a[k ++ ][1]);
        }
        res.push_back(b);

        while (k < a.size()) res.push_back(a[k ++ ]);
        return res;
    }
};
```

js

```js
/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function(a, b) {
    let res = [];
    let k = 0;
    while (k < a.length && a[k][1] < b[0]) res.push(a[k++]); // 左边没交集的区间

    if (k < a.length) {
        b[0] = Math.min(b[0], a[k][0]); // 有交集区间的最左段
        while (k < a.length && a[k][0] <= b[1]) b[1] = Math.max(b[1], a[k++][1]); // 有交集区间的最右端
    }
    res.push(b);

    while (k < a.length) res.push(a[k++]); // 右边没交集的区间
    return res;
};
```

### [452. 用最少数量的箭引爆气球](https://leetcode.cn/problems/minimum-number-of-arrows-to-burst-balloons/)

思路：转成一维的，贪心（区间选点，基础课里）

cpp

```cpp
class Solution {
public:
    int findMinArrowShots(vector<vector<int>>& points) {
        if (points.empty()) return 0;
        // 按区间的右端点从小到大排序
        sort(points.begin(), points.end(), [](vector<int> a, vector<int> b) {
            return a[1] < b[1];
        });
        int res = 1, r = points[0][1];
        for (int i = 1; i < points.size(); i ++ )
            if (points[i][0] > r) { // 如果选的点小于区间左端点，则更新选点为新区间的右端点
                res ++ ;
                r = points[i][1];
            }
        
        return res;
    }
};
```

js

```js
/**
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function(points) {
    if (!points.length) return 0;
    // 区间按右端点从小到大排序
    points.sort((a, b) => a[1] - b[1]); // 注意这里是 - 号，不能用 <
    
    let res = 1, r = points[0][1];
    for (let i = 1; i < points.length; i++) {
        if (points[i][0] > r) {
            res++;
            r = points[i][1];
        }
    }
    return res;
};
```



## 栈

### [20. 有效的括号](https://leetcode.cn/problems/valid-parentheses/)

思路：利用栈

括号的ascii码，如果是一对的话，差值不会大于2

![](http://cdn.wangtongmeng.com/20241005094056-57b297.png)

cpp

```cpp
class Solution {
public:
    bool isValid(string s) {
        stack<char> stk;

        for (auto c : s) {
            if (c == '(' || c == '[' || c == '{') stk.push(c);
            else {
                if (stk.size() && abs(stk.top() - c) <= 2) stk.pop();
                else return false;
            }
        }

        return stk.empty();
    }
};
```

js

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    let stk = [];
    for (let c of s) {
        if (c === '(' || c === '[' || c === '{') stk.push(c);
        else {
            if (stk.length && Math.abs(stk[stk.length - 1].charCodeAt(0) - c.charCodeAt(0)) <= 2) stk.pop();
            else return false;
        }
    }
    return !stk.length;
};


// var isValid = function(s) {
//     const len = s.length
//     if (len % 2 === 1) return false;

//     const map = new Map()
//     map.set('(', ')')
//     map.set('{', '}')
//     map.set('[', ']')
    
//     const stack = []
//     for (let i = 0; i < len; i++) {
//         const c = s[i]
//         if (map.has(c)) {
//             stack.push(c)
//         } else {
//             const t = stack[stack.length -1]
//             if (map.get(t) === c) {
//                 stack.pop()
//             } else {
//                 return false
//             }
//         }
//     }
//     return stack.length === 0
// };
```

### [71. 简化路径](https://leetcode.cn/problems/simplify-path/)

思路：利用栈的思路

cpp

```cpp
class Solution {
public:
    string simplifyPath(string path) {
        string res, name;
        if (path.back() != '/') path += '/';
        for (auto c: path) {
            if (c != '/') name += c;
            else {
                if (name == "..") {
                    while (res.size() && res.back() != '/') res.pop_back();
                    if (res.size()) res.pop_back(); // 去掉/
                } else if (name != "." && name != "") {
                    res += '/' + name;
                }
                name.clear();
            }
        }

        if (res.empty()) res = "/";
        return res;
    }
};
```

js

```js
/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function(path) {
    let arr = path.split("/");
    let res = [];
    for (let str of arr) {
        if (str === '.. ') {
            res.pop();
        } else if (str && (str != "/" && str != ".")) {
            res.push(str);
        }
    }
    return '/' + res.join("/");
};
```

### [155. 最小栈](https://leetcode.cn/problems/min-stack/)

思路：维护一个前缀最小值的栈，值单调递减的，但是是dp思想，不是单调栈

cpp 

```cpp
// 空间优化版
class MinStack {
public:
    stack<int> stk, f;
    MinStack() {

    }
    
    void push(int x) {
        stk.push(x);
        if (f.empty() || f.top() >= x) f.push(x);
    }
    
    void pop() {
        if (stk.top() <= f.top()) f.pop();
        stk.pop();
    }
    
    int top() {
        return  stk.top();

    }
    
    int getMin() {
        return f.top();
    }
};

/**
 * Your MinStack object will be instantiated and called as such:
 * MinStack* obj = new MinStack();
 * obj->push(val);
 * obj->pop();
 * int param_3 = obj->top();
 * int param_4 = obj->getMin();
 */
```

cpp

```cpp
```







## 链表

### [141. 环形链表](https://leetcode.cn/problems/linked-list-cycle/)

思路：

- 1.通过hash记录地址，看是否出现重复的
- 2.快慢指针

<img src="http://cdn.wangtongmeng.com/20240923093645-268e0f.png" style="zoom:25%;" />

cpp

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    bool hasCycle(ListNode *head) {
        if (!head || !head->next) return false;
        auto s = head, f = head->next;
        while (f) {
            s = s->next, f = f->next; // 都走一步
            if (!f) return false;
            f = f->next; // 快指针再走一步
            if (s == f) return true;
        }
        return false;
    }
};
```

js

```js
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
    if (!head || !head.next) return false;
    let s = head, f = head.next;
    while (f) {
        s= s.next, f = f.next;
        if (!f) return false;
        f = f.next;

        if (s === f) return true;
    }
    return false;
};
```

### [2. 两数相加](https://leetcode.cn/problems/add-two-numbers/)

cpp

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        auto dummy = new ListNode(-1), cur = dummy;
        int t = 0; // 进位数
        while (l1 || l2 || t) {
            if (l1) t += l1->val, l1 = l1->next;
            if (l2) t += l2->val, l2 = l2->next;
            cur = cur->next = new ListNode(t % 10);
            t /= 10;
        }

        return dummy->next;
    }
    
};
```

js

```js
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
    const dummy = new ListNode(-1)
    // cur 是链表尾节点，尾节点插入新节点
    let cur = dummy, t = 0; // t 存储进位数
    while (l1 || l2 || t) {
        if (l1) t += l1.val, l1 = l1.next;
        if (l2) t += l2.val, l2 = l2.next;
        cur = cur.next = new ListNode(t % 10)
        t = Math.floor(t / 10) // 进位数
    }
    return dummy.next
};
```

### [21. 合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists/)

思路：两个指针分别指向每个链表，比较头结点，把较小的节点加入新链表，最后将剩余的一个链表拼接即可

cpp

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        auto dummy = new ListNode(-1), tail = dummy; // tail是新链表的尾节点
        while (l1 && l2) {
            if (l1->val < l2->val) {
                tail = tail->next = l1;
                l1 = l1->next;
            } else {
                tail = tail->next = l2;
                l2 = l2->next;
            }
        }

        if (l1) tail->next = l1;
        if (l2) tail->next = l2;
        return dummy->next;
    }
};
```

js

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    let dummy = new ListNode(-1), tail = dummy;
    while (l1 && l2) {
        if (l1.val < l2.val) {
            tail = tail.next = l1;
            l1 = l1.next;
        } else {
            tail = tail.next = l2;
            l2 = l2.next;
        }
    }
    if (l1) tail.next = l1;
    if (l2) tail.next = l2;
    return dummy.next;
};
```

### [138. 随机链表的复制](https://leetcode.cn/problems/copy-list-with-random-pointer/) (暂跳过)

思路：

- 方法1.利用hash表
- 方法2.取巧，避免开hash表，省O(n)的空间

<img src="http://cdn.wangtongmeng.com/20240923101715-15f438.png" style="zoom:25%;" />

方法2思路

### [92. 反转链表 II](https://leetcode.cn/problems/reverse-linked-list-ii/)

思路

头结点有可能变，所以加个虚拟头结点

<img src="http://cdn.wangtongmeng.com/20240923103837-28ff75.png" style="zoom:50%;" />

cpp

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* reverseBetween(ListNode* head, int left, int right) {
        auto dummy = new ListNode(-1);
        dummy->next = head;
        auto a = dummy;
        for (int i = 0; i < left - 1; i ++) a = a->next; // 找到left的前一个节点
        auto b = a->next, c = b->next;
        for (int i = 0; i < right - left; i ++ ) { // 翻转几次，看left和right之间有几条边，正好是right-left
            auto d = c->next;
            c->next = b;
            b = c, c = d;
        }
        a->next->next = c;
        a->next = b;
        auto res = dummy->next; // 删除dummy，可以不写
        delete dummy;
        return res;

    }
};
```

js

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function(head, left, right) {
    const dummy = new ListNode(-1, head);
    let a = dummy;
    for (let i = 0; i < left - 1; i++) a = a.next;
    let b = a.next, c = b.next;
    for (let i = 0; i < right - left; i++) {
        let d = c.next;
        c.next = b;
        b = c, c = d;
    }
    a.next.next = c;
    a.next = b;

    return dummy.next;
};
```

### [19. 删除链表的倒数第 N 个结点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/)

思路

```bash
遍历的链表总长度n
要删掉倒数第k个点，需要找到倒数第k+1个点
n+1 - (k+1) = n-k
n-k-1
```

cpp

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int k) {
        auto dummy = new ListNode(-1);
        dummy->next = head;

        int n = 0; // 链表总长度 包含虚拟头结点
        for (auto p = dummy; p; p = p->next) n ++ ;

        auto p = dummy; // 找到倒数第k+1个点
        // 总共n个点，右边k+1个点，前面还有n-(k+1)个点，所以前面有n-k-1个点，需要跳过
        for (int i = 0; i < n - k - 1; i ++ ) p = p->next; // 跳过n-k-1个点

        // 删除倒数第k个点
        p->next = p->next->next;

        return dummy->next;
    }
};
```

js

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, k) {
    const dummy = new ListNode(-1, head);
    let n = 0; // 包含dummy的链表长度
    for (let p = dummy; p; p = p.next) n++;
    // 删除倒数第k个数，需要找到倒数第k+1个数
    // 倒数第k+1个数前面还有n-(k+1)=n-k-1个数，所以需要跳过n-k-1次
    let p = dummy; // 第倒数k+1个数
    for (let i = 0; i < n - k - 1; i++) p = p.next;
    p.next = p.next.next;
    return dummy.next;
};
```

### [82. 删除排序链表中的重复元素 II](https://leetcode.cn/problems/remove-duplicates-from-sorted-list-ii/)

思路：

```bash
指针1 记录下一个下一段的第一个数是多少
指针2 从指针1的下一个开始看，知道移动到指针2的数不能与指针1的数
这样 [指针1，指针2) 就是相等的一段
判断这段有几个元素，判断指针1的next是不是等于指针2的数，相等说明就一个数，不相等说明多个数

分两种情况
1.如果下一段只有一个数，只需要把cur指针移动到下一个
2.下一段多余一个数

我们发现指针是指向某一段的前一个数
```

<img src="http://cdn.wangtongmeng.com/20240923130013-77e2f8.png" style="zoom: 50%;" />

cpp

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        auto dummy = new ListNode(-1);
        dummy->next = head;
        auto p = dummy; // 当先遍历点
        while (p->next) { // p->next 是下一段的起始点
            auto q = p->next->next; // q 是下一段起始点的下一个点
            while (q && q->val == p->next->val) q = q->next; // 找到不等于下一段起始点的q
            if (p->next->next == q) p = p->next; // 说明只有一个元素
            else p->next = q; // 说明多个相等元素，都删掉
        }
        return dummy->next;

    }
};
```

js

```js
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
    const dummy =  new ListNode(-1, head);
    let p = dummy; // 遍历点
    while (p.next) { // p.next 是下一段的起始点
        let q = p.next.next; // 下一段的起始点后面的点
        while (q && q.val === p.next.val) q = q.next; // 找到和下一段起始点不同的点
        if (p.next.next === q) p = p.next; // 说明只有一个点相同
        else p.next = q; // 下一段多个点相同，都删掉
    }
    return dummy.next;
};
```

### [61. 旋转链表](https://leetcode.cn/problems/rotate-list/)

思路

<img src="http://cdn.wangtongmeng.com/20240923150050-3b1ced.png" style="zoom: 50%;" />

cpp

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* rotateRight(ListNode* head, int k) {
        if (!head) return head;
        int n = 0; // 链表长度
        LitNode* tail; // 原链表的尾节点
        for (auto p = head; p; p = p->next) {
            tail = p;
            n ++ ;
        }
        k %= n;
        if (!k) return head;

        auto p = head; // 遍历到新的尾节点，前面是n-k个节点，尾节点从head遍历只需要n-k-1步
        for (int i = 0; i < n - k - 1; i ++ )  p = p->next;
        tail->next = head; // 翻转段尾部执行原head
        head = p->next; // 更新head
        p->next = nullprt;
        return head;
    }
};
```

js

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function(head, k) {
    if (!head) return head;
    let n = 0; // 链表长度
    let tail = null; // 原链表尾部
    for (let p = head;p;p = p.next) {
        tail = p;
        n++;
    }

    k = k % n;
    if (!k) return head; // 如果整除则不需要旋转

    let p = head; // 找到旋转段的前一个节点
    // 前面n-k个节点不需要动，从head遍历，只需要遍历n-k-1次
    for (let i = 0; i < n - k - 1; i++) {
        p = p.next;
    }
    tail.next = head; // 旋转段尾的next指向原链表head
    head = p.next; // 新head的next指向旋转段头节点
    p.next = null; // 新tail的next指向null
    return head;
};
```

### [86. 分隔链表](https://leetcode.cn/problems/partition-list/)

思路：开两个链表，再连起来

<img src="http://cdn.wangtongmeng.com/20240923151107-2ed731.png" style="zoom:25%;" />

cpp

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* partition(ListNode* head, int x) {
        // 由于两个链表都有可能是空，这里设置两个虚拟头结点
        auto lh = new ListNode(-1), rh = new ListNode(-1);
        auto lt =lh, rt = rh; // 记录当前的链表尾节点

        for (auto p = head; p; p = p->next) {
            if (p->val < x) lt = lt->next = p; 
            else rt = rt->next = p;
        }

        lt->next = rh->next;
        rt->next = NULL;

        return lh->next;

    }
};
```

js

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function(head, x) {
    let lh = new ListNode(-1), rh = new ListNode(-1);
    let lt = lh, rt = rh;

    for (let p = head; p;p = p.next) {
        if (p.val < x) lt = lt.next = p;
        else rt = rt.next = p;
    }

    lt.next = rh.next; // 让做链表尾部.next指向右链表头.next
    rt.next = null;

    return lh.next;

};
```

### [146. LRU 缓存](https://leetcode.cn/problems/lru-cache/)（暂跳过）

思路

get put 利用 hash表 ，维护所有key value对；利用双链表维护时间戳

<img src="http://cdn.wangtongmeng.com/20240923153437-497142.png" style="zoom:50%;" />

## 二叉树

### [104. 二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/)

思路：bfs、dfs

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;
        return max(maxDepth(root->left), maxDepth(root->right)) + 1;
    }
};
```

js

```js
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
    if (!root) return 0;
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};
```

### [100. 相同的树](https://leetcode.cn/problems/same-tree/)

思路：遍历时按照相同顺序即可

cpp

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    bool isSameTree(TreeNode* p, TreeNode* q) {
        if (!p && !q) return true; // 如果两棵树都是空，是相等的
        // 两棵树有一颗不为空，另一颗为空；或者都不为空时值不相等，则两棵树不相等
        if (!p || !q || p->val != q->val) return false;
        return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);
    }
};
```

js

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
   if (!p && !q) return true;
   if (!p || !q || p.val !== q.val) return false;

   return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};
```

### [226. 翻转二叉树](https://leetcode.cn/problems/invert-binary-tree/)

cpp

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (!root) return NULL;
        swap(root->left, root->right);
        invertTree(root->left);
        invertTree(root->right);
        return root;
    }
};
```

js

```js
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
 * @return {TreeNode}
 */
var invertTree = function(root) {
    if (!root) return null;
    let tmp = root.left;
    root.left = root.right;
    root.right = tmp;
    invertTree(root.left);
    invertTree(root.right);
    return root;
};
```

### [101. 对称二叉树](https://leetcode.cn/problems/symmetric-tree/)

cpp

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    bool isSymmetric(TreeNode* root) {
        if (!root) return true;
        return dfs(root->left, root->right); // 看下左子树和右子树是否对称
    }

    bool dfs(TreeNode* p, TreeNode* q) {
        if (!p && !q) return true;
        // 如果两棵树一颗为空一颗不空 或者 不为空但值不相等，则为false
        if (!p || !q || p->val != q->val) return false;
        // 左节点的左边和右节点的右边，同理...
        return dfs(p->left, q->right) && dfs(p->right, q->left);
    }
};
```

js

```js
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
 * @return {boolean}
 */
var isSymmetric = function(root) {
   if (!root) return true;
   return dfs(root.left, root.right); // 看下左右节点是否对称
};
function dfs(p, q) {
    if (!p && !q) return true;
    if (!p || !q || p.val !== q.val) return false;

    return dfs(p.left, q.right) && dfs(p.right, q.left);
}
```

### [105. 从前序与中序遍历序列构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

思路

hash用来记录中序遍历每个数的位置

![](http://cdn.wangtongmeng.com/20240923193914-32a633.png)

## 二叉树层序遍历

## 二叉搜索树

## 图

## 图的广度优先搜索

## 字典树

## 回溯

## 分治

## Kadane 算法

## 二分查找

### [35. 搜索插入位置](https://leetcode.cn/problems/search-insert-position/)

思路：满足某种性质，找到第一个大于等于target的位置，用二分的模板做，特判下尾部插入即可

cpp

```cpp
class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        // 二分>=x的数中最小的一个，再特判下x比数组的最大值还大的情况
        int n = nums.size();
        if (target > nums[n - 1]) return n;
        int l = 0, r = n - 1;
        while (l < r) {
            int mid = l + r >> 1;
            if (nums[mid] >= target) r = mid;
            else l = mid + 1;
        }
        return r;
    }
};
```

js

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    let n = nums.length;
    if (target > nums[n - 1]) return n;
    let l = 0; r = n - 1;
    while (l < r) {
        let mid = l + r >> 1;
        if (nums[mid] >= target) r = mid;
        else l = mid + 1;
    }
    return r;
};
```

### [74. 搜索二维矩阵](https://leetcode.cn/problems/search-a-2d-matrix/)

思路：二分，mid的一维坐标转成二维坐标的位置

考察点：二分+矩阵坐标变换

<img src="http://cdn.wangtongmeng.com/20240924113122-106964.png" style="zoom: 50%;" />

cpp

```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        if (matrix.empty() || matrix[0].empty()) return false;
        int n = matrix.size(), m = matrix[0].size();
        int l = 0, r = n * m - 1;
        while (l < r) {
            int mid = l + r >> 1;
            if (matrix[mid / m][mid % m] >= target) r = mid;
            else l = mid + 1;
        }
        return matrix[r / m][r % m] == target;
    }
};
```

js

```js
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    if (!matrix.length || !matrix[0].length) return false;
    let n = matrix.length, m = matrix[0].length;
    let l = 0, r = n * m - 1;
    while (l < r) {
        let mid = (l + r) >> 1;
        if (matrix[Math.floor(mid / m)][mid % m] >= target) r = mid;
        else l = mid + 1;
    }
    return matrix[Math.floor(r / m)][r % m] === target;
    
};
```

### [162. 寻找峰值](https://leetcode.cn/problems/find-peak-element/)

思路：找个中间值s[mid]，如果s[mid] > s[mid+1]，则左边一定有峰值，反之也是

cpp

```cpp
class Solution {
public:
    int findPeakElement(vector<int>& nums) {
        int l = 0, r = nums.size() - 1;
        while (l < r) {
            int mid = l + r >> 1; // 这里向下取整的，所以mid + 1 不会越界
            if (nums[mid] > nums[mid + 1]) r = mid;
            else l = mid + 1;
        }
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
var findPeakElement = function(nums) {
    let l = 0, r = nums.length - 1;
    while (l < r) {
        let mid = r + l >> 1;
        if (nums[mid] > nums[mid + 1]) r = mid;
        else l = mid + 1;
    }
    return r;
};
```

### [33. 搜索旋转排序数组](https://leetcode.cn/problems/search-in-rotated-sorted-array/)

思路

先找到mid，也就是满足 x>=nums[0]的最后一个数

![](http://cdn.wangtongmeng.com/20240924145351-ac92f8.png)

分段后，

我们再去找x>= target的最小的数，看是不是等于target

![](http://cdn.wangtongmeng.com/20240924145610-28e62c.png)

cpp

```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int l = 0, r = nums.size() - 1;
        while (l < r) {
            int mid = l + r + 1 >> 1;
            if (nums[mid] >= nums[0]) l = mid;
            else r = mid - 1;
        }

        if (target >= nums[0]) l = 0; // 在左段
        else l = r + 1, r= nums.size() - 1; // 在右段

        while (l < r) {
            int mid = l + r >> 1;
            if (nums[mid] >= target) r = mid;
            else l = mid + 1;
        }

        if (nums[r] == target) return r;
        return -1;
    }
};
```

js

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let l  = 0, r = nums.length - 1;
    // 旋转后会有两段，左段的所有数都大于右段，找到左段的右侧的最大值
    while (l < r) {
        let mid = l + r + 1 >> 1;
        if (nums[mid] >= nums[0]) l = mid;
        else r = mid - 1;
    }
    // 此时r就是左段最右侧的值的索引

    if (target >= nums[0]) l = 0; // 说明target在左段
    else l = r + 1, r = nums.length -1;


    // 找到>=target的最小值
    while (l < r) {
        let mid = l + r >> 1;
        if (nums[mid] >= target) r = mid;
        else l = mid + 1;
    }

    if (nums[r] === target) return r;
    return -1;
};
```

### [34. 在排序数组中查找元素的第一个和最后一个位置](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/)

思路

找起点，满足性质这个点右侧的点都>=target

<img src="http://cdn.wangtongmeng.com/20240924151242-e9269b.png" style="zoom:50%;" />

cpp

```cpp
class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        if (nums.empty()) return {-1, -1};

        int l = 0, r = nums.size() - 1;
        // 图形是上坡->平坡->上坡，平坡会有左右两个端点
        // 先找平坡的左端点
        while (l < r) {
            int mid = l + r >> 1;
            if (nums[mid] >= target) r = mid; // 找到>=target的最小值
            else l = mid + 1;
        }

        if (nums[r] != target) return {-1, -1};

        int L = r; // 存储平坡的左端点
        // 找平坡的右端点
        l = 0, r = nums.size() -1;
        while (l < r) {
            int mid = l + r + 1 >> 1;
            if (nums[mid] <= target) l = mid;
            else r = mid - 1;
        }

        return {L, r};
    }
};
```

js

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    if (!nums.length) return [-1, -1];

    let l = 0, r= nums.length - 1;
    // 图形是上坡->平坡->上坡，平坡会有左右两个端点
    // 先找平坡的左端点
    while (l < r) {
        let mid = l + r >> 1;
        if (nums[mid] >= target) r = mid;
        else l = mid + 1;
    }

    if (nums[r] !== target) return [-1, -1];

    let L = l; // 存储平坡的左端点
    // 找平坡的右端点
    l = 0, r = nums.length - 1;
    while (l < r) {
        let mid = l + r + 1 >> 1;
        if (nums[mid] <= target) l = mid;
        else r = mid - 1;
    }

    return [L, r];
};
```

### [153. 寻找旋转排序数组中的最小值](https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/)

思路：33题的第一步

cpp

```cpp
class Solution {
public:
    int findMin(vector<int>& nums) {
        int l = 0, r= nums.size() - 1;
        if (nums[r] >= nums[l]) return nums[0]; // 有可能是递增的，第一个数最小
        // 否则会有两段，前一段的第一个数>后一段的所有数，我们要找到后一段的第一个数
        while (l < r) {
            int mid = l + r >> 1;
            if (nums[mid] < nums[0]) r = mid;
            else l = mid + 1;
        }
        return nums[r];
    }
};
```

js

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    let l = 0, r = nums.length - 1;
    if (nums[r] > nums[0]) return nums[0];

    while (l < r) {
        let mid = l + r >> 1;
        if (nums[mid] < nums[0]) r = mid;
        else l = mid + 1;
    }

    return nums[r];
};
```

### [4. 寻找两个正序数组的中位数](https://leetcode.cn/problems/median-of-two-sorted-arrays/) (hard跳过)

## 堆

## 位运算

### [67. 二进制求和](https://leetcode.cn/problems/add-binary/)

思路：高精度加法

![](http://cdn.wangtongmeng.com/20240924160037-626333.png)

cpp

```cpp
class Solution {
public:
    string addBinary(string a, string b) {
         //  让个位在前
        reverse(a.begin(), a.end());
        reverse(b.begin(), b.end());

        string c;
        for (int i = 0, t = 0; i < a.size() || i < b.size() || t; i ++ ) {
            if (i < a.size()) t += a[i] - '0'; // -'0'可以转数字
            if (i < b.size()) t += b[i] - '0';
            c += to_string(t % 2);
            t /= 2;
        }
        
        reverse(c.begin(), c.end());
        return c;
    }
};
```

js

```js
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
    // 让个位在前
    a = a.split("").reverse().join("");
    b = b.split("").reverse().join("");

    let c = '';
    for (let i = 0, t = 0; i < a.length || i < b.length || t; i++) {
        if (i < a.length) t += Number(a[i]);
        if (i < b.length) t += Number(b[i]);
        c += '' + t % 2;
        t = Math.floor(t / 2);
    }
    c = c.split("").reverse().join("");
    return c;
};
```

### [190. 颠倒二进制位](https://leetcode.cn/problems/reverse-bits/)

思路

![](http://cdn.wangtongmeng.com/20240924161857-0d59cf.png)

cpp

```cpp
class Solution {
public:
    uint32_t reverseBits(uint32_t n) {
        uint32_t res = 0;
        for (int i = 0; i < 32; i ++ )
            res = res * 2 + (n >> i & 1); // res * 2 等价于二进制数的左移操作；n >> i & 1 取得二进制数的第k位
        return res;
    }
};
```

js

```js
/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function(n) {
   let res = 0;
   for (let i = 0; i < 32; i++) {
    res = res * 2 + (n >> i & 1);
   } 
   return res;
};
```

### [191. 位1的个数](https://leetcode.cn/problems/number-of-1-bits/)

思路

<img src="http://cdn.wangtongmeng.com/20240924163221-719b70.png" style="zoom:50%;" />

cpp

```cpp
class Solution {
public:
    uint32_t lowbit(uint32_t x) {
        return x & -x;
    }

    int hammingWeight(uint32_t n) {
        int cnt = 0;
        while (n) n -= lowbit(n), cnt ++ ;
        return cnt;
    }
};
```

js

```js
/**
 * @param {number} n
 * @return {number}
 */
var hammingWeight = function(n) {
    function lowbit(x) {
        return x & -x;
    }
    let cnt = 0;
    while (n) n -= lowbit(n), cnt++;
    return cnt;
};
```

### [136. 只出现一次的数字](https://leetcode.cn/problems/single-number/)

思路：异或的性质

<img src="http://cdn.wangtongmeng.com/20240924164205-a39e9c.png" style="zoom:25%;" />

cpp

```cpp
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int res = 0;
        for (auto x: nums) res ^= x;
        return res;
    }
};
```

js

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let res = 0;
    for (let x of nums) res ^= x;
    return res;
};
```

### [137. 只出现一次的数字 II](https://leetcode.cn/problems/single-number-ii/) (暂跳过)

### [201. 数字范围按位与](https://leetcode.cn/problems/bitwise-and-of-numbers-range/)

cpp

```cpp
class Solution {
public:
    int rangeBitwiseAnd(int m, int n) {
        int res = 0;
        for (int i = 30; i >= 0; i -- ) {
            if ((m >> i & 1) != (n >> i & 1)) break;
            if (m >> i & 1) res += 1 << i;
        }
        return res;
    }
};
```

js

```js
```



## 数学

## 一维动态规划

## 多维动态规划

20道+复习