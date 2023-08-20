# 时间与空间复杂度

## 时间复杂度

- 一个函数，用大O表示，比如O(1)、O(n)、O(logN)...
- 定性描述该算法的运行时间

<img src="http://rzol19n0q.hb-bkt.clouddn.com/20230820225151-54e10c.png" width=400 />

image.png

```javascript
let i = 0;
i += 1;
```

O(n)

```javascript
for (let i = 0; i < n; i += i) {c1
  console.log(i)
}
```

O(1)+O(n)=O(n)

```javascript
let i = 0;
i += 1;
for (let i = 0; i < n; i += i) {
  console.log(i)
}
```

O(n)*O(n) = O(n^2)

```javascript
// 遍历套遍历
for (let i = 0; i < n; i+= i) {
  for (let j = 0; j < n; j += 1) {
    console.log(i, j)
  }
}
```

O(logN)

```javascript
let i = 1;
while(i < n) {
  console.log(i)
  i *= 2
}
```

## 空间复杂度

- 一个函数，用大O表示，比如O(1)、O(n)、O(n^2)...
- 算法在运行过程中临时占用存储空间大小的量度

O(1)

```javascript
// 只声明了单个变量，占用的内存单元
let i = 0;
i += 1;
```

O(n)

```javascript
// 占用了n个内存单元
const list = []
for (let i = 0, i < n; i += 1) {
  list.push(i);
}
```

O(n^2)

```javascript
// 矩阵 n * n 个内存单元
const matrix = []
for (let i = 0; i < n; i+= 1) {
  matrix.push([])
  for (let j = 0; j < n; j += 1) {
    matrix[i].push(j)
  }
}
```
