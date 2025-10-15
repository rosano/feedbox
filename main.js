(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
			(factory((global.feedbox = global.feedbox || {})));
}(this, (function(exports) { 'use strict';

	const mod = {

		// COMMAND

		_goLoad (input) {
			class feedboxInstance {

				constructor (params) {
					Object.assign(this, {
						limit: 5,
					}, params, mod);
				}

			}

			const instance = new feedboxInstance(input);
			instance.DOMContentLoaded();
		},

		goLoad: (input) => window.document.addEventListener('DOMContentLoaded', () => mod._goLoad(input)),

		_loadROCO (e) {
			mod._goLoad({
				parent: e.insertAdjacentElement('afterend', document.createElement('div')) ,
				prefixCORS: 'https://cors.rosano.ca/',
				feed: 'https://rosano.ca/blog/feed',
			});
		},

		goLoadROCO () {
			window.document.addEventListener('DOMContentLoaded', () => Array.from(document.querySelectorAll('[data-feedbox]')).forEach(mod._loadROCO));
		},

		async _fetch (input, _debug) {
			const _window = _debug || window;

			return await (await _window.fetch((this.prefixCORS || '') + input)).text();
		},

		_items (input) {
			const output = [];

			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(input, 'text/xml');
			const xPathResult = xmlDoc.evaluate('/rss/channel/item', xmlDoc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
			
			let node = xPathResult.iterateNext();
			for (let i = 0; (i < this.limit) && node; i++) {
				output.push({
					title: node.getElementsByTagName('title')[0].textContent,
					link: node.getElementsByTagName('link')[0].textContent,
					description: node.getElementsByTagName('description')[0].textContent,
					pubDate: new Date(node.getElementsByTagName('pubDate')[0].textContent),
				});

				node = xPathResult.iterateNext();
			}
			
			return output;
		},

		_populate (input) {
			this.parent.innerHTML = `
<div class="feedbox">
<h2>
	<span class="feedbox-heading">Latest updates</span>
	<sup><a class="feedbox-button" href="${ this.feed }" title="Feed">(feed)</a></sup>
</h2>
<div class="feedbox-list">
	${ input.map( (e, i) => `
		<a class="feedbox-list-item" href="${ e.link }" target="_blank">${ e.title }</a>`
		 + (!e.description || this.hideBlurb ? '' : `<p class="feedbox-list-item-blurb">${ e.description }</p>`)
		 + (i === input.length - 1 ? '' : `<hr/>`)
	 ).join('') }
</div></div>
<style>
.feedbox {
	--foreground: #733132;
	--spacing: 10px;

	padding: var(--spacing);
	border: 1px solid #f3e5e5;
	border-radius: 5px;

	margin: 80px 0;

	background: #fffff1;
	font-family: Lucida Grande, "Arial", sans-serif;
}

.feedbox * {
	color: var(--foreground);	 
}

.feedbox h2 {
	font-family: "Helvetica Neue";
}

.feedbox sup {
	font-weight: lighter;
	font-size: 70%;
}

.feedbox sup a {
	margin: unset;
}

.feedbox hr  {
	background: var(--foreground);
	border-width: 0.5px;
	margin: var(--spacing) 0;
	opacity: 0.3;
}

.feedbox-list a {
	display: block;
	width: 90%;

	margin-bottom: 2px;

	font-size: 90%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	text-decoration: none;
}

.feedbox-list p {
	margin: 0;

	font-size: 85%;
	opacity: 0.6;
}
</style>`;
		},

		// MESSAGE

		async DOMContentLoaded () {
			return this._populate(this.items || this._items(await this._fetch(this.feed)))
		},

	};

	if (typeof window === 'object') {
		mod.goLoadROCO();
	}

	Object.assign(exports, mod, {
		load: mod.goLoad,
		_loadROCO: mod._loadROCO,
	});

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

})));
