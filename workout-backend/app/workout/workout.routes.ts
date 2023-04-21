import express from 'express'

import { isAuth } from '../middleware/auth.middleware'

import {
	createNewWorkoutLog,
	getWorkoutLogById,
	updateCompleteWorkoutLog
} from './log/workout-log.controller'
import {
	createWorkout,
	deleteWorkout,
	getAllWorkouts,
	getSingleWorkout,
	updateWorkout
} from './workout.controller'

const router = express.Router()

router.get('/', isAuth, getAllWorkouts)
router.get('/:id', isAuth, getSingleWorkout)
router.get('/log/:id', isAuth, getWorkoutLogById)
router.post('/', isAuth, createWorkout)
router.post('/log/:workoutId', isAuth, createNewWorkoutLog)
router.put('/:id', isAuth, updateWorkout)
router.patch('/log/complete/:id', isAuth, updateCompleteWorkoutLog)
router.delete('/:id', isAuth, deleteWorkout)

export default router
