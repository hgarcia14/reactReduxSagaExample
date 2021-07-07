import {
    SHOW_ALERT,
    HIDE_ALERT
} from './constants';

const INIT_STATE = {
    visible: false,
    title: '',
    message: '',
    color: 'primary'
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case SHOW_ALERT:
            return {
                ...state,
                visible: true,
                title: action.payload.title,
                message: action.payload.message,
                color: action.payload.color
            };
        case HIDE_ALERT:
            return {
                ...state,
                visible: false,
                title: '',
                message: '',
                color: 'primary'
            }
        default:
            return {
                ...state
            }
    }
}
