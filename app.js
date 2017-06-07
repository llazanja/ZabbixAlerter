var processAPIConfig = require('./lib/util/processAPIConfig');
var fs = require('fs');

// read configuration file which contains information required to connect with ZABBIX API
fs.readFile('./config/APIconfig.json', 'utf8', processAPIConfig);
