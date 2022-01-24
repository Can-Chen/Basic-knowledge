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

// Promise.race([a(), b(), c()]).then(v => {
//   console.log(v);
// }).catch(er => {
//   console.log(er)
// })

promiseRace([a(), b(), c()]).then(value => {
  console.log(value);
}).catch(er => {
  console.log(er)
})