

//callback
const a = 8;
const b = 4;

// function sum(a, b, callback) {
//     setTimeout(() => {
//         console.log(`${a} + ${b} = `, a + b);
//         callback && callback();
//     }, 1000);
// };

// function mult(a, b, callback) {
//     setTimeout(() => {
//         console.log(`${a} * ${b} = `, a * b);
//         //1000 tox
//         callback && callback();
//     }, 1000);
// };
// sum(a,b);
// mult(a,b ,function foo() {
//     sum(0,1);
// });
// sum(a, b, () => {
//     mult(a, b, () => {
//         sum(7, 15, () => {
//             sum(0, 1580);
//         });
//     });
// });


//Promise

// function sum2(a, b, callback) {
//     setTimeout(() => {
//         console.log(`${a} + ${b} = `, a + b);
//         callback && callback(a + b);
//     }, 1000);
// };

// function mult2(a, b, callback) {
//     setTimeout(() => {
//         console.log(`${a} * ${b} = `, a * b);
//         callback && callback(a * b);
//     }, 1000);
// };


// function Success() {
//     setTimeout(() => {
//         console.log("Success!");
//     }, 2000);
// }
// function Failed() {
//     setTimeout(() => {
//         console.log("Failed!");
//     }, 2000);
// }

// const p = new Promise((resolve, reject) => {
//     sum2(4, 5, resolve);
// });
// p.then((result) => {
//     console.log("result", result);
//     return new Promise((resolve, reject) => {
//         mult2(4, 5, resolve);
//     }).then((data) => {
//         console.log('data', data);
//         return new Promise((resolve,reject)=>{
//             sum2(4, 5, resolve);
//         }).then((data)=>{
//             console.log('data',data);
//         })
//     })
// })





