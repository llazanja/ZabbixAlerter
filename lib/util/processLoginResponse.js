var fs = require('fs');
var processMonitoringConfig = require('./processMonitoringConfig');

module.exports = function (err, resp, body, zabbix) {
    if(err) console.log(err);

    // if there was no errors, we are now logged in and able to use ZABBIX API :)

    // read configuration file which contains information about monitoring settings required to use ZABBIX API methods and schedule tasks
    fs.readFile('./config/monitoringConfig.json', 'utf8', processMonitoringConfig(zabbix));
}
