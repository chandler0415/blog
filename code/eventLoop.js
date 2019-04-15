async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
  // 试着去改变这一行return的有无
  return new Promise(function (resolve) {
    console.log('promise1');
    setTimeout(function () {
      console.log('setTimeout1');
      resolve();
    }, 0);
  }).then(function () {
    console.log('then1');
  });
}

console.log('script start');

setTimeout(function () {
  console.log('setTimeout2');
}, 0);

async1();

new Promise(function (resolve) {
  console.log('promise2');
  resolve();
}).then(function () {
  console.log('then2');
});

console.log('script end');
