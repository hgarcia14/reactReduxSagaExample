// @flow
import jwtDecode from 'jwt-decode';
import tokenAuth from './tokenAuth';

/**
 * Checks if user is authenticated
 */
const isUserAuthenticated = () => {

    const urlencuesta = window.location.pathname;

    if( urlencuesta.includes( 'friesgo' ) || urlencuesta.includes( 'severo' ) || urlencuesta.includes( 'organizacion' ) ){
        return true;
    } else {
        const user = getLoggedInUser();
        if (!user) {
            return false;
        }
        const decoded = jwtDecode( user );
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            //console.log('access token expired');
            return false;
        } else {
            return true;
        }
    }
};

/**
 * Returns the logged in user
 */
const getLoggedInUser = () => {

    if( !getCrolGUID() ) {
        localStorage.removeItem( 'usr.id' );
    }

    const user = localStorage.getItem( 'usr.id' );
    if( user ){
        tokenAuth( user );
    }
    
    return user ? user : null;
};

/**
 * Returns saved guid
 */

 const getCrolGUID = () => {

    const guid = localStorage.getItem( 'crolGUID' );

    return guid ? guid : null;

 }

 const windowVerify = ( id ) => {

    if( isUserAuthenticated() ){
        const data = jwtDecode( getLoggedInUser() );

        if( Number( id ) !== Number( data.organizacionId ) ){
            localStorage.removeItem( 'usr.id' );
            window.location.reload();
        }
    }

 }

/**
 * Set session
 */
const setSession = ( data, url ) => {
    if( data ) {
        localStorage.setItem( 'usr.id', data );
        tokenAuth( data );

        if( url.length > 0 ) {
            window.location.pathname = url;
        }
        
    } else {
        localStorage.removeItem( 'usr.id' );
    }
}

export { isUserAuthenticated, getLoggedInUser, getCrolGUID, setSession, windowVerify };
