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
    to: "ze.pedro.rodrigues@gmail.com, fr.mariamelo@gmail.com",
    subject: "Crawler - New houses found",
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
            mail.html = mailer.buildHTML(houseItems);
            smtpTransport.sendMail(mail, function(error, response){
                if(error){
                    console.log('sendMail ERROR', error);
                    smtpTransport.close();
                    return false;
                }

                console.log(`Debug-> Message sent: ${response.message} to ${mail.to}`);
                smtpTransport.close();
                let houseUUIDs = [];
                houseItems.forEach(element => {
                    houseUUIDs.push(element.house_uuid);
                });
                return dbase.markItemsProcessed(houseUUIDs);
              
            });
            return true
        })
}

/* Builds the HTML email contente, based on the JSON that contains each ad */
mailer.buildHTML = function(aJson){
    let str = `
            
    <h2>House Crawler - by Wymanrag</h2>

    <table style="width:100%">
      <tr>
        <th>Image</th>
        <th>Origin</th>
        <th>Price</th> 
        <th>Title</th> 
        <th>City</th> 
        <th>Area</th> 
      </tr>`;

    let content = aJson.reduce(function(acum, curr){
        let price = (Number(curr.price.replace(/[^0-9.-]+/g,""))/1000).toFixed(0);
        return acum + `<tr><td><a href="${curr.link}"><img src="${curr.image}" height=50 width=50"></img></a><td>` + curr.origin + '</td><td>' + price + 'm€</td><td>' + curr.title + '</td><td>' +curr.city +'</td><td>' +curr.area + '</td></tr>'
    }, '')
    
    str += content + '</table>';
    return str;
} 

module.exports = mailer;
