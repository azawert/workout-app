import { PrismaClient } from '@prisma/client'
import { Response } from 'express'
import asyncHandler from 'express-async-handler'
import { StatusCodes } from 'http-status-codes'

import { prisma } from '../prisma'
import { IRequest } from '../types/request.type'

export const createExercise = asyncHandler(
	async (req: IRequest, res: Response) => {
		const { name, times, iconPath } = req.body
		try {
			if (!name || !times || !iconPath) {
				res.status(StatusCodes.BAD_REQUEST).json({ message: 'Bad request' })
				return
			}
			const createdExercise = await prisma.exercise.create({
				data: { iconPath, name, times }
			})
			res.status(StatusCodes.CREATED).json(createdExercise)
		} catch (e: any) {
			console.log(e.message)
			res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.json({ message: 'Internal server error' })
		}
	}
)

export const getAllExercises = asyncHandler(
	async (req: IRequest, res: Response) => {
		try {
			const exercises = await prisma.exercise.findMany({
				orderBy: {
					createdAt: 'desc'
				}
			})
			res.status(200).json(exercises)
		} catch (e) {
			console.log(e)
			res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.json({ message: 'Internal server error' })
		}
	}
)

export const deleteExercise = asyncHandler(
	async (req: IRequest, res: Response) => {
		try {
			const { id } = req.params
			if (!id) {
				res.status(StatusCodes.BAD_REQUEST).json({ message: 'Bad request' })
				return
			}
			await prisma.exercise.delete({ where: { id: Number(id) } })
			res.status(StatusCodes.NO_CONTENT).json()
		} catch (e) {
			console.log(e)
			res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.json({ message: 'Internal server error' })
		}
	}
)

export const updateExercise = asyncHandler(
	async (req: IRequest, res: Response) => {
		try {
			const { id } = req.params
			const { name, times, iconPath } = req.body
			const existingExercise = await prisma.exercise.findUnique({
				where: { id: Number(id) }
			})
			if (!existingExercise) {
				res.status(StatusCodes.NOT_FOUND).json({ message: 'Not found' })
				return
			}
			const newExercise = await prisma.exercise.update({
				where: { id: existingExercise.id },
				data: { name, times, iconPath }
			})
			res.status(StatusCodes.OK).json(newExercise)
		} catch (e) {
			console.log(e)
			res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.json({ message: 'Internal server error' })
		}
	}
)
