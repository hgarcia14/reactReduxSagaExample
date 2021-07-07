import {
    SHOW_ALERT,
    HIDE_ALERT
} from './constants';

export const showAlert = ( title, message, color ) => ( {
    type: SHOW_ALERT,
    payload: { title: title, message: message, color: color }
} );

export const hideAlert = () => ( {
    type: HIDE_ALERT
} );