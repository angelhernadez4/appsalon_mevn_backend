import Appointment from '../models/Appointment.js'
import { parse, formatISO, startOfDay, endOfDay, isValid } from 'date-fns'
import { handleNotFoundError, validateObjectId, formatDate } from '../utils/index.js'
import { sendEmailCancelAppointment, sendEmailNewAppointment, sendEmailUpdateAppointment } from '../emails/appointmentEmailService.js'

const createAppointment = async (req, res) => {
    const { name, last_name } = req.user
    const appointment = req.body
    appointment.user = req.user._id.toString()
    try {        
        const newAppointment = new Appointment(appointment)
        const result = await newAppointment.save()
        
        await sendEmailNewAppointment({
            date: formatDate(result.date),
            time: result.time,
            fullname: name + ' ' + last_name
        })
        res.json({
            success: true,
            message: 'Tu reservación se realizó correctamente.'
        })
    } catch (error) {
        console.error(error);
    }
}

const getAppointmentsByDate = async (req, res) => {
    const { date } = req.query
    
    const newDate = parse(date, 'dd/MM/yyyy', new Date())
    if (!isValid(newDate)) {
        const error = new Error(`Fecha no válida`)
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
    const isoDate = formatISO(newDate)

    const appointment = await Appointment.find({ date: {
        $gte: startOfDay(new Date(isoDate)),
        $lte: endOfDay(new Date(isoDate))
    }}).select('time')

    res.json(appointment)
}

const getAppointmentById = async (req, res) => {
    const { id } = req.params

    // Validar por ObjectId
    if (validateObjectId(id, res)) return

    // Validar que exista
    const appointment = await Appointment.findById(id).populate('services')

    if (!appointment) return handleNotFoundError('La cita no existe', res)

    if (appointment.user.toString() !== req.user._id.toString()) {
        const error = new Error(`No tienes los permisos`)
        return res.status(403).json({
            success: false,
            message: error.message
        })
    }    
    // Retornar la cita
    res.json(appointment)
}

const updateAppointment = async (req, res) => {
    const { id } = req.params

    // Validar por ObjectId
    if (validateObjectId(id, res)) return

    // Validar que exista
    const appointment = await Appointment.findById(id).populate('services')

    if (!appointment) return handleNotFoundError('La cita no existe', res)

    if (appointment.user.toString() !== req.user._id.toString()) {
        const error = new Error(`No tienes los permisos`)
        return res.status(403).json({
            success: false,
            message: error.message
        })
    }
    const { date, time, totalAmount, services } = req.body
    const { name, last_name } = req.user
    appointment.date = date
    appointment.time = time
    appointment.totalAmount = totalAmount
    appointment.services = services
    
    try {
        const result = await appointment.save()
        await sendEmailUpdateAppointment({
            date: formatDate(result.date),
            time: result.time,
            fullname: name + ' ' + last_name
        })
        res.json({
            success: true,
            message: 'Cita actualizada correctamente'
        })
    } catch (error) {
        console.error(error);
    }
}

const deleteAppointment = async (req, res) => {
    const { id } = req.params
    const { name, last_name } = req.user
    // Validar por ObjectId
    if (validateObjectId(id, res)) return

    // Validar que exista
    const appointment = await Appointment.findById(id).populate('services')

    if (!appointment) return handleNotFoundError('La cita no existe', res)

    if (appointment.user.toString() !== req.user._id.toString()) {
        const error = new Error(`No tienes los permisos`)
        return res.status(403).json({
            success: false,
            message: error.message
        })
    }

    try {
        const result = await Appointment.findByIdAndDelete(id)
        await sendEmailCancelAppointment({
            date: formatDate(result.date),
            time: result.time,
            fullname: name + ' ' + last_name
        })
        res.json({
            success: true,
            message: 'Cita cancelada correctamente'
        })
    } catch (error) {
        console.error(error);
    }
}

export {
    createAppointment,
    getAppointmentsByDate,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
}