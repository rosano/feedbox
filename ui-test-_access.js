const kDefaultPath = 'file://' + __dirname + '/ui-test-view.html';

Object.entries({
	feedbox: '.feedbox',

	feedbox-heading: '.feedbox-heading',

	feedbox-button: '.feedbox-button',

	feedbox-list: '.feedbox-list',
	feedbox-list-item: '.feedbox-list-item',
	feedbox-list-item-blurb: '.feedbox-list-item-blurb',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('feedbox_Access', function () {
	
	const items = Array.from(Array(uRandomInt(10))).map(function () {
		return uItem({
			description: null,
		});
	});

	before(function() {
		return OSVisit(kDefaultPath, {
			items: JSON.stringify(items),
		});
	});

	it('shows feedbox', function () {
		return browser.assert.elements(feedbox, 1);
	});

	it('shows feedbox-heading', function () {
		return browser.assert.elements(feedbox-heading, 1);
	});

	it('shows feedbox-button', function () {
		return browser.assert.elements(feedbox-button, 1);
	});

	it('shows feedbox-list', function () {
		return browser.assert.elements(feedbox-list, 1);
	});

	it('shows feedbox-list-item', function () {
		return browser.assert.elements(feedbox-list-item, items.length);
	});

	it('hides feedbox-list-item-blurb', function () {
		return browser.assert.elements(feedbox-list-item-blurb, 0);
	});

	context('hasBlurb', function () {
		
		const items = Array.from(Array(uRandomInt(10))).map(uItem);

		before(function() {
			return OSVisit(kDefaultPath, {
				items: JSON.stringify(items),
			});
		});

		it('shows feedbox-list-item-blurb', function () {
			return browser.assert.elements(feedbox-list-item-blurb, items.length);
		});
	
	});

	context('hideBlurb', function () {
		
		const items = Array.from(Array(uRandomInt(10))).map(uItem);

		before(function() {
			return OSVisit(kDefaultPath, {
				items: JSON.stringify(items),
				hideBlurb: true,
			});
		});

		it('hides feedbox-list-item-blurb', function () {
			return browser.assert.elements(feedbox-list-item-blurb, 0);
		});
	
	});

});
