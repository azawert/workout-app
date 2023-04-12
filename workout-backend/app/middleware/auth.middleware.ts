import { NextFunction, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'

import { IRequest } from '../types/request.type'

export const isAuth = (req: IRequest, res: Response, next: NextFunction) => {
	const token = req.headers.authorization
	if (!token || !token.startsWith('Bearer ')) {
		res.status(StatusCodes.UNAUTHORIZED).json({ message: 'No authorization' })
		return
	}
	const isVerified = jwt.verify(
		token.substring(6).trim(),
		process.env.ACCESS_TOKEN!
	)
	if (!isVerified) {
		res.status(StatusCodes.UNAUTHORIZED).json({ message: 'No authorization' })
		return
	}
	req.user = isVerified
	next()
}
