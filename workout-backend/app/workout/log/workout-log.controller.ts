import { Response } from 'express'
import asyncHandler from 'express-async-handler'
import { StatusCodes } from 'http-status-codes'

import { prisma } from '../../prisma'
import { IRequest } from '../../types/request.type'
import { calculateMinutes } from '../utils/calc-average-min'

export const createNewWorkoutLog = asyncHandler(
	async (req: IRequest, res: Response) => {
		const { workoutId } = req.params
		const userId = req.user

		const workout = await prisma.workout.findUnique({
			where: {
				id: Number(workoutId)
			},
			include: {
				exercises: true
			}
		})

		if (!workout) {
			res.status(StatusCodes.NOT_FOUND).json({ message: 'Not found' })
			return
		}
		const workoutLog = await prisma.workoutLog.create({
			data: {
				user: {
					connect: {
						id: Number(userId)
					}
				},
				workout: {
					connect: {
						id: Number(workoutId)
					}
				},
				exerciseLogs: {
					create: workout.exercises.map(exercise => ({
						User: {
							connect: {
								id: Number(userId)
							}
						},
						Exercise: {
							connect: {
								id: exercise.id
							}
						},
						times: {
							create: Array.from({ length: exercise.times }, () => ({
								weight: 0,
								repeat: 0
							}))
						}
					}))
				}
			},
			include: {
				exerciseLogs: {
					include: {
						times: true
					}
				}
			}
		})
		res.status(StatusCodes.CREATED).json(workoutLog)
	}
)

export const getWorkoutLogById = asyncHandler(
	async (req: IRequest, res: Response) => {
		const { id } = req.params
		const workoutLog = await prisma.workoutLog.findUnique({
			where: {
				id: Number(id)
			},
			include: {
				workout: {
					include: {
						exercises: true
					}
				},
				exerciseLogs: {
					orderBy: {
						id: 'asc'
					},
					include: {
						Exercise: true
					}
				},
				user: true
			}
		})
		if (!workoutLog) {
			res.status(StatusCodes.NOT_FOUND).json({ message: 'Not found' })
			return
		}
		res.status(StatusCodes.OK).json({
			...workoutLog,
			minutes: calculateMinutes(workoutLog.workout.exercises.length)
		})
	}
)

export const updateCompleteWorkoutLog = asyncHandler(
	async (req: IRequest, res: Response) => {
		const { id } = req.params

		const workoutLog = await prisma.workoutLog.update({
			where: {
				id: Number(id)
			},
			data: {
				isCompleted: true
			}
		})
		res.status(StatusCodes.OK).json(workoutLog)
	}
)
