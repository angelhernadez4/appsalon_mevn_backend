
import Services from '../models/Services.js'
import { handleNotFoundError, validateObjectId } from '../utils/index.js'

const createService = async (req, res) => {
    if (Object.values(req.body).includes('')) {
        const error = new Error('Todos los campos son obligatorios')
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }

    try {
        const service = new Services(req.body)
        await service.save()
        res.json({
            success: true,
            message: 'Servicio creado correctamente'
        })
    } catch (error) {
        console.error(error);
    }
}

const getServices = async (req, res) => {
    try {
        const services = await Services.find()
        res.json(services)
    } catch (error) {
        console.error(error);
    }
}

const getServiceById = async (req, res) => {
    const { id } = req.params

    // Validar un object id
    if(validateObjectId(id, res)) return

    // Validar que exista
    const service = await Services.findById(id)

    if (!service) {
        return handleNotFoundError('El servicio no existe', res)
    }

    // Mostrar el servicio
    res.json(service)
}

const updateService = async (req, res) => {
    const { id } = req.params

    // Validar un object id
    if(validateObjectId(id, res)) return

    // Validar que exista
    const service = await Services.findById(id)

    if (!service) {
        return handleNotFoundError('El servicio no existe', res)
    }

    // Escribimos en el objeto los valores nuevos
    service.name = req.body.name ?? service.name
    service.price = req.body.price ?? service.price

    try {
        await service.save()
        res.json({
            success: true,
            message: 'Servicio actualizado correctamente'
        })
    } catch (error) {
        console.error(error);
    }
}

const deleteService = async (req, res) => {
    const { id } = req.params

    // Validar un object id
    if(validateObjectId(id, res)) return

    // Validar que exista
    const service = await Services.findById(id)

    if (!service) {
        return handleNotFoundError('El servicio no existe', res)
    }

    try {
        await service.deleteOne()
        res.json({
            success: true,
            message: 'servicio eliminado correctamente'
        })
    } catch (error) {
        console.error(error);
        
    }
}

export {
    createService,
    getServices,
    getServiceById,
    updateService,
    deleteService
}