import { createTransporter } from '../config/nodemailer.js'
import { formatTime } from '../utils/index.js'
export async function sendEmailNewAppointment({ date, time, fullname }) {
    const transporter = createTransporter(process.env.EMAIL_HOST, process.env.EMAIL_PORT, process.env.EMAIL_USER, process.env.EMAIL_PASSWORD)

    // Enviar el email
    const info = await transporter.sendMail({
        from: 'Appsalon <citas@appsalon.com>',
        to: 'admin@appsalon.com',
        subject: "Appsalon - Nueva cita",
        text: "Appsalon - Nueva cita",
        html: `<body style="background-color: rgb(31 41 55);">
        <h1 style="font-family: ui-sans-serif, system-ui, sans-serif; color: white; font-weight: 800; font-size: 3rem; text-align: center;">Appsalon - Nueva cita</h1>
        <p style="font-family: ui-sans-serif, system-ui, sans-serif; color: white; font-weight: 400; font-size: 1.2rem;">Hola: Admin, tienes una nueva cita de ${fullname}</p>
        <p style="font-family: ui-sans-serif, system-ui, sans-serif; color: white; font-weight: 400; font-size: 1.2rem;">La cita será el día: ${date} a las ${formatTime(time)} horas.</p>
        </body>`
    })
}

export async function sendEmailUpdateAppointment({ date, time, fullname }) {
    const transporter = createTransporter(process.env.EMAIL_HOST, process.env.EMAIL_PORT, process.env.EMAIL_USER, process.env.EMAIL_PASSWORD)

    // Enviar el email
    const info = await transporter.sendMail({
        from: 'Appsalon <citas@appsalon.com>',
        to: 'admin@appsalon.com',
        subject: "Appsalon - Cita actualizada",
        text: "Appsalon - Cita actualizada",
        html: `<body style="background-color: rgb(31 41 55);">
        <h1 style="font-family: ui-sans-serif, system-ui, sans-serif; color: white; font-weight: 800; font-size: 3rem; text-align: center;">Appsalon - Cita actualizada</h1>
        <p style="font-family: ui-sans-serif, system-ui, sans-serif; color: white; font-weight: 400; font-size: 1.2rem;">Hola: Admin, ${fullname} a modificado una cita</p>
        <p style="font-family: ui-sans-serif, system-ui, sans-serif; color: white; font-weight: 400; font-size: 1.2rem;">La nueva cita será el día: ${date} a las ${formatTime(time)} horas.</p>
        </body>`
    })
}

export async function sendEmailCancelAppointment({ date, time, fullname }) {
    const transporter = createTransporter(process.env.EMAIL_HOST, process.env.EMAIL_PORT, process.env.EMAIL_USER, process.env.EMAIL_PASSWORD)

    // Enviar el email
    const info = await transporter.sendMail({
        from: 'Appsalon <citas@appsalon.com>',
        to: 'admin@appsalon.com',
        subject: "Appsalon - Cita cancelada",
        text: "Appsalon - Cita cancelada",
        html: `<body style="background-color: rgb(31 41 55);">
        <h1 style="font-family: ui-sans-serif, system-ui, sans-serif; color: white; font-weight: 800; font-size: 3rem; text-align: center;">Appsalon - Cita cancelada</h1>
        <p style="font-family: ui-sans-serif, system-ui, sans-serif; color: white; font-weight: 400; font-size: 1.2rem;">Hola: Admin, ${fullname} a cancelado una cita</p>
        <p style="font-family: ui-sans-serif, system-ui, sans-serif; color: white; font-weight: 400; font-size: 1.2rem;">La cita estaba programada para el día: ${date} a las ${formatTime(time)} horas.</p>`
    })
}