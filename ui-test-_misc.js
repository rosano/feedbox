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

	describe('feedboxButton', function test_feedboxButton () {

		it('sets href', function () {
			return browser.assert.attribute(feedboxButton, 'href', feed);
		});

	});

	describe('feedboxListItem', function test_feedboxListItem () {

		it('sets text', function () {
			return browser.assert.text(feedboxListItem, item.title);
		});

		it('sets href', function () {
			return browser.assert.attribute(feedboxListItem, 'href', item.link);
		});
		
	});

});
