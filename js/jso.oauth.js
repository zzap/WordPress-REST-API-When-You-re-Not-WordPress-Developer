/**
 * oAuth 2 client with jso.js
 *
 * https://github.com/andreassolberg/jso
 */

var jso = new JSO({
	providerID:    '{PROVIDER_ID}',
	client_id:     '{CLIENT_KEY}',
	redirect_uri:  '{REDIRECTION_AFTER_LOGGING_IN}',
	authorization: '{AUTHORISATION_URL_PROVIDED_BY_WORDPRESS_PLUGIN}'
});

jso.callback();

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