import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import path from 'path'

import { errorHandler, notFound } from './app/middleware/error.middleware'

import authRoutes from './app/auth/auth.routes'
import exerciseRoutes from './app/exercise/exercise.routes'
import { prisma } from './app/prisma'
import userRoutes from './app/user/user.routes'

dotenv.config()
const app = express()
async function main() {
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'))
	}
	const __dirname = path.resolve()
	app.use(express.json())
	app.use('/api/auth', authRoutes)
	app.use('/api/user', userRoutes)
	app.use('/api/exercise', exerciseRoutes)
	app.use('/uploads', express.static(path.join(__dirname, '/uploads/')))
	app.use(notFound)
	app.use(errorHandler)
	const PORT = process.env.PORT ?? 5001
	app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.log(e)
		await prisma.$disconnect()
		process.exit(1)
	})
