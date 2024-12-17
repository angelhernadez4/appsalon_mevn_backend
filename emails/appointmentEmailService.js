import { createTransporter } from '../config/nodemailer.js'
import { formatTime } from '../utils/index.js'
export async function sendEmailNewAppointment({ date, time, fullname }) {
    const transporter = createTransporter(process.env.EMAIL_HOST, process.env.EMAIL_PORT, process.env.EMAIL_USER, process.env.EMAIL_PASSWORD)

    // Enviar el email
    const info = await transporter.sendMail({
        from: `"Appsalon" <${process.env.FRONTEND_URL}>`,
        to: `${process.env.EMAIL_USER}`,
        subject: "Appsalon - Nueva cita",
        text: "Appsalon - Nueva cita",
        html: `
            <body style="background-color: rgb(31, 41, 55); margin: 0; padding: 0; box-sizing: border-box;">
                <h1 style="font-family: ui-sans-serif, system-ui, sans-serif; color: white; font-weight: 800; font-size: 3rem; text-align: center; margin: 20px 0;">Appsalon - Nueva cita</h1>
                <p style="font-family: ui-sans-serif, system-ui, sans-serif; color: white; font-weight: 400; font-size: 1.2rem; text-align: center; margin: 10px 0;">
                    Hola: Admin, tienes una nueva cita de ${fullname}
                </p>
                <p style="font-family: ui-sans-serif, system-ui, sans-serif; color: white; font-weight: 400; font-size: 1.2rem; text-align: center; margin: 10px 0;">
                    La cita será el día: ${date} a las ${formatTime(time)} horas.
                </p>
            </body>
        `
    })
}

export async function sendEmailUpdateAppointment({ date, time, fullname }) {
    const transporter = createTransporter(process.env.EMAIL_HOST, process.env.EMAIL_PORT, process.env.EMAIL_USER, process.env.EMAIL_PASSWORD)

    // Enviar el email
    const info = await transporter.sendMail({
        from: `"Appsalon" <${process.env.FRONTEND_URL}>`,
        to: `${process.env.EMAIL_USER}`,
        subject: "Appsalon - Cita actualizada",
        text: "Appsalon - Cita actualizada",
        html: `
            <body style="background-color: rgb(31, 41, 55); margin: 0; padding: 0; box-sizing: border-box;">
                <h1 style="font-family: ui-sans-serif, system-ui, sans-serif; color: white; font-weight: 800; font-size: 3rem; text-align: center; margin: 20px 0;">Appsalon - Cita actualizada</h1>
                <p style="font-family: ui-sans-serif, system-ui, sans-serif; color: white; font-weight: 400; font-size: 1.2rem; text-align: center; margin: 10px 0;">
                    Hola: Admin, ${fullname} a modificado una cita
                </p>
                <p style="font-family: ui-sans-serif, system-ui, sans-serif; color: white; font-weight: 400; font-size: 1.2rem; text-align: center; margin: 10px 0;">
                    La nueva cita será el día: ${date} a las ${formatTime(time)} horas.
                </p>
            </body>
        `
    })
}

export async function sendEmailCancelAppointment({ date, time, fullname }) {
    const transporter = createTransporter(process.env.EMAIL_HOST, process.env.EMAIL_PORT, process.env.EMAIL_USER, process.env.EMAIL_PASSWORD)

    // Enviar el email
    const info = await transporter.sendMail({
        from: `"Appsalon" <${process.env.FRONTEND_URL}>`,
        to: `${process.env.EMAIL_USER}`,
        subject: "Appsalon - Cita cancelada",
        text: "Appsalon - Cita cancelada",
        html: `
        <body style="background-color: rgb(31, 41, 55); margin: 0; padding: 0; box-sizing: border-box;">
            <h1 style="font-family: ui-sans-serif, system-ui, sans-serif; color: white; font-weight: 800; font-size: 3rem; text-align: center; text-align: center; margin: 20px 0;">Appsalon - Cita cancelada</h1>
            <p style="font-family: ui-sans-serif, system-ui, sans-serif; color: white; font-weight: 400; font-size: 1.2rem; text-align: center; margin: 10px 0;">
                Hola: Admin, ${fullname} a cancelado una cita
            </p>
            <p style="font-family: ui-sans-serif, system-ui, sans-serif; color: white; font-weight: 400; font-size: 1.2rem; text-align: center; margin: 10px 0;">
                La cita estaba programada para el día: ${date} a las ${formatTime(time)} horas.
            </p>
        </body>`
    })
}