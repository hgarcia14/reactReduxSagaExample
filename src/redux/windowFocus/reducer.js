import {
    WINDOW_FOCUS_SUCCESS,
    WINDOW_FOCUS_ERROR
} from './constants';
import { windowVerify } from '../../helpers/authUtils';

const INIT_STATE = {
    id: null,
    error: null
}

const WindowFocus = (state = INIT_STATE, action) => {
    switch (action.type) {
        case WINDOW_FOCUS_SUCCESS:
            windowVerify( action.payload.empresaId );
            return { ...state, id: action.payload.empresaId };
        case WINDOW_FOCUS_ERROR:
            return { ...state, id: null, error: action.payload };
        default:
            return { ...state };
    }
};

export default WindowFocus;