
import nodemailer from "nodemailer"
import { IMailAdapter, SendMailData } from "../mail-adapter"

import "dotenv/config"
import { env } from "../../../config/env"
import { OAuth2Client } from "google-auth-library"


const REDIRECT_URI = env.EMAIL_REDIRECT_URI
const REFRESH_TOKEN = env.EMAIL_REFRESH_TOKEN
const CLIENT_ID = env.EMAIL
const CLIENT_SECRET = env.EMAIL_PASSWORD

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });


export class NodemailerMailAdapter implements IMailAdapter {

  

  async sendMail({ subject, body, user_email }: SendMailData) {
    
    try {

      const accessToken = await oAuth2Client.getAccessToken();

      const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL, alternative is port 587 with secure:false
        auth: {
          type: 'OAuth2',
          user: 'firespreadpa@gmail.com',
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken.token,
        }
      });
      
      
      await transport.sendMail({
        from: "Fire Spread <fireSpreadpa@gmail.com>",
        to: user_email,
        subject: subject,
        html: body,
      })
    } catch (error) {
      console.log(error)
      throw new Error("Error sending email")
    }
  }
}