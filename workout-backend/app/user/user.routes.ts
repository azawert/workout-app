import express from 'express'

import { isAuth } from '../middleware/auth.middleware'

import { getUserProfile } from './user.controller'

const router = express.Router()

router.get('/', isAuth, getUserProfile)

export default router
