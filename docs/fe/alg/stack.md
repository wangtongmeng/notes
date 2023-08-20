# 栈

- 一个**后进先出**的数据结构。
- JavaScript 中没有栈，但可以用 Array 实现栈的所有功能。

<!-- ![An image](/alg/stack/1.png ) -->

<img src="http://rzol19n0q.hb-bkt.clouddn.com/202308202100456.png" alt="drawing" width="200"/>

```javascript
const stack = []
stack.push(1) // 入栈
stack.push(2)
const item1 = stack.pop() // 出栈
const item2 = stack.pop()
```

栈的应用场景

- 需要后进先出的场景。
- 比如：十进制转二进制、判断字符串的括号是否有效、函数调用堆栈...

场景一：十进制转二进制

- 后出来的余数反而要排到前面。
- 把余数依次入栈，然后出栈，就可以实现余数倒序输出。

<img src="http://rzol19n0q.hb-bkt.clouddn.com/202308202100884.png" alt="drawing" width="200"/>

场景二：有效的括号

- 约靠后的左括号，对应的右括号越靠前。
- 左括号入栈，右括号出栈，最后栈空了就是合法的。

```javascript
((((())))) -- valid
() () () () -- valid
((((((() -- invalid
((()(()))) -- valid
```

场景三：函数调用堆栈

- 最后调用的函数，最先执行完。
- JS 解释器使用栈来控制函数的调用顺序。

```javascript
function fn1() {
	fn2()
} 
function fn2() {}

fn1()
```

leetCode: 20.有效的括号 [https://leetcode.cn/problems/valid-parentheses](https://leetcode.cn/problems/valid-parentheses)
解题思路：

- 对于没有闭合的左括号而言，越靠后的左括号，对应的右括号越靠前。，满足后进先出，考虑用栈"{[]}"

解题步骤：

- 新建一个栈
- 遍历字符串，遇到左括号入栈，遇到和栈顶括号类型匹配的右括号就出栈，类型不匹配直接判定为不合法。
- 最后栈空了就合法，否则不合法。

```javascript
() true
()[]{} true
([)] false
{[]}   true
```

实现

```javascript
var isValid = function(s) {
    const len = s.length
    if (len % 2 === 1) return false;

    const map = {
        '(': ')',
        '{': '}',
        '[': ']',
    }
  
    const stack = []
    for (let i = 0; i < len; i++) {
        const c = s[i]
        if (map[c]) {
            stack.push(map[c])
        } else {
            const t = stack[stack.length -1]
            if (c === t) {
                stack.pop()
            } else {
                return false
            }
        }
    }
    return stack.length === 0
};

// 时间复杂度 O(n) 一次遍历
// 空间复杂度 O(n)
```
