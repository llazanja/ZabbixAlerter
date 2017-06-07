var sendReport = require('../util/sendReport');

module.exports = function(hostname, connection, level) {
    return function() {
        connection.query('SELECT samples.item_id, samples.level_id AS levelID, items.name AS itemType, samples.timespan, samples.threshold, samples.begining, samples.ending FROM items JOIN samples ON items.id = samples.item_id JOIN levels ON levels.id = samples.level_id WHERE levels.name = ?;', [level], function (error, results, fields) {
            if (error) console.log(error);

            if(results.length !== 0) {
                var html = "";
                var levelID = results[0].levelID;
                results.forEach(function(result) {
                    html += "Average value of <b>" + result.itemType + "</b> calculated over a timespan of <b>" + result.timespan +
                    "</b> mins is over threshold => <b>" + result.threshold + "</b> from <b>" + result.begining + "</b> to <b>" + result.ending +"</b>!!<br>"
                });

                sendReport(level, hostname, html);

                connection.query('DELETE FROM samples WHERE level_id = ?;', [levelID], function (error, results, fields) {
                     if (error) console.log(error);
                     console.log("DELETE successfull!");
                });
            } else {
                sendReport(level, hostname, "Nothing to report, everything is working well. :)");
            }
        });
    }
}
