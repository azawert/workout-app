import express from 'express'

import { isAuth } from '../middleware/auth.middleware'

import {
	createExercise,
	deleteExercise,
	getAllExercises,
	updateExercise
} from './exercise.controller'

const router = express.Router()

router.post('/create', isAuth, createExercise)
router.get('/all', isAuth, getAllExercises)
router.delete('/delete', isAuth, deleteExercise)
router.put('/update', isAuth, updateExercise)

export default router
