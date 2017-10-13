var schedule = require('node-schedule');
var sendReport = require('../util/sendReport');
var checkData = require('./checkData');

module.exports = function(hostname, connection) {
    return function(err, data) {
        data = JSON.parse(data);

        // schedule daily reports
        var rule = new schedule.RecurrenceRule();
        rule.dayOfWeek = [new schedule.Range(0,6)]; // report has to be sent every day
        rule.hour = data.daily.hour;
        rule.minute = data.daily.minute;
        rule.second = data.daily.second;
        schedule.scheduleJob(rule, checkData(hostname, connection, "daily"));

        // schedule monthly reports
        rule = new schedule.RecurrenceRule();
        rule.dayOfMonth = data.monthly.dayOfMonth;
        rule.month = [new schedule.Range(0, 11)]; // report has to be sen every month
        rule.hour = data.monthly.hour;
        rule.minute = data.monthly.minute;
        rule.second = data.monthly.second;
        schedule.scheduleJob(rule, checkData(hostname, connection, "monthly"));
    }
}
