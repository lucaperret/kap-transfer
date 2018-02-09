'use strict';
const {createReadStream} = require('fs');

const action = async context => {
	const uploadEndpoint = 'https://transfer.sh/' + context.defaultFileName;
	const filePath = await context.filePath();

	context.setProgress('Uploading…');
	const response = await context.request(uploadEndpoint, {
		method: 'put',
		body: createReadStream(filePath)
	});

	context.copyToClipboard(response.body);
	context.notify('URL to the file has been copied to the clipboard');
};

const transfer = {
	title: 'Share on Transfer',
	formats: ['gif', 'mp4', 'webm', 'apng'],
	action,
	config: {}
};

exports.shareServices = [transfer];
