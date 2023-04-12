import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { generateToken } from '../middleware/generate-token'
import { UserReturnFields } from '../middleware/user.utils'

import { prisma } from '../prisma'

export const authUser = async (req: Request, res: Response) => {
	const { email, password } = req.body
	try {
		if (!email || !password) {
			res.status(400).json({ message: 'Bad request' })
			return
		}
		const user = await prisma.user.findUnique({ where: { email: email } })
		if (!user) {
			res.status(404).json({ message: 'Not Found' })
			return
		}
		const comparePassword = await bcrypt.compare(password, user.password)
		if (!comparePassword) {
			res.status(403).json({ message: 'Wrong credentials' })
			return
		}
		const newToken = generateToken(user.id)
		res.status(200).json({ user, token: newToken })
	} catch (e) {
		console.log(e)
		res.status(500).json({ message: 'Internal server error' })
	}
}

export const registerUser = async (req: Request, res: Response) => {
	const { email, password } = req.body
	try {
		if (!email || !password) {
			res.status(400).json({ message: 'Bad request' })
			return
		}
		const isUserRegistered = await prisma.user.findUnique({
			where: { email }
		})
		if (isUserRegistered) {
			res
				.status(400)
				.json({ message: 'User with this email already registered' })
			return
		}
		const saltRound = 10
		const hashedPassword = await bcrypt.hash(password, saltRound)
		const createdUser = await prisma.user.create({
			data: {
				email,
				name: String(faker.name.firstName()),
				password: hashedPassword
			},
			select: UserReturnFields
		})
		if (!createdUser) {
			res.status(500).json({ message: 'Internal server error' })
			return
		}
		const token = await generateToken(createdUser.id)
		res.status(201).json({ user: createdUser, token })
	} catch (e) {
		console.log(e)
		res.status(500).json({ message: 'Internal server error' })
	}
}
