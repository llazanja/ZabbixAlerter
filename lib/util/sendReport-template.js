var createMailData = require('../mailer/createMailData');
var transporter = require('../mailer/mailTransporter');

module.exports = function(level, hostname, html) {
    mailOptions = createMailData(
        "FROM e-mail adress",
        "TO e-mail adress",
        level.toUpperCase() + " report about monitoring " + hostname,
        "",
        html
    );

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });  
}
