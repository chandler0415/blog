// 注意下面所有方法只考虑去重，不考虑是否改变原数组，因为重点在讨论去重这件事
const multipleArr = [
  1, 1,
  true, true,
  'true', 'true',
  10, 10,
  false, false,
  undefined, undefined,
  null, null,
  NaN, NaN,
  'NaN', 'NaN',
  0, 0,
  'a', 'a',
  {}, {},
];

// 用es6 set去重
function unique1(arr) {
  return Array.from(new Set(arr));
}

// console.log(unique1(multipleArr));
// [ 1, true, 'true', 10, false, undefined, null, NaN, 'NaN', 0, 'a', {}, {} ]
//  1. 考虑兼容问题；2. '{}'空对象不能去重

// 利用for嵌套for，然后splice去重
function unique2(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1); // 第一个等同于第二个时，把第二个去掉
        j--;
      }
    }
  }
  return arr;
}

// console.log(unique2(multipleArr));
// [ 1, true, 'true', 10, false, undefined, null, NaN, NaN, 'NaN', 0, 'a', {}, {} ]
// 1. 严格模式判断相等； 2. NaN和自己本身也不相等；  3. '{}'不能去重

// 利用indexOf和暂存数组去重
function unique3(arr) {
  const temp = [];
  for (let i = 0; i < arr.length; i++) {
    if (temp.indexOf(arr[i]) === -1) {
      temp.push(arr[i]);
    }
  }
  return temp;
}

// console.log(unique3(multipleArr));
// [ 1, true, 'true', 10, false, undefined, null, NaN, NaN, 'NaN', 0, 'a', {}, {} ]
// 同unique2中的解释

// 利用sort()
function unique4(arr) {
  arr.sort(); // 注意：sort会改变自身
  const temp = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1]) {
      temp.push(arr[i]);
    }
  }
  return temp;
}

// console.log(unique4(multipleArr));
// [ 0, 1, 10, 'NaN', NaN, NaN, {}, {}, 'a', false, null, 'true', true, undefined ]
// 结果同上

// 利用includes
function unique5(arr) {
  const temp = [];
  arr.forEach(function (item) {
    if (!temp.includes(item)) {
      temp.push(item);
    }
  });
  return temp;
}

// console.log(unique5(multipleArr));
// [ 1, true, 'true', 10, false, undefined, null, NaN, 'NaN', 0, 'a', {}, {} ]
// '{}'不能去重

// 利用hasOwnProperty
function unique6(arr) {
  const obj = {};
  return arr.filter(function (item) {
    return obj.hasOwnProperty(`${typeof item}${item}`)
      ? false
      : (obj[`${typeof item}${item}`] = true);
  });
}

// console.log(unique6(multipleArr));
// [ 1, true, 'true', 10, false, undefined, null, NaN, 'NaN', 0, 'a', {} ]
// 全部去重

// 利用filter和indexOf
function unique7(arr) {
  return arr.filter(function (item, index) {
    // indexOf只返回数组中可以找到给定元素的第一个索引
    return arr.indexOf(item) === index;
  });
}
console.log(unique7(multipleArr));
// [ 1, true, 'true', 10, false, undefined, null, 'NaN', 0, 'a', {}, {} ]
// NaN全部被删除，'{}'未被去重
