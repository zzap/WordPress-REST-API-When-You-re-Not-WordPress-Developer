/**
 * oAuth 2 client with jso.js
 *
 * https://github.com/andreassolberg/jso
 */

// Client settings.
var jso = new JSO({
	providerID:    'BWS2018',
	client_id:     '{CLIENT_KEY}',
	redirect_uri:  '{REDIRECTION_AFTER_LOGGING_IN}',
	authorization: '{AUTHORISATION_URL_PROVIDED_BY_WORDPRESS_PLUGIN}'
});

jso.callback();

// Watch click events on login/logout button.
$('#user-action').on( 'click', function() {
	if ( $(this).hasClass( 'login' ) ) {
		jso.getToken();

		$(this)
			.removeClass( 'login' )
			.addClass( 'logout' )
			.text( 'Log out' );

	} else {
		jso.wipeTokens();

		$(this)
			.removeClass( 'logout' )
			.addClass( 'login' )
			.text( 'Log in' );

		window.location.href = "/";
	}
});

// Check if token is stored and toggle form accordingly.
var bwsToken = localStorage.getItem( 'tokens-BWS2018' );

$('#new-post-form').hide();

if ( bwsToken == null ) {

	$('#new-post-form').hide();

} else {
	// Enable JSO wrapper for jQuery.
	JSO.enablejQuery($);

	$('#new-post-form').show();

	// Make sure login/logout button
	// has correct class and text.
	$('#user-action')
		.removeClass( 'login' )
		.addClass( 'logout' )
		.text( 'Log out' );
}