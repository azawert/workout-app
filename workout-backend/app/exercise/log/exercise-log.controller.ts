import { Response } from 'express'
import asyncHandler from 'express-async-handler'
import { StatusCodes } from 'http-status-codes'

import { prisma } from '../../prisma'
import { IRequest } from '../../types/request.type'

import { addPrevValues } from './utils/add-values'

interface ITimes {
	weight: number
	repeat: number
}
export const createNewExerciseLog = asyncHandler(
	async (req: IRequest, res: Response) => {
		const { exerciseId } = req.params

		const exerciseById = await prisma.exercise.findUnique({
			where: { id: Number(exerciseId) }
		})
		if (!exerciseById) {
			res.status(StatusCodes.NOT_FOUND).json({ message: 'Not found' })
			return
		}
		let timesArray: ITimes[] = []
		for (let i = 0; i < exerciseById?.times; i++) {
			timesArray.push({
				weight: 0,
				repeat: 0
			})
		}
		const exerciseLog = await prisma.exerciseLog.create({
			data: {
				User: {
					connect: {
						id: Number(req.user)
					}
				},
				Exercise: {
					connect: {
						id: Number(exerciseId)
					}
				},
				times: {
					createMany: {
						data: timesArray
					}
				}
			},
			include: {
				times: true
			}
		})
		res.status(StatusCodes.CREATED).json(exerciseLog)
	}
)

export const toggleCompletedLog = asyncHandler(
	async (req: IRequest, res: Response) => {
		const { logId } = req.params
		const { isCompleted } = req.body
		const exerciseLog = await prisma.exerciseLog.update({
			data: { isCompleted },
			where: {
				id: Number(logId)
			},
			include: {
				Exercise: true,
				WorkoutLog: true
			}
		})
		res.status(StatusCodes.OK).json(exerciseLog)
	}
)

export const getLogById = asyncHandler(async (req: IRequest, res: Response) => {
	const { logId } = req.params
	console.log(req.params)
	const exerciseLog = await prisma.exerciseLog.findUnique({
		where: {
			id: Number(logId)
		},
		include: {
			Exercise: true,
			times: {
				orderBy: {
					id: 'asc'
				}
			}
		}
	})
	if (!exerciseLog) {
		res.status(StatusCodes.NOT_FOUND).json({ message: 'Not found' })
		return
	}
	const prevExerciseLog = await prisma.exerciseLog.findFirst({
		orderBy: {
			createdAt: 'desc'
		},
		where: {
			id: Number(exerciseLog.id),
			userId: Number(req.user),
			isCompleted: true
		},
		include: {
			times: true
		}
	})
	const newTimes = addPrevValues(exerciseLog, prevExerciseLog)

	res.status(StatusCodes.OK).json({ ...exerciseLog, times: newTimes })
})

export const updateExerciseLog = asyncHandler(
	async (req: IRequest, res: Response) => {
		try {
			const { logId } = req.params
			const { weight, repeat, isCompleted } = req.body

			const logTime = await prisma.exerciseTimes.update({
				where: { id: Number(logId) },
				data: {
					isCompleted,
					weight,
					repeat
				}
			})
			res.status(StatusCodes.OK).json(logTime)
		} catch (e: any) {
			res.status(StatusCodes.NOT_FOUND).json({ message: e.message })
		}
	}
)
