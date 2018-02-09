import test from 'ava';
import kapPluginTest from 'kap-plugin-test';

test(async t => {
	const plugin = kapPluginTest('test/fixtures/unicorn.gif');
	plugin.context.request.resolves({
		body: 'https://transfer.sh/oKoaz/unicorn.gif'
	});

	await plugin.run();

	t.is(plugin.context.request.lastCall.args[0], 'https://transfer.sh/' + plugin.context.defaultFileName);
	t.true(plugin.context.copyToClipboard.calledWith('https://transfer.sh/oKoaz/unicorn.gif'));
});
