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
router.get('/', (req, res)=>{
  let resultData = [];
  smartContract.methods.TotalCount().call().then(count =>{
    for(let i=0; i< count; i++){
      smartContract.methods.GetCheck(i).call().then(result =>{
        // result: checker, car_id, check_res, check_etc, checks[_index].check_time]
        resultData.push(result);
      })
    }
  })
  return res.json({
    status: "Success",
    result: resultData
  })
})

router.post('/:carId', (req, res)=>{
  const carId = req.params.carId;
  const {check1, check2, check3, check4, check5, check_etc} = req.body;

  let check_res = `${check1}:${check2}:${check3}:${check4}:${check5}`;

  const today = new Date();
  const check_time = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();

  smartContract.methods.AddCheckList(carId, check_res, check_etc, parseInt(check_time)).send({
    from: '0xebed70c19ca2cbff3294c9ac836b5f44b0834fff', // ethereum account address //server의 main address
    gas:'300000' // gas limit
  }).then((result)=>{
    console.log(result);
    res.json({
      status: "Success",
      result: result
    })
  })
})




module.exports = router;