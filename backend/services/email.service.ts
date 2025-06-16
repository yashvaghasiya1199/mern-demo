const nodemailer = require("nodemailer");

async function emailService (email:string,otp:string) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    (async () => {
        const info = await transporter.sendMail({
            from: '<vy.hmr@gmail.com>',
            to: email,
            subject: "Hello ✔",
            text: "Hello user",
            html: `<div style="font-family: Arial, sans-serif; background-color: #F4F4F4; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background-color: #FFFFFF; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <div style="padding: 20px; text-align: center; background-color: #4A90E2; color: white;">
          <h1 style="margin: 0;">Your OTP Code</h1>
        </div>
        <div style="padding: 30px; text-align: center;">
          <p style="font-size: 16px; color: #333;">Use the following One-Time Password (OTP) to complete your login. The code is valid for 10 minutes.</p>
          <div style="margin: 20px 0; font-size: 28px; font-weight: bold; letter-spacing: 4px; color: #4A90E2;">
            ${otp}
          </div>
          <p style="font-size: 14px; color: #999;">If you didn’t request this code, please ignore this email.</p>
        </div>
        <div style="padding: 20px; text-align: center; background-color: #F4F4F4; font-size: 12px; color: #777;">
          &copy; ${new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </div>`,

        });

        console.log("Message sent:", info.messageId);
    })();
}


module.exports = {
    emailService,
}