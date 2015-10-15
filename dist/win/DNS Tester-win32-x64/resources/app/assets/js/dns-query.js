(function () {
	'use strict';
	const ipc = require('ipc');
	const recieveDNS = (payload) => {
		var data = JSON.parse(payload);
		var entry = document.createElement('tr');
		var hostname = document.createElement('td');
		var address = document.createElement('td');
		var family = document.createElement('td');
		hostname.appendChild(document.createTextNode(data.hostname));
		address.appendChild(document.createTextNode(data.address));
		family.appendChild(document.createTextNode('IPv' + data.family));
		entry.appendChild(hostname);
		entry.appendChild(address);
		entry.appendChild(family);
		document.getElementById('table-body').appendChild(entry);
	};
	const sendDNS = (event) => {
		event.preventDefault();
		let hostname = document.getElementById('hostname').value;
		console.log(hostname);
		ipc.send('DNSQuery', hostname);
	};
	document.getElementById('hostname').addEventListener('keydown', (event) => {
		if (event.keyCode == 13)
		{
			sendDNS(event);
		}
	});
	document.getElementById('queryBtn').addEventListener('click', sendDNS);
	ipc.on('DNSReply', recieveDNS);
})();