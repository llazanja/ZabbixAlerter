var processItemId = require('./processItemId');
var fs = require('fs');
var mysql = require('mysql');
var State = require('./monitoringState');
var processSchedule = require('../scheduler/processSchedule');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'username',
  password : 'password',
  database : 'database name'
});

connection.connect();

module.exports = function(zabbix) { 
	return function(err, data) {
		data = JSON.parse(data);
		var state = new State();

		console.log("Begining to monitor server " + data.hostname + " every " + data.update_interval * 60 + " secs.");

		 connection.query('SELECT * FROM items;', function (error, results, fields) {
			 if(error) console.log(error);

			 if(results.length !== 0) {
				 results.forEach(function(result) {
					 state.addItemType(result.name);
					 setInterval(function() {
						zabbix.processItem(data.hostname, result.item_key, processItemId(result.name, data, state, connection, data.hostname));
					 }, data.update_interval * 60 * 1000); 
				 });
			 }
		 });

		// read configuration file which contains information about scheduled reports
		fs.readFile('./config/schedule.json', 'utf8', processSchedule(data.hostname, connection));
	}
}
