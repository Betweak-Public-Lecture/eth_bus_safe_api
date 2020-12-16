const express = require('express');


// const Router = express.Router();
// const router = Router();
const router = express.Router();

const db = require('../../models/db');


// /api/user/ POST ==> 회원가입
router.post('/', (req, res)=>{
  const {post_id, password, name, division} = req.body;
  const sql = 'INSERT INTO user_list (post_id, password, name, division, linkcode) values(?, ?, ?, ?, 1)';

  // hash처리 필요합니다.
  // nodejs => bcyrpt.js
  // [compareHash, makeHash]
  console.log(req.body)

  db.query(sql, [post_id, password, name, division], (err, result)=>{
    if (err){
      res.json({
        status: "Error",
      })
    } else{
      res.json({
        status: "Success",
        result: result
      })
    }
  })
})

// /api/user/login  POST  ==> 로그인

router.post('/login', (req, res)=>{
  const {post_id, password} = req.body;
  const sql = "SELECT * FROM `user_list` WHERE `post_id`=?, `password`=?";
  db.query(sql, [post_id, password], (err, result)=>{

    if(err){
      res.json({
        status: "Error"
      })
    } 
    else{
      if (result.length >= 1){
        res.json({
          status: "Success",
          result: "로그인 완료"
        })
      } 
      else{
        res.json({
          status: "Fail",
          result: "회원번호 혹은 비밀번호가 틀립니다."
        })
      }
    }
  });
})


module.exports = router;
