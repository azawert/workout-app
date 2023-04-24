import express from 'express'

import { isAuth } from '../middleware/auth.middleware'

import { getUserProfile, getUserStatistics } from './user.controller'

const router = express.Router()

router.get('/', isAuth, getUserProfile)
router.get('/statistics', isAuth, getUserStatistics)

export default router
