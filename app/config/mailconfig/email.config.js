const nodemailer=require('nodemailer');

const sendEmail=async (prosses)=>{
    const transporter=nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "a5737f19ed08ca",
          pass: "7b95f471b5c451"
        }
      });
    const mailoption={
        from:'darshit <hellow@darshit.io>',
        to:prosses.email,
        subject:prosses.subject,
        text:prosses.message
    };
    await transporter.sendMail(mailoption);
};
module.exports=sendEmail;