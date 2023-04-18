import express from 'express'

import { isAuth } from '../middleware/auth.middleware'

import {
	createExercise,
	deleteExercise,
	getAllExercises,
	updateExercise
} from './exercise.controller'
import {
	createNewExerciseLog,
	getLogById,
	toggleCompletedLog,
	updateExerciseLog
} from './log/exercise-log.controller'

const router = express.Router()

router.post('/create', isAuth, createExercise)
router.post('/log/:exerciseId', isAuth, createNewExerciseLog)
router.get('/all', isAuth, getAllExercises)
router.get('/log/:logId', isAuth, getLogById)
router.delete('/:exerciseId', isAuth, deleteExercise)
router.put('/:exerciseId', isAuth, updateExercise)
router.put('/log/time/:logId', isAuth, updateExerciseLog)
router.patch('/log/complete/:logId', isAuth, toggleCompletedLog)

export default router
