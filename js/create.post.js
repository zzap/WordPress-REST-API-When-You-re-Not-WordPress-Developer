/**
 * Create post and send it to WordPress site.
 */
function createPost() {
	var postData = {
		"status": "publish",
		"title": $('input[name=post-title]').val(),
		"content": $('textarea[name=post-content]').val()
	};

	jso.ajax({
		dataType: 'json',
		url: 'https://bws2018.developerka.org/wp-json/wp/v2/posts/',
		method: 'POST',
		data: postData
	})
	.done(function(response) {
		console.table(response);
	})
	.fail(function() {
		console.error("Error.");
	});
}

// Trigger POST request on form submit.
$(document).on( 'submit', '#create-new-post', function(e) {
	e.preventDefault();
	createPost();
});