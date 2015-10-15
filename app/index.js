'use strict';

const app = require('app');
const BrowserWindow = require('browser-window');
const ipc = require('ipc');
const dns = require('dns');
const dialog = require('dialog');
const NativeImage = require('native-image');
require('crash-reporter').start();

let main;

let createMainWindow = () => {
	const window = new BrowserWindow({
		'use-content-size': true,
		'icon': NativeImage.createFromPath(__dirname + '/icon.ico'),
		'frame': false
	});
	window.loadUrl('file://' + __dirname + '/index.html');
	window.on('closed', () => {
		main = null;
	});
	return window;
};

app.on('ready', () => {
	main = createMainWindow();
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate-with-no-open-windows', () => {
	if (!main) {
		main = createMainWindow();
	}
});

ipc.on('DNSQuery', (event, hostname) => {
	dns.lookup(hostname, (err, address, family) => {
		if (err) {
			dialog.showErrorBox('DNS Query Failed', 'Failed to find the host ' + err.hostname);
			return;
		}
		var payload = {
			hostname: hostname,
			address: address,
			family: family
		};
		event.sender.send('DNSReply', JSON.stringify(payload));
	});
});