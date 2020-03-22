import { sendEmail, mailOptions } from './config';



export const sendEmailVerificationLink = (req, user, token) => {

    let link="http://"+req.headers.host+"/verify/"+token;

    const subject = 'Verify Email address';

    const text = `Hi ${user.firstName} `;

    let html = `<p>Hi ${user.firstName}<p><br><p>Please click on the following <a href="${link}">link</a> to verify your account.</p> 
                  <br><p>If you did not request this, please ignore this email.</p>`;
    sendEmailWithOptions('"Kashyap Team" <care.kashyap@gmail.com>', user.local.email, subject, text, html);
};

export const sendEmailWithOptions = (from,to,subject,text,html) => {
    const options = mailOptions(from, to, subject, text , html);
    sendEmail(options);
};