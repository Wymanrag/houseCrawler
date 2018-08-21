const nodemailer = require("nodemailer");

let mailer = {}; 

// Use Smtp Protocol to send Email
const smtpTransport = nodemailer.createTransport({
    host: "smtp.gmail.com", // TODO --> change to oAuth 
    auth: {
        user: config.mail.user,
        pass: config.mail.password
    }
});

const mail = {
    from: `House Crawler <${config.mail.user}>`,
    to: "ze.pedro.rodrigues@gmail.com",
    subject: "Send Email Using Node.js",
    text: "Node.js New world for me",
    html: "<b>Node.js New world for me</b>"
}

mailer.send = function(){
    console.log('------>Credentials',config.mail.user)
    smtpTransport.sendMail(mail, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }
    
        smtpTransport.close();
    });
}

module.exports = mailer;
