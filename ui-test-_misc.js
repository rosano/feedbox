const kDefaultPath = 'file://' + __dirname + '/ui-test-view.html';

describe('feedbox_Misc', function () {

	const feed = Math.random().toString();
	const item = uItem();

	before(function() {
		return OSVisit(kDefaultPath, {
			feed,
			items: JSON.stringify([item]),
		});
	});

	describe('feedbox-button', function test_feedbox-button () {

		it('sets href', function () {
			return browser.assert.attribute(feedbox-button, 'href', feed);
		});

	});

	describe('feedbox-list-item', function test_feedbox-list-item () {

		it('sets text', function () {
			return browser.assert.text(feedbox-list-item, item.title);
		});

		it('sets href', function () {
			return browser.assert.attribute(feedbox-list-item, 'href', item.link);
		});
		
	});

});
