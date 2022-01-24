### 符合PromiseA+规范的代码太复杂，毕竟有874条测试用例

#### promise all

```js
let promiseAll = (arr) => {
  if (Object.prototype.toString.call(arr) !== '[object Array]') return;

  // 保存每一个promise返回的结果
  const result = [];

  // 保证所有promise都执行完成后再结束
  let count = 0;

  return new Promise((resolve, reject) => {
    for (let i = 0; i < arr.length; i++) {
      new Promise((_resolve, _reject) => {
        _resolve(arr[i])
      }).then(v => {
        result[i] = v;
        if (++count === arr.length) {
          resolve(result);
        }
      }).catch(e => {
        reject(e);
      })
    }
  });
}
```

##### 测试用例

1. 正常输出
```js
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const a = async () => {
  await sleep(1000);
  return 1
}

const b = async () => {
  await sleep(4000);
  return 2
}

const c = async () => {
  await sleep(500);
  return 3
}

promiseAll([a(), b(), c()]).then(value => {
  console.log(value);
}).catch(er => {
  console.log(er)
});
```

2. 异常打断
```js
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const a = async () => {
  await sleep(1000);
  return 1
}

const b = async () => {
  await sleep(4000);
  throw Error('错误');
  return 2
}

promiseAll([a(), b(), c()]).then(value => {
  console.log(value);
}).catch(er => {
  console.log(er)
});
```

#### promise race 写出all race其实差不多

```js
let promiseRace = (arr) => {
  if (Object.prototype.toString.call(arr) !== '[object Array]') return;

  return new Promise((resolve, reject) => {
    for (let i = 0; i < arr.length; i++) {
      new Promise((_resolve, _reject) => {
        _resolve(arr[i])
      }).then(v => {
        resolve(v);
      }).catch(e => {
        reject(e);
      })
    }
  });
}
```

##### 测试用例

1. 正常

```js
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const a = async () => {
  await sleep(1000);
  return 1
}

const b = async () => {
  await sleep(4000);
  return 2
}

const c = async () => {
  await sleep(500);
  return 3
}

promiseRace([a(), b(), c()]).then(value => {
  console.log(value);
}).catch(er => {
  console.log(er)
})
```

2. 异常

```js
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const a = async () => {
  await sleep(1000);
  return 1
}

const b = async () => {
  await sleep(4000);
  return 2
}

const c = async () => {
  await sleep(500);
  throw Error('111111')
  return 3
}

promiseRace([a(), b(), c()]).then(value => {
  console.log(value);
}).catch(er => {
  console.log(er)
})
```

