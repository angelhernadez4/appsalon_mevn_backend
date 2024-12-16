import mongoose from "mongoose"
import jwt from 'jsonwebtoken'
import { format } from "date-fns"
import { es } from 'date-fns/locale';

function validateObjectId(id, res) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error('El id no es válido')
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

function handleNotFoundError(message, res) {
    const error = new Error(message)
    return res.status(404).json({
        success: false,
        message: error.message
    })
}

const uniqueId = () => Date.now().toString(32) + Math.random().toString(32).substring(2)

const generateJWT = (id) => {
    const token = jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '15h'
    })

    return token
}

function formatDate(date) {
    return format(date, 'PPPP', { locale: es }) 
}

function formatTime(time) {
    const [hours, minutes] = time.split(':').map(Number); // Divide horas y minutos
    const suffix = hours >= 12 ? 'PM' : 'AM'; // Determina AM o PM
    const formattedHours = hours % 12 || 12; // Convierte a formato de 12 horas (12 en punto se mantiene como 12)
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${suffix}`;
}

export {
    validateObjectId,
    handleNotFoundError,
    uniqueId,
    generateJWT,
    formatDate,
    formatTime
}