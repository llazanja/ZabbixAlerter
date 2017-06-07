CREATE TABLE items (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name CHAR (100) NOT NULL UNIQUE,
	item_key CHAR(100) NOT NULL UNIQUE);
	
CREATE TABLE levels (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name CHAR (50) NOT NULL UNIQUE);
	
CREATE TABLE samples (
	item_id INT NOT NULL, level_id INT NOT NULL,
	timespan INT NOT NULL,
	threshold INT NOT NULL,
	begining DATETIME NOT NULL,
	ending DATETIME NOT NULL,
	CONSTRAINT fk_sample 
		FOREIGN KEY (item_id) REFERENCES items(id), 
		FOREIGN KEY (level_id) REFERENCES levels(id));
 
INSERT INTO items VALUES
(null, 'used disk space on /', 'vfs.fs.size[/,pused]'),
(null, 'used disk space on /home', 'vfs.fs.size[/home,pused]'),
(null, 'disk read on /', 'vfs.dev.read[/dev/mapper/centos_minerva-root,sps,avg1]'),
(null, 'disk read on /home', 'vfs.dev.read[/dev/mapper/centos_minerva-home,sps,avg1]'),
(null, 'disk write on /', 'vfs.dev.write[/dev/mapper/centos_minerva-root,sps,avg1]'),
(null, 'disk write on /home', 'vfs.dev.write[/dev/mapper/centos_minerva-home,sps,avg1]'),
(null, 'CPU user time', 'system.cpu.util[,user]'),
(null, 'used memory', 'vm.memory.size[pused]');

INSERT INTO levels VALUES
(null, 'daily'),
(null, 'monthly');