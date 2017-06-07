var transporter = require('../mailer/mailTransporter');
var createMailData = require('../mailer/createMailData');
var sendReport = require('./sendReport');

module.exports = function(itemType, level, timespan, threshold, state, connection, hostname, duration) {
    return function (err, resp, body) {
        var avg = 0;
        body.result.forEach(function(object) {
            avg += parseFloat(object.value);
        });
        avg /= body.result.length
        avg = avg.toFixed(3);

        console.log("Item type: " + itemType + ", level: " + level + ", value: " + avg + ", status: " + (avg > threshold ? "PROBLEM!" : "OK"));

        var durationMilis = duration * 60 * 1000;

        if(level === "immediate") {
            var time = state.getCooldown(itemType);
            if(avg > threshold && time === 0) {
                state.setCooldown(itemType, Date.now());

                date = new Date();
                var html = "Average value of <b>" + itemType.toUpperCase() + "</b> calculated over a timespan of <b>" + timespan + "</b> mins is over threshold => <b>" + threshold + "</b> at <b>" + date + "</b>!!";
                sendReport(level, hostname, html);
            } else if (time != 0) {
                console.log("Notifications for " + itemType + " are currently on cooldown.");
                if((Date.now() - time) > durationMilis) {
                    state.setCooldown(itemType, 0);
                }
            }
        } else {
            if(!state.isActive(itemType, level) && avg > threshold) {
                state.setActive(itemType, level, true);
                state.setTimer(itemType, level, Date.now());
            } else if(state.isActive(itemType, level) && (avg < threshold || (Date.now() - state.getTimer(itemType, level)) > durationMilis)) {
                var diff = Math.round((Date.now() - state.getTimer(itemType, level)) / 1000 / 60);
                var from = new Date(state.getTimer(itemType, level));
                var to = new Date(Date.parse(from) + diff * 60 * 1000);

                state.setActive(itemType, level, false);
                state.setTimer(itemType, level, 0);

                connection.query('SELECT id FROM items WHERE name = ?', [itemType], function (error, results, fields) {
                    var itemID = results[0].id;
                    connection.query('SELECT id FROM levels WHERE name = ?', [level], function (error, results, fields){
                        var levelID = results[0].id;
                         connection.query('INSERT INTO samples VALUES (?, ?, ?, ?, ?, ?)', [itemID, levelID, timespan, threshold, from, to] , function (error, results, fields) {
                            if(error) {
                                console.log(error);
                            }
                            console.log("INSERT successfull!");
                         });
                    });
                }); 
            }
        }
    }
}
