var processItemHistory = require('./processItemHistory');

module.exports = function(itemType, data, state, connection, hostname) {
    return function (err, resp, body, zabbix) {
            var immediate = data[itemType].immediate;
            var daily = data[itemType].daily;
            var monthly = data[itemType].monthly;

            zabbix.getHistory(body.result[0].itemid, 0, immediate.timespan, processItemHistory(itemType, "immediate", immediate.timespan, immediate.threshold, state, connection, hostname, immediate.cooldown));
            zabbix.getHistory(body.result[0].itemid, 0, daily.timespan, processItemHistory(itemType, "daily", daily.timespan, daily.threshold, state, connection, hostname, daily.max_duration));
            zabbix.getHistory(body.result[0].itemid, 0, monthly.timespan, processItemHistory(itemType, "monthly", monthly.timespan, monthly.threshold, state, connection, hostname, monthly.max_duration));
    }
}
