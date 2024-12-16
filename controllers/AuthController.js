import { sendEmailVerification, sendEmailPasswordReset } from "../emails/authEmailService.js";
import { generateJWT, uniqueId } from "../utils/index.js";
import User from "../models/User.js";

const register = async (req, res) => {

    // Valida todos los campos
    if (Object.values(req.body).includes('')) {
        const error = new Error('Todos los campos son obligatorios')
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }

    const { email, password, name} = req.body
    // Evitar registros duplicados
    const userExists = await User.findOne({ email })
    if (userExists) {
        const error = new Error('Usuario ya registrado')
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }

    // Validar la extensión del password
    const MIN_PASSWORD_LENGTH = 8
    if (password.trim().length < MIN_PASSWORD_LENGTH) {
        const error = new Error(`La contraseña debe contener ${MIN_PASSWORD_LENGTH} caracteres.`)
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
    try {
        const user = new User(req.body)
        const result = await user.save()
        const { name, email, token } = result
        sendEmailVerification({ name, email, token })

        res.json({
            success: true,
            message: 'Usuario creado correctamente, revista tu correo electrónico.'
        })
    } catch (error) {
        console.error(error);
    }
}

const verifyAccount = async (req, res) => {
    const { token } = req.params

    const user = await User.findOne({ token })
    if (!user) {
        const error = new Error(`Hubo un error, token no válido`)
        return res.status(401).json({
            success: false,
            message: error.message
        })
    }

    try {
        user.verified = true
        user.token = ''
        await user.save()
        res.json({
            success: true,
            message: 'Usuario confirmado correctamente.'
        })
    } catch (error) {
        console.error(error);
        
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    // Revisar que el usuario exista
    const user = await User.findOne({ email })
    if (!user) {
        const error = new Error(`El usuario no existe`)
        return res.status(404).json({
            success: false,
            message: error.message
        })
    }

    // Revisar si el usuario confirmo su cuenta
    if (!user.verified) {
        const error = new Error(`Tu cuenta no ha sido confirmado aún`)
        return res.status(404).json({
            success: false,
            message: error.message
        })
    }

    // Comprobar el password
    if (await user.checkPassword(password)) {
        const token = generateJWT(user._id)
        
        res.json({
            token
        })
    } else {
        const error = new Error(`La contraseña es incorrecto`)
        return res.status(404).json({
            success: false,
            message: error.message
        })
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body

    // Comprobar si existe el usuario
    const user = await User.findOne({ email })
    if (!user) {
        const error = new Error(`El usuario no existe`)
        return res.status(404).json({
            success: false,
            message: error.message
        })
    }

    try {
       user.token = uniqueId() 
       const result = await user.save()
       await sendEmailPasswordReset({
            name: result.name,
            email: result.email,
            token: result.token
        })
       res.json({
        success: true,
        message: 'Hemos enviado un correo electrónico con las instrucciones'
       })
    } catch (error) {
        console.error(error);
        
    }
}

const verifyPasswordResetToken = async (req, res) => {
    const { token } = req.params
    const isValidToken = await User.findOne({token})
    if (!isValidToken) {
        const error = new Error(`Hubo un error, token no válido`)
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
    res.json({
        success: true,
        message: 'Token válido'
    })
}

const updatePassword = async (req, res) => {
    const { password } = req.body
    const { token } = req.params
    const user = await User.findOne({token})
    if (!user) {
        const error = new Error(`Hubo un error, token no válido`)
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
    try {
        user.token = ""
        user.password = password
        await user.save()
        res.json({
            success: true,
            message: 'Contraseña actualizada correctamente.'
        })
    } catch (error) {
        console.error(error);  
    }
}

const changePasswordCurrent = async (req, res) => {
    const { current_password, password } = req.body
    
    const { id } = req.user
    
    const user = await User.findById(id)

    const isPasswordCorrect = await user.checkPassword(current_password)
    if (!isPasswordCorrect) {
        const error = new Error(`La contraseña actual es incorrecto`)
        return res.status(401).json({
            success: false,
            message: error.message
        })
    }
    user.password = password
    await user.save()
    res.json({
        success: true,
        message: 'La contraseña se actualizo correctamente.'
    })
}

const user = async (req, res) => {
    const { user } = req
    res.json({
        user
    })
}

const admin = async (req, res) => {
    const { user } = req
    if (!user.admin) {
        const error = new Error(`Acción no válida`)
        return res.status(403).json({
            success: false,
            message: error.message
        })
    }
    
    res.json({
        user
    })
}

export {
    register,
    verifyAccount,
    login,
    forgotPassword,
    changePasswordCurrent,
    verifyPasswordResetToken,
    updatePassword,
    user,
    admin
}