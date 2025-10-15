const kDefaultPath = 'file://' + __dirname + '/ui-test-view.html';

describe('feedbox_Localize', function () {

	before(function() {
		return OSVisit(kDefaultPath, {
			items: JSON.stringify([uItem()]),
		});
	});

	it('localizes feedbox-heading', function () {
		return browser.assert.text(feedbox-heading, 'Latest updates');
	});

	it('localizes feedbox-button', function() {
		return browser.assert.attribute(feedbox-button, 'title', 'Feed');
	});

});