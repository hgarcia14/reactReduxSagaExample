// @flow
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
} from './constants';
import jwtDecode from 'jwt-decode';

import { getLoggedInUser, setSession } from '../../helpers/authUtils';

const INIT_STATE = {
    user: getLoggedInUser(),
    userInfo: getLoggedInUser() ? jwtDecode( getLoggedInUser() ) : null,
    loading: false,
    error: null
};


const Auth = (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loading: true };
        case LOGIN_USER_SUCCESS:
            setSession( action.payload.token, action.url )
            return { ...state, user: action.payload.token, loading: false, error: null };
        case LOGIN_USER_FAILED:
            setSession( null )
            return { ...state, error: action.payload, loading: false };
        default:
            return { ...state };
    }
};

export default Auth;
