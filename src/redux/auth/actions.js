// @flow
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGIN_USER_IMAGE_SUCCESS,
    LOGIN_USER_IMAGE_ERROR
} from './constants';


export const loginUser = ( url ) => ({
    type: LOGIN_USER,
    payload: url
});

export const loginUserSuccess = ( response, url ) => ({
    type: LOGIN_USER_SUCCESS,
    payload: response,
    url: url
});

export const loginUserFailed = ( error ) => ({
    type: LOGIN_USER_FAILED,
    payload: error
});

export const setUserImageSuccess = ( response ) => ( {
    type: LOGIN_USER_IMAGE_SUCCESS,
    payload: response
} );

export const setUserImageError = ( response ) => ( {
    type: LOGIN_USER_IMAGE_ERROR,
    payload: response
} );