import { PrismaClient } from '@prisma/client'
import { Response } from 'express'
import asyncHandler from 'express-async-handler'
import { StatusCodes } from 'http-status-codes'

import { prisma } from '../prisma'
import { IRequest } from '../types/request.type'

import { calculateMinutes } from './utils/calc-average-min'

export const createWorkout = asyncHandler(
	async (req: IRequest, res: Response) => {
		try {
			const { name, exercises } = req.body
			const createdWorkout = await prisma.workout.create({
				data: {
					name,
					exercises: {
						connect: exercises.map((id: string) => ({
							id: +id
						}))
					}
				},
				include: {
					exercises: true
				}
			})
			res.status(StatusCodes.CREATED).json(createdWorkout)
		} catch (e: any) {
			console.log(e.message)
			res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.json({ message: 'Internal server error' })
		}
	}
)

export const getAllWorkouts = asyncHandler(
	async (req: IRequest, res: Response) => {
		try {
			const allWorkouts = await prisma.workout.findMany({
				orderBy: {
					createdAt: 'desc'
				},
				include: {
					exercises: true
				}
			})
			res.status(StatusCodes.OK).json(allWorkouts)
		} catch (e) {
			console.log(e)
			res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.json({ message: 'Internal server error' })
		}
	}
)

export const deleteWorkout = asyncHandler(
	async (req: IRequest, res: Response) => {
		try {
			const { id } = req.params
			if (!id) {
				res.status(StatusCodes.BAD_REQUEST).json({ message: 'Bad request' })
				return
			}
			await prisma.workout.delete({ where: { id: Number(id) } })
			res.status(StatusCodes.NO_CONTENT).json()
		} catch (e) {
			console.log(e)
			res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.json({ message: 'Internal server error' })
		}
	}
)

export const updateWorkout = asyncHandler(
	async (req: IRequest, res: Response) => {
		try {
			const { id } = req.params
			const { name, exercises } = req.body
			const workoutToUpdate = await prisma.workout.findUnique({
				where: { id: Number(id) }
			})
			if (!workoutToUpdate) {
				res.status(StatusCodes.NOT_FOUND).json({ message: 'Not found' })
				return
			}
			const updatedWorkout = await prisma.workout.update({
				data: {
					name,
					exercises: {
						set: exercises.map((id: string) => ({ id: +id }))
					}
				},
				where: { id: workoutToUpdate.id },
				include: {
					exercises: true
				}
			})
			res.status(StatusCodes.OK).json(updatedWorkout)
		} catch (e) {
			console.log(e)
			res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.json({ message: 'Internal server error' })
		}
	}
)

export const getSingleWorkout = asyncHandler(
	async (req: IRequest, res: Response) => {
		try {
			const { id } = req.params
			const workout = await prisma.workout.findUnique({
				where: { id: Number(id) },
				include: { exercises: true }
			})
			if (!workout) {
				res.status(StatusCodes.NOT_FOUND).json({ message: 'Not found' })
				return
			}
			const lengthOfWorkout = calculateMinutes(workout.exercises.length)
			res.status(StatusCodes.OK).json({ workout, lengthOfWorkout })
		} catch (e) {
			console.log(e)
			res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.json({ message: 'Internal server error' })
		}
	}
)
