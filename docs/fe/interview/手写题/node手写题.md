## 实现CO

```js
const path = require("path");
const fs = require("fs").promises;
// const co = require("co");

function* readFile(url) {
  let fileUrl = yield fs.readFile(url, "utf8");
  let content = yield fs.readFile(path.resolve(__dirname, fileUrl), "utf8");
  return content;
}

let it = readFile(path.resolve(__dirname, "fileUrl.txt"));
function co(it) {
  // co接受的是一个生成器
  return new Promise((resolve, reject) => {
    function next(v) {
      const { value, done } = it.next(v);
      if (!done) {
        Promise.resolve(value).then((data) => {
          next(data);
        }, reject);
      }else{
        resolve(value)
      }
    }
    return next();
  });
}

co(it).then((data) => {
  console.log(data); // 30
});

// const {value,done} = it.next()

// value.then((data)=>{
//     let {value,done} =  it.next(data)
//     value.then((data)=>{
//         let {value,done} =  it.next(data)
//         console.log(value,done)
//     })
// })

```

