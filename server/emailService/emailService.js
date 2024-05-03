import { Resend } from 'resend';
import "dotenv/config";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(email) {
  const { data, error } = await resend.emails.send({
    from: 'welcomemail@mathiaskaae.dk',
    to: email,
    subject: 'Welcome Mail',
    html: '<p>Welcome</p>'
  });

  if (error) {
    return console.log(error);
  }  
  console.log(data);
}