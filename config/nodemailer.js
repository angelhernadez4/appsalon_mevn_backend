import nodemailer from 'nodemailer'

export function createTransporter(host, port, user, pass) {
    return nodemailer.createTransport({
        host,
        port,
        auth: {
          user,
          pass
        }
      });
}