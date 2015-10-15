(function () {
	'use strict';
	document.getElementById('maxWindowBtn').addEventListener('click', (event) => {
		const remote = require('remote');
		const window = remote.getCurrentWindow();
		const icon = event.currentTarget.children[0];
		if (window.isMaximized()) {
			icon.removeAttribute('class');
			icon.setAttribute('class', 'icon icon-resize-full');
			window.unmaximize();
		} else {
			icon.removeAttribute('class');
			icon.setAttribute('class', 'icon icon-resize-small');
			window.maximize();
		}
	});
	document.getElementById('minWindowBtn').addEventListener('click', (event) => {
		const remote = require('remote');
		const window = remote.getCurrentWindow();
		window.minimize();
	});
	document.getElementById('closeWindowBtn').addEventListener('click', () => {
		const remote = require('remote');
		const window = remote.getCurrentWindow();
		window.close();
	});
	document.getElementById('aboutWindowBtn').addEventListener('click', () => {
		 sweetalert({
			 title: 'About',
			 text: 'DNS Tester is an electron app developed by David Swenson to start learning the electron API.',
			 type: 'info'
		 });
	});
})();