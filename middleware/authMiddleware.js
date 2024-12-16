import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const authMiddleware = async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            const token = req.headers.authorization.split(' ')[1]
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decode.id).select("-password -verified -token -__v")
            return next()
        } catch {
            const error = new Error('Token no válido')
            return res.status(403).json({
                success: false,
                message: error.message
            })
        }
        
    } else {
        const error = new Error('Token no válido o inexistente')
        return res.status(403).json({
            success: false,
            message: error.message
        })
    }
    next()
}

export default authMiddleware