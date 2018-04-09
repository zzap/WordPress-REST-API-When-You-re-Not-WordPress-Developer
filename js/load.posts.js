/**
 * Get posts from WordPress site
 */
/**
 * Build response
 *
 * Remove placeholder code, loop through returned
 * response object, prepare markup and append each
 * item to the list.
 */
function buildResponse(response) {
	$('.site-content-list').empty().append('<ul class="entries-list"></ul>');

	for ( var i = 0; i < response.length; i++ ) {
		var date = new Date(response[i].date);

		// Check for featured media presence.
		var image_array = response[i]._embedded['wp:featuredmedia'];
		// Define image markup only if featured media exists,
		// so that we avoid breaking the loop.
		var image = '';
		if ( typeof image_array !== 'undefined' && image_array.length > 0 ) {
			image =
				'<div class="entry-image">' +
					'<img src="' + response[i]._embedded['wp:featuredmedia'][0].source_url + '" alt="">' +
				'</div>';
		}

		var postItem =
			'<li class="entry">' +
				image +
				'<div class="entry-header">' +
					'<h2 class="entry-title">' +
						'<a href="' + response[i].link + '">' + response[i].title.rendered + '</a>' +
					'</h2>' +
					'<p class="entry-meta">' +
						'Published on <strong>' + date.toDateString() + '</strong> ' +
						'Author: <strong>' + response[i]._embedded.author[0].name + '</strong> ' +
					'</p>' +
				'</div>' +
				'<div class="entry-content">' +
					'<p>' + response[i].excerpt.rendered + '</p>' +
					'<a href="' + response[i].link + '">Read article</a>' +
				'</div>' +
			'</li>';

		$('.entries-list').append(postItem);
	}
}
/**
 * Get posts
 *
 * Simple AJAX call for getting the posts
 * from WordPress site.
 */
function getPosts() {
	$.ajax({
		dataType: 'json',
		url: 'http://bws2018.developerka.org/wp-json/wp/v2/posts/?_embed=true'
	})
	.done(function(response) {
		buildResponse(response);
	})
	.fail(function() {
		console.log('Error: Nothing found.');
	});
}
// Send request.
getPosts();