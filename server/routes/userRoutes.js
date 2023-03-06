import express from 'express'
import {signUp, singIn} from '../controller/userController.js'

const router =  express.Router()

router.post('/',signUp)
router.post('/login',singIn)

export default router