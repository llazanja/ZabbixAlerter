// setup email data with unicode symbols
module.exports = function(fromStr, toStr, subjectStr, textStr, htmlStr) {
    return {
        from: fromStr, // sender address
        to: toStr, // list of receivers
        subject: subjectStr, // Subject line
        text: textStr, // plain text body
        html: htmlStr // html body
    };
}
