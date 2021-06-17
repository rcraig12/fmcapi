global.fetch = require('node-fetch');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

var preferences = {};

const Connect = (options) => {

    // Check options

    if (!options.host){
        console.log('[FMCAPI: No host defined.');
    }

    if (!options.user){
        console.log('[FMCAPI: No user defined.');
    }

    if (!options.pass){
        console.log('[FMCAPI: No password defined.');
    }

    preferences = options;
    preferences.RefreshToken = 0;
    preferences.LoggedIn = false;

    GenerateToken();

}

const GenerateToken = async() => {

    authorizationValue = 'Basic ';
    authorizationValue += Buffer.from(preferences.user + ':' + preferences.pass, 'ascii').toString('base64');

    await fetch('https://' + preferences.host + '/api/fmc_platform/v1/auth/generatetoken', {

        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': authorizationValue
        }

    }).then( response => {
        
        if ( response.status === 204 ){

            preferences.TimeStamp = Math.floor( Date.now() / 1000 );
            preferences.TokenRefresh = 0;
            preferences.LoggedIn = true;
            preferences.headers = response.headers;

            console.log('[FMCClient] : Successfully logged in and recieved a X-auth-access-token');

        }

        if ( response.status === 500 ){

            console.log('[FMCClient] : Problem with authentication. Status code 500');

        }

    }).catch( error => {

        console.log('[FMCClient] : ' + error.message );

    });

}

const RefreshToken = async() => {
    
    await fetch('https://' + preferences.host + '/api/fmc_platform/v1/auth/refreshtoken', {

        method: 'POST',
        headers: preferences.headers

    }).then( response => {
        
        if ( response.status === 204 ){

            preferences.headers = response.headers;
            preferences.TimeStamp = Math.floor( Date.now() / 1000 );
            preferences.TokenRefresh++;

            console.log('[FMCClient] : Successfully refreshed the authentication tokens ' + preferences.TokenRefresh + ' times.');

        }

        if ( response.status === 500 ){

            console.log('[FMCClient] : Tokens expired.');

        }

    }).catch( error => {

        console.log('[FMCClient] : ' + error.message );

    });

}

const CheckAuth = () => {

    if ( preferences.LoggedIn === false || preferences.LoggedIn === undefined ){

        console.log('[FMCClient] : Not logged in - Authenticating now');
        
        Connect({
            user: process.env.FMC_USER,
            pass: process.env.FMC_PASS,
            host: process.env.FMC_HOST,
        });

    } 

    else if ( preferences.LoggedIn === true ) {

        var timeNow = Math.floor( Date.now() / 1000 );
        var secondsSinceLastRefresh = timeNow - preferences.TimeStamp;

        console.log('[FMCClient] : ' + secondsSinceLastRefresh + ' seconds since last timestamp.');

        if ( secondsSinceLastRefresh > 1800 && preferences.TokenRefresh <= 3 ) {

            if ( preferences.TokenRefresh > 2 ){

                console.log('[FMCClient] : Token expired and there have been more than 3 refreshes so generating a new token.');
                GenerateToken()
 
            } else {

                console.log('[FMCClient] : Token expired refreshing now.');
                RefreshToken();

            }
            

        } else {

            console.log('[FMCClient] : Token is still valid as the timer is under 1800 seconds');

        }

    }

    return preferences;

}


module.exports = {
    CheckAuth
}