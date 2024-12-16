import Appointment from "../models/Appointment.js";
import User from '../models/User.js'
import { handleNotFoundError, validateObjectId } from "../utils/index.js";

const getUserAppointments =  async (req, res) => {
    const {user} = req.params
    if (user !== req.user._id.toString()) {
        const error = new Error('Acceso denegado')
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
    try {
        const query = req.user.admin ? { date: { $gte: new Date() } } : { user, date: { $gte: new Date() } }
        const appointments = await Appointment.find(query).populate('services').populate({path: 'user', select: 'name email last_name'}).sort({ date: 'asc'})
        res.json(appointments) 
    } catch (error) {
        console.error(error);
        
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params

    // Validar un object id
    if(validateObjectId(id, res)) return

    const user = await User.findById(id)

    if (!user) {
        return handleNotFoundError('El usuario no existe', res)
    }

    user.name = req.body.name ?? user.name
    user.last_name = req.body.last_name ?? user.last_name
    user.image = req.body.image ?? user.image
    user.imageId = req.body.imageId ?? user.imageId
    
    try {
        await user.save()
        res.json({
            success: true,
            message: 'Usuario actualizado correctamente'
        })
    } catch (error) {
        console.error(error);
    }
}

export {
    getUserAppointments,
    updateUser
}