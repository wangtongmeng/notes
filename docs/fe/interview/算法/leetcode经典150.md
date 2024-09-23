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

## 链表

### [141. 环形链表](https://leetcode.cn/problems/linked-list-cycle/)

思路：

- 1.通过hash记录地址，看是否出现重复的
- 2.快慢指针