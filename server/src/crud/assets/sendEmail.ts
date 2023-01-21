import * as nodemailer from 'nodemailer';

const HOST = 'juicerappofficial@gmail.com'// email host
const USER = 'juicerappofficial@gmail.com'// email id
const PASS = 'plsoovkmdwvujbgb'// email password
const SERVICE = 'Gmail'// email service

export async function sendEmail(res: any, req: any, token: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: HOST,
      service: SERVICE,
      port: 587,
      secure: true,
      auth: {
          user: USER,
          pass: PASS,
      },
    });
    await transporter.sendMail({
      from: USER,
      to: req.body.email,
      subject: 'Password reset',
      text: `Haz click en el siguiente enlace para restablecer tu contraseña: http://10.6.130.29/reset/${token}`,
      html: `<h1>Juicer</h1><h2>Correo de restablecimiento de contraseña:</h2><h3><a href="http://10.6.130.29/reset/${token}">Restablecer contraseña</a></h3>`,
    });
    return res.status(200).send("Correo enviado correctamente");

  } catch (error) {
    return res.status(500).send(error);
  }
}
  
  
  
  