import {
    WINDOW_FOCUS_REQUEST,
    WINDOW_FOCUS_SUCCESS,
    WINDOW_FOCUS_ERROR
} from './constants';

export const windowFocusRequest = () => ( {
    type: WINDOW_FOCUS_REQUEST
} );

export const windowFocusSuccess = ( response ) => ( {
    type: WINDOW_FOCUS_SUCCESS,
    payload: response
} );

export const windowFocusError = ( error ) => ( {
    type: WINDOW_FOCUS_ERROR,
    payload: error
} );