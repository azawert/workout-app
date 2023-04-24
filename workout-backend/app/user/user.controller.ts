import { Response } from 'express'
import asyncHandler from 'express-async-handler'
import { StatusCodes } from 'http-status-codes'

import { UserReturnFields } from '../middleware/user.utils'

import { prisma } from '../prisma'
import { IRequest } from '../types/request.type'

export const getUserProfile = asyncHandler(
	async (req: IRequest, res: Response) => {
		const id = req.user
		const user = await prisma.user.findUnique({
			where: { id: +id },
			select: UserReturnFields
		})
		if (!user) {
			res.status(StatusCodes.NOT_FOUND).json({ message: 'Not found' })
			return
		}
		res.status(StatusCodes.OK).json(user)
	}
)

export const getUserStatistics = asyncHandler(
	async (req: IRequest, res: Response) => {
		const userId = req.user
		const numberOfWorkouts = await prisma.workoutLog.count({
			where: {
				userId: {
					equals: Number(userId)
				},
				isCompleted: true
			}
		})

		const exerciseTimesCompleted = await prisma.exerciseLog.count({
			where: {
				userId: Number(userId),
				isCompleted: true
			}
		})

		const kgs = await prisma.exerciseTimes.aggregate({
			where: {
				exerciseLog: {
					userId: Number(userId)
				},
				isCompleted: true
			},
			_sum: {
				weight: true
			}
		})

		res.status(StatusCodes.OK).json([
			{
				label: 'Minutes',
				value: Math.ceil(exerciseTimesCompleted * 3.7)
			},
			{
				label: 'Kg',
				value: kgs._sum.weight ?? 0
			},
			{
				label: 'Workouts',
				value: numberOfWorkouts
			}
		])
	}
)
