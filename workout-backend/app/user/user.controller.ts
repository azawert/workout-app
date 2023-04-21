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
