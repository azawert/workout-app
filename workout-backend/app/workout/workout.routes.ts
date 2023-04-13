import express from 'express'

import { isAuth } from '../middleware/auth.middleware'

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
router.post('/', isAuth, createWorkout)
router.put('/:id', isAuth, updateWorkout)
router.delete('/:id', isAuth, deleteWorkout)

export default router
