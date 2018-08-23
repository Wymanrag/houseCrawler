const nodemailer = require("nodemailer");
const dbase = require('./dbase')

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
    html: "<b>New world for me</b>"
}

mailer.send = function(){
    let houseItems;
    return dbase.getUnprocessedHouses()
        .then(function(houses){
            console.log('Debug-> Going to send mail')            
            if(!houses.length){
                console.log('Debug-> NO HOUSES TO PROCESS')
                return false;
            }
            houseItems = houses;
            let mailSent;
            mail.text += JSON.stringify(houseItems[1]);
            //console.log('HOUUUSSSSEEEESSS', mail.text)
            mail.html = mailer.buildHTML(houseItems);
            smtpTransport.sendMail(mail, function(error, response){
                if(error){
                    console.log(error);
                    smtpTransport.close();
                    return false;
                }

                console.log(`Debug-> Message sent: ${response.message} to ${mail.to}`);
                smtpTransport.close();
                let houseUUIDs = [];
                houseItems.forEach(element => {
                    houseUUIDs.push(element.house_uuid);
                });
                console.log('houseUUIDs', houseUUIDs)
                return dbase.markItemsProcessed(houseUUIDs);
              
            });
            return true
        })
}

mailer.buildHTML = function(aJson){
    let str = `
            
    <h2>House Crawler</h2>

    <table style="width:100%">
      <tr>
        <th>Origin</th>
        <th>Price</th> 
        <th>Link</th>
      </tr>`;

    let content = aJson.reduce(function(acum, curr){
        return acum + '<tr><td>' + curr.origin + '</td><td>' + curr.price + '</td><td>' + curr.link + '</td></tr>'
    }, '')
    
    str += content + '</table>';
    //console.log('HHHHHHHH', str)
    return str;
} 

module.exports = mailer;
