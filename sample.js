// 비동기함수에 대해서
// 문제1.

const fetch = require('node-fetch')

// 비동기함수 1. (Promise .then ...)
function sample1(){
  fetch("https://www.naver.com",{
    method:'GET'
  }).then(resp=>{
    console.log("호출 완료")
    console.log("fetch함수 종료.")
    fetch("https://www.facebook.com",{
      method:"GET"
    }).then(resp=>{
      fetch("https://www.facebook.com",{
      method:"GET"
    }).then(resp=>{
      fetch("https://www.facebook.com",{
      method:"GET"
    }).then(resp=>{
    })
    })
    })
  })
}

// 비동기함수 2. async - await
async function sample2(){
  const resp = await fetch("https://www.naver.com");

  const resp2 = await fetch("https://www.facebook.com");
}