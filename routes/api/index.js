const express = require('express');

const carRouter = require('./carRouter');
const userRouter = require('./userRouter');
const checkListRouter = require('./checkListRouter')

// const Router = express.Router();
// const router = Router();
const router = express.Router();


router.use('/car', carRouter);
router.use('/user', userRouter);
router.use('/checklist', checkListRouter)


module.exports = router;