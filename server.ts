import express, { Request, Response } from 'express';
import nodemailer from 'nodemailer'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
const app = express();
app.use(express.json());
app.use(cors());;

app.post('/api/contact', async (req: Request, res: Response) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
           return res.status(500).json('Não é permitido formulários vázios')
        }

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          }  
        })

        await transporter.sendMail({
            from: email,
            to: "victorcordeirofp@gmail.com",
            subject: subject,
            text: `Nome:${name}\n E-mail: ${email}\n Messagem: ${message}`
        })
        res.sendStatus(200)
    } catch (error) {
        console.log('Erro ao enviar o e-mail:', error)
        res.status(500).json(error)    
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server open in process.env.PORT, ${process.env.PORT}`)
})
