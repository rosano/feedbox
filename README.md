# feedbox

RSS Feed preview used on homepages for [Zero Data App](https://0data.app), [Hyperdraft](https://hyperdraft.rosano.ca) and others.

See [introducing feedbox](https://utopia.rosano.ca/introducing-osfeedbox/) for the motivation.

## Setup

```html
<!-- 1. include dependencies -->
<script src="https://pkg.rosano.ca/feedbox/master/main.js"></script>

<!-- 2. label a parent/container element -->
<div class="alfa-bravo-charlie"></div>

<!-- 3. call `load` -->
<script type="text/javascript">
feedbox.load({
	parent: document.querySelector('.alfa-bravo-charlie'),
	feed: 'https://rosano.ca/feed',
	limit: 10, // default: 5
});
</script>

<!-- optional: include extra styles -->
<script src="https://olsk.rosano.ca/OLSKDecor/master/ui-style.css"></script>
```

### Options

| param | type | notes | default |
| - | - | - | - |
| `limit` | integer | maximum item count | `5` |
| `hideBlurb` | boolean | ignores and hides `description` even if set | `false` |
| `prefixCORS` | string | URL prefix to avoid CORS issues. | `undefined` |

## Questions

Feel free to reach out on [Mastodon](https://rosano.ca/mastodon) or [Bluesky](https://rosano.ca/bluesky).
