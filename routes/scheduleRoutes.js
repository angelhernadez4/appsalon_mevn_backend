import express from 'express'
import { createSchedule, getScheduleById, getScheduleByDay, updateSchedule, getDay } from '../controllers/ScheduleController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
    .get(authMiddleware, getDay)
    .post(authMiddleware, createSchedule)

router.route('/:id')
    .put(authMiddleware, updateSchedule)

router.route('/:day')
    .get(authMiddleware, getScheduleByDay)
export default router