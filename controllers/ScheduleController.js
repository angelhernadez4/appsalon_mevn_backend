import Schedule from '../models/Schedule.js'
import { handleNotFoundError, validateObjectId } from '../utils/index.js'

const createSchedule = async (req, res) => {
    const { day, start_time, end_time } = req.body

    const body = {
        day: day,
        startTime: start_time,
        endTime: end_time
    }

    if (Object.values(req.body).includes('')) {
        const error = new Error('Todos los campos son obligatorios')
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }

    try {
        const existingSchedule = await Schedule.findOne({ day });
        if (existingSchedule) {
            const error = new Error(`Ya existe un horario para el día ${day}`)
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }
        const schedule = new Schedule(body)
        await schedule.save()
        res.json({
            success: true,
            message: 'Horario creado correctamente'
        })
    } catch (err) {
        console.error(err);
        const error = new Error('Hubo un error al crear un horario')
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const getScheduleByDay = async (req, res) => {
    const { day } = req.params

    const schedule = await Schedule.find({ day })
    
    res.json(schedule)
}

const getDay = async (req, res) => {
    try {
        const days = await Schedule.find().select('day')
        res.json(days)
    } catch (error) {
        console.error(error);
    }
}

const getScheduleById = async (req, res) => {
    const { id } = req.params

    if (validateObjectId(id, res)) return 

    const schedule = await Schedule.findById(id)
    
    res.json(schedule)
}

const updateSchedule = async (req, res) => {
    const { id } = req.params

    const { start_time, end_time } = req.body

    // Validar por ObjectId
    if (validateObjectId(id, res)) return

    if (Object.values(req.body).includes('')) {
        const error = new Error('Todos los campos son obligatorios')
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }

    const schedule = await Schedule.findById(id)

    if (!schedule) return handleNotFoundError('El horario no existe', res)


    schedule.startTime = start_time
    schedule.endTime = end_time

    try {
        await schedule.save()
        res.json({
            success: true,
            message: 'Horario actualizado correctamente'
        })
    } catch (err) {
        console.error(err);
        const error = new Error('Hubo un error al actualizar un horario')
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export {
    createSchedule,
    getScheduleByDay,
    getDay,
    getScheduleById,
    updateSchedule
}