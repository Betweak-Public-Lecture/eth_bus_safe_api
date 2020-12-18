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
  
  // if (user.linkcode !== 0){
  //   // master 여부
  //   return res.json({
  //     status: "Fail",
  //     result: "권한이 없습니다."
  //   })
  // }

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
router.post('/', function(req, res){
  const {car_id, car_div, car_type, car_birth, car_day, car_result} = req.body;
  if (!req.body){
    console.log("Body가 없습니다.")
    return res.json({
      status: "Fail",
      message: "Validation 오류"
    })
  }

  if (!req.session.user){
    return res.json({
      status: "Fail",
      message: "로그인 해주세요."
    })
  }

  if (req.session.user.linkcode !==0){
    return res.json({
      status: "Fail",
      message: "권한이 없습니다. "
    })
  }

  const sql = "INSERT INTO car_list(car_id, car_div, car_type, car_birth, car_day, car_result) \
                           VALUES(?, ?, ?, ?, ?, ?)";
  db.query(sql, [car_id, car_div, car_type, car_birth, car_day, car_result], (err, result)=>{
    if(err){
      res.json({
        status: "Fail",
        result: "DB오류"
      })
    } else{
      res.json({
        status: "Success",
        result: result
      })
    }
  })

})

// 차량 수정        |   (master)           |   PUT   |   /:carId\
router.put('/:carId', function(req, res){
  const carId = req.params.carId;
  const {car_id, car_div, car_type, car_birth, car_day, car_result} = req.body;
  
  if (!req.session.user){
    // Request Method: [GET, POST, PUT, DELETE]
    // Response Status Code: [2XX, 3XX, 4XX, 5XX]
    return res.status(401).json({
      status:'Fail',
      message: "로그인을 해주세요."
    })
  } 

  if (req.session.user.linkcode !==0){
    return res.json({
      status: "Fail",
      message: "권한이 없습니다. "
    })
  }
  else{
    const sql = "UPDATE car_list SET car_id = ?, car_div = ?, car_type = ?, car_birth = ?, car_day = ?, car_result = ? where car_id = ?";
    db.query(sql, [car_id, car_div, car_type, car_birth, car_day, car_result, carId], (err, result)=>{
      console.log(err)
      if(err){
        res.json({
          status: "Fail",
          result: "DB 오류 발생"
        })
      } else{
        res.json({
          status: "Success",
          result: result
        })
      }
    })
  }
})


// 차량 삭제        |   (master)           |  DELETE |   /:carId
router.delete('/:carId', function(req, res){
  const carId = req.params.carId;

  if (!req.session.user){
    // Request Method: [GET, POST, PUT, DELETE]
    // Response Status Code: [2XX, 3XX, 4XX, 5XX]
    return res.status(401).json({
      status:'Fail',
      message: "로그인을 해주세요."
    })
  } 

  if (req.session.user.linkcode !==0){
    return res.json({
      status: "Fail",
      message: "권한이 없습니다. "
    })
  } else{
    const sql = "delete from car_list where car_id=?"
    db.query(sql, [carId], (err, result)=>{
      console.log(err)
      if(err){
        res.json({
          status: "Fail",
          result: "DB 오류 발생"
        })
      } else{
        res.json({
          status: "Success",
          result: result
        })
      }
    })
  }
})





module.exports = router;