import express from 'express'
import { login ,getUsers, updateUser, deleteUser } from '../controller/admincontroller.js'

const router =  express.Router()

router.post('/adminlog',login)
router.get('/getusers',getUsers)
router.post('/updateuser/:id',updateUser)
router.post('/deleteuser/:id',deleteUser)

export default router