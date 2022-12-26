// function fizzBuzz(num) {
//   result = [];
//   if (num <= 0) {
//     return result;
//   }
//   for (let i = 1; i < num + 1; i++) {
//     if (i % 15 === 0) {
//       result.push("FizzBuzz");
//     } else if (i % 3 === 0) {
//       result.push("Fizz");
//     } else if (i % 5 === 0) {
//       result.push("Buzz");
//     } else {
//       result.push(i);
//     }
//   }
//   return result;
// }

// console.log(fizzBuzz(15));

function findDuplicate(arr1, arr2) {
  let result = [];
  let checkingSet = new Set();
  for (let num of arr1) {
    checkingSet.add(num);
  }
  for (let num of arr2) {
    if (checkingSet.has(num)) {
      result.push(num);
    }
  }
  return result;
}

console.log(findDuplicate([1, 2, 2, 3, 3, 4, 4], [1, 2, 12]));
