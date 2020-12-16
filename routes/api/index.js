const express = require('express');

const carRouter = require('./carRouter');
const userRouter = require('./userRouter');

// const Router = express.Router();
// const router = Router();
const router = express.Router();


router.use('/car', carRouter);
router.use('/user', userRouter);


module.exports = router;