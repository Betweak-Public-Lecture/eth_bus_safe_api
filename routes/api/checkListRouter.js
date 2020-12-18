const express = require('express');
const router = express.Router();
const db = require('../../models/db');

const Web3 = require('web3');

// truffle develop: RPC Server (network요청에 대한 응답을 주는 server)

const bus_safe_contract = require('../../build/contracts/bus_safe.json');



const web3 = new Web3(
  new Web3.providers.HttpProvider("http://localhost:9545")
);

const smartContract = new web3.eth.Contract(
  bus_safe_contract.abi,
  bus_safe_contract.networks['5777'].address
)


/**
 * 체크리스트 라우터
 * - 이더리움 네트워크에 기록
 * 
 * 1. CheckList 조회
 * 2. CheckList POST
 * 3. CheckList 상세조회
 */

// CheckList 조회
smartContract.methods.TotalCount().call().then(count =>{
  console.log(count);
})



// 리스트 조회
/// 문제 생길 여지 있음. (비동기 함수. (then, async-await))
// router.get('/', (req, res)=>{
//   let resultData = [];
//   smartContract.methods.TotalCount().call().then(count =>{
//     for(let i=0; i< count; i++){
//       smartContract.methods.GetCheck(i).call().then(result =>{
//         // result: checker, car_id, check_res, check_etc, checks[_index].check_time]
//         resultData.push(result);
//       })
//     }
//   })
//   return res.json({
//     status: "Success",
//     result: resultData
//   })
// })

router.post('/:carId', (req, res)=>{
  const carId = req.params.carId;
  let {check1, check2, check3, check4, check5, check_etc} = req.body;

  let check_res = `${check1}:${check2}:${check3}:${check4}:${check5}`;

  console.log(req.body);

  const today = Date.now();
  // const today = new Date();
  
  smartContract.methods.AddCheckList(carId, check_res, check_etc, parseInt(today)).send({
    from: '0xebed70c19ca2cbff3294c9ac836b5f44b0834fff', // ethereum account address //server의 main address
    gas:'300000' // gas limit
  }).then((result)=>{
    console.log(result);
    res.json({
      status: "Success",
      result: result
    })
  }).catch(err=>{
    res.json({
      status: "Fail",
      result: "네트워크 오류"
    })
  })
})

// 전체 체크리스트 확인하기
router.get('/', (req, res)=>{
  smartContract.methods.GetCheckAll().call().then(checklist=>{
    console.log(checklist);
    res.json({
      status: "Success",
      result: checklist
    })
  }).catch(err=>{
    console.log(err);
    res.json({
      status: "Fail",
      result: "네트워크 오류"
    })
  })
})

// {
//   "internalType": "address",
//   "name": "checker",
//   "type": "address"
// },
// {
//   "internalType": "string",
//   "name": "car_id",
//   "type": "string"
// },
// {
//   "internalType": "string",
//   "name": "check_res",
//   "type": "string"
// },
// {
//   "internalType": "string",
//   "name": "check_etc",
//   "type": "string"
// },
// {
//   "internalType": "uint64",
//   "name": "check_time",
//   "type": "uint64"
// }

// 차량별 체크리스트 확인하기
router.get('/:carId', (req, res)=>{
  const carId = req.params.carId;

  smartContract.methods.GetCheckAll().call().then(checklist=>{
    const resultArr = []
    for(let i=0; i<checklist.length; i++){
      if(checklist[i][1] === carId){
        resultArr.push(checklist[i])
      }
    }
    res.json({
      status: "Success",
      result: resultArr
    })
  })
})



// AntiPattern
// router.get('/:carId', (req, res)=>{
//   let resultData = []
//   smartContract.methods.TotalCount().call().then(count=>{
//     // 비동기
//     for(let i=0; i<count; i++){
//       // 비동기
//       smartContract.methods.getCheck(i).call().then(check=>{
//         resultData.push(check)
//       })
//     }
//   })
//   setTimeout(()=>{}, 2000)
// });


async function getTotalCheckList(){
  // 순서를 보장 ==> (단점: 속도가 느립니다.)
  const count = await smartContract.methods.TotalCount().call();
  let resultData = []
  for (let i=0; i<count; i++){
    const data = await smartContract.methods.getCheck(i).call()
    resultData.push(data);
  }
  return resultData;
}




module.exports = router;