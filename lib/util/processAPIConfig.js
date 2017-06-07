var Zabbix = require('../zabbix/zabbix');
var processLoginResponse = require('./processLoginResponse');

module.exports = function(err, data) {
	if(err) {
		console.log(error);
	}

	data = JSON.parse(data);
	var zabbix = new Zabbix('http://' + data.host + '/zabbix/api_jsonrpc.php', data.username, data.password);

	zabbix.login(processLoginResponse);
};
