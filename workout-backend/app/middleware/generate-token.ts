import jwt from 'jsonwebtoken'

export const generateToken = async (id: number) => {
	jwt.sign(String(id), process.env.ACCESS_TOKEN!)
}
