import { createTransporter } from "../config/nodemailer.js";

export async function sendEmailVerification({ name, email, token }) {
    const transporter = createTransporter(process.env.EMAIL_HOST, process.env.EMAIL_PORT, process.env.EMAIL_USER, process.env.EMAIL_PASSWORD)

    // Enviar el email
    const info = await transporter.sendMail({
        from: `"Appsalon" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Appsalon - Confirma tu cuenta",
        text: "Appsalon - Confirma tu cuenta",
        html: `
            <body style="background-color: rgb(31, 41, 55); margin: 0; padding: 0; box-sizing: border-box;">
                <h1 style="font-family: ui-sans-serif, system-ui, sans-serif; color: white; font-weight: 800; font-size: 3rem; text-align: center; margin: 20px 0;">Appsalon - Confirma tu cuenta</h1>
                <p style="font-family: ui-sans-serif, system-ui, sans-serif; color: white; font-weight: 400; font-size: 1.2rem; text-align: center; margin: 10px 0;">
                    Hola <strong>${name}</strong>, confirma tu cuenta en Appsalon.
                </p>
                <p style="font-family: ui-sans-serif, system-ui, sans-serif; color: white; font-weight: 400; font-size: 1.2rem; text-align: center; margin: 10px 0;">
                    Tu cuenta está casi lista. Solo debes confirmarla en el siguiente enlace:
                </p>
                <div style="display: flex; justify-content: center; margin: 20px;">
                    <a href="${process.env.FRONTEND_URL}/auth/confirm-account/${token}"
                        style="text-decoration: none; background-color: rgb(59, 130, 246); color: white; padding: 1rem 2rem; border-radius: 0.5rem; font-size: 1.1rem; box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;">
                        Confirmar cuenta
                    </a>
                </div>
                <p style="font-family: ui-sans-serif, system-ui, sans-serif; color: white; font-weight: 400; font-size: 1.2rem; text-align: center; margin: 10px 0;">
                    Si tú no creaste esta cuenta, puedes ignorar este mensaje.
                </p>
            </body>
        `
    })
}

export async function sendEmailPasswordReset({ name, email, token }) {
    const transporter = createTransporter(process.env.EMAIL_HOST, process.env.EMAIL_PORT, process.env.EMAIL_USER, process.env.EMAIL_PASSWORD)

    // Enviar el email
    const info = await transporter.sendMail({
        from: `"Appsalon" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Appsalon - Reestablece tu contraseña",
        text: "Appsalon - Reestablece tu contraseña",
        html: `
            <body style="background-color: rgb(31, 41, 55); margin: 0; padding: 0; box-sizing: border-box;">
                <h1 style="font-family: ui-sans-serif, system-ui, sans-serif; color: white; font-weight: 800; font-size: 3rem; text-align: center; margin: 20px 0;">Appsalon - Reestablece tu contraseña</h1>
                <p style="font-family: ui-sans-serif, system-ui, sans-serif; color: white; font-weight: 400; font-size: 1.2rem; text-align: center; margin: 10px 0;">
                    Hola: ${name}, has solicistado reestablecer tu contraseña
                </p>
                <p style="font-family: ui-sans-serif, system-ui, sans-serif; color: white; font-weight: 400; font-size: 1.2rem; text-align: center; margin: 10px 0;">
                    Sigue el siguiente enlace para generar una nueva contraseña
                </p>
                <div style="display: flex; align-items: center; justify-content: center; margin: 20px;"">
                    <a href="${process.env.FRONTEND_URL}/auth/forgot-password/${token}" 
                        style="text-decoration: none; background-color: rgb(59, 130, 246); font-family: ui-sans-serif, system-ui, sans-serif; color: white; padding: 1rem 2rem; border-radius: .5rem; font-size: 1.1rem; box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;">Reestablecer contraseña</a>
                </div>
                <p style="font-family: ui-sans-serif, system-ui, sans-serif; color: white; font-weight: 400; font-size: 1.2rem; text-align: center; margin: 10px 0;">
                    Si tu no solicitaste esto, puedes ignorar este mensaje.
                </p>
        </body>`
    })
}