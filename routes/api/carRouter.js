const express = require('express');

// const Router = express.Router();
// const router = Router();
const router = express.Router();

const db = require('../../models/db');

// 차량 목록 조회    |   (master + 정비사)    |   GET   |   /
router.get('/', function(req, res){
  const sql = "SELECT * FROM car_list";
  db.query(sql, (err, rows)=>{
    if(err){
      res.json({
        status: "Fail",
        result: err
      })
    } else {
      res.json({
        status: "Success",
        result: rows
      })
    }
  })
})

// 차량 상세 조회    |   (master)           |   GET   |   /:carId
// 실습: ~20분.
router.get('/:carId', function(req, res){
  const sql = 'SELECT * FROM car_list WHERE car_id=?';
  const carId = req.params.carId;

  db.query(sql, [carId], (err, rows)=>{
    if(err){
      res.json({
        status: "Fail",
        result: err
      })
    } else{
      if (rows.length <1){
        res.json({
          status: "Fail",
          result: "car를 찾을 수 없음."
        })
      } else{
        res.json({
          status: "Success",
          result: rows[0]
        })
      }
    }
  })
})

// 차량 등록        |   (master)           |   POST  |   /

// 차량 수정        |   (master)           |   PUT   |   /:carId

// 차량 삭제        |   (master)           |  DELETE |   /:carId




module.exports = router;