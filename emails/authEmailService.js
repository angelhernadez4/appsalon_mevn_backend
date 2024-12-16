import { createTransporter } from "../config/nodemailer.js";

export async function sendEmailVerification({ name, email, token }) {
    const transporter = createTransporter(process.env.EMAIL_HOST, process.env.EMAIL_PORT, process.env.EMAIL_USER, process.env.EMAIL_PASSWORD)

    // Enviar el email
    const info = await transporter.sendMail({
        from: 'Appsalon <cuentas@appsalon.com>',
        to: email,
        subject: "Appsalon - Confirma tu cuenta",
        text: "Appsalon - Confirma tu cuenta",
        html: `<body style="background-color: rgb(31 41 55);">
        <h1 style="font-family: ui-sans-serif, system-ui, sans-serif; color: white; font-weight: 800; font-size: 3rem; text-align: center;">Appsalon - Confirma tu cuenta</h1>
        <p style="font-family: ui-sans-serif, system-ui, sans-serif; color: white; font-weight: 400; font-size: 1.2rem;">Hola: ${name}, confirma tu cuenta en Appsalon</p>
        <p style="font-family: ui-sans-serif, system-ui, sans-serif; color: white; font-weight: 400; font-size: 1.2rem;">Tu cuenta esta casi lista, solo debes confirmarla en el siguiente enlace</p>
        <div style="display: flex; align-items: center; justify-content: center;">
            <a style="box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px; text-decoration: none; background-color: rgb(59 130 246); border:none; font-family: ui-sans-serif, system-ui, sans-serif; color: white; padding: 1rem; border-radius: .5rem; font-size: 1.1rem;" href="${process.env.FRONTEND_URL}/auth/confirm-account/${token}">Confirmar cuenta</a>
        </div>
        <p style="font-family: ui-sans-serif, system-ui, sans-serif; color: white; font-weight: 400; font-size: 1.2rem;">Si tu no creaste esta cuenta, puedes ignorar este mensaje.</p>
        </body>`
    })
}

export async function sendEmailPasswordReset({ name, email, token }) {
    const transporter = createTransporter(process.env.EMAIL_HOST, process.env.EMAIL_PORT, process.env.EMAIL_USER, process.env.EMAIL_PASSWORD)

    // Enviar el email
    const info = await transporter.sendMail({
        from: 'Appsalon <cuentas@appsalon.com>',
        to: email,
        subject: "Appsalon - Reestablece tu contraseña",
        text: "Appsalon - Reestablece tu contraseña",
        html: `<body style="background-color: rgb(31 41 55);">
        <h1 style="font-family: ui-sans-serif, system-ui, sans-serif; color: white; font-weight: 800; font-size: 3rem; text-align: center;">Appsalon - Reestablece tu contraseña</h1>
        <p style="font-family: ui-sans-serif, system-ui, sans-serif; color: white; font-weight: 400; font-size: 1.2rem;">Hola: ${name}, has solicistado reestablecer tu contraseña</p>
        <p style="font-family: ui-sans-serif, system-ui, sans-serif; color: white; font-weight: 400; font-size: 1.2rem;">Sigue el siguiente enlace para generar una nueva contraseña</p>
        <div style="display: flex; align-items: center; justify-content: center;">
            <a style="box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px; text-decoration: none; background-color: rgb(59 130 246); border:none; font-family: ui-sans-serif, system-ui, sans-serif; color: white; padding: 1rem; border-radius: .5rem; font-size: 1.1rem;" href="${process.env.FRONTEND_URL}/auth/forgot-password/${token}">Reestablecer contraseña</a>
        </div>
            <p style="font-family: ui-sans-serif, system-ui, sans-serif; color: white; font-weight: 400; font-size: 1.2rem;">Si tu no solicitaste esto, puedes ignorar este mensaje.</p>
        </body>`
    })
}