import express from 'express'

import { authUser, registerUser } from './auth.controller'

const router = express.Router()

router.post('/login', authUser)
router.post('/registration', registerUser)
export default router
