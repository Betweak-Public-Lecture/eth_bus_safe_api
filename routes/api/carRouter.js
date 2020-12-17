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

  const user = req.session.user;
  if (!user){
    // 로그인 여부
    return res.json({
      status: "Fail",
      result: "로그인이 필요합니다."
    })
  }
  if (user.linkcode !== 0){
    // master 여부
    return res.json({
      status: "Fail",
      result: "권한이 없습니다."
    })
  }

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