import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { getUserAppointments, updateUser } from '../controllers/UserController.js'
const router = express.Router()

router.route('/:user/appointments')
    .get(authMiddleware, getUserAppointments)

router.route('/:id')
    .put(authMiddleware, updateUser)
export default router