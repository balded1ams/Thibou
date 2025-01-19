import nodemailer from 'nodemailer';
import SMTPTransport from "nodemailer/lib/smtp-transport";
import {Mail} from "nodemailer/lib/mailer";

const transport = nodemailer.createTransport({
    //service: process.env.MAIL_SERVICE,
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE,
    auth: {
        user: process.env.MAIL_USER,
        password: 'ylcvb-htibq-stwgl-tnwxm',
    }
} as SMTPTransport.Options)

type sendEmailDto = {
    sender: Mail.Address,
    receipients: Mail.Address[],
    subject: string;
    message: string;
}


export const  sendEmail = async (dto : sendEmailDto) => {
    const { sender, receipients, subject, message } = dto;
    console.log(process.env.MAIL_HOST);
    console.log(process.env.MAIL_PORT);
    console.log(process.env.MAIL_SECURE);
    console.log(process.env.MAIL_USER);
    console.log(process.env.MAIL_PASSWORD);
    console.log(sender);
    console.log(receipients);





    return await transport.sendMail({
        from: sender,
        to: receipients,
        subject: subject,
        html: message,
        text: message,
    })

}