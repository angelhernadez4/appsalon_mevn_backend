// const express = require('express') // versiones anteriores
import express from 'express' // ESM
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import { db } from './config/db.js' // Se coloca js porque es un archivo que tu creaste
import servicesRoutes from './routes/servicesRoutes.js'
import authRoutes from './routes/authRoutes.js'
import appointmentRoutes from './routes/appointmentRoutes.js'
import userRoutes from './routes/userRoutes.js'
import scheduleRoutes from './routes/scheduleRoutes.js'

// Variables de entorno
dotenv.config()

// Configurar la app
const app = express()

// Leer datos via body
app.use(express.json())

// Conectar a BD
db()

// Configurar CORS
const whiteList = [process.env.FRONTEND_URL]
if (process.argv[2] === '--postman') {
    whiteList.push(undefined)
}
const corsOptions = {
    origin: function(origin, callback) {        
        if (whiteList.includes(origin)) {
            // Permite la conexión
            callback(null, true)
        } else {
            // No la permite
            callback(new Error('Error de CORS'))
        }
    }
}

app.use(cors(corsOptions))

// Definir una ruta
app.use('/api/services', servicesRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/users', userRoutes)
app.use('/api/schedule', scheduleRoutes)

// Definir puerto
const PORT = process.env.PORT ?? 4000

// Arrancar la app
app.listen(PORT, () => console.log(colors.blue(`El servidor se esta ejecutando en el puerto: ${colors.blue.bold(PORT)}`)))