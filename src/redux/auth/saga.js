// @flow
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { getAuth } from '../../helpers/restApi';
import { 
    LOGIN_USER
} from './constants';
import { getCrolGUID } from '../../helpers/authUtils';
import {
    loginUserSuccess,
    loginUserFailed
} from './actions';


/**
 * Login the user
 * @param {*} payload - username and password
 */
function* login( action ) {

    const guid = getCrolGUID();

    try {
        
        if( guid ) {
            const response = yield call( getAuth, guid );
            yield put( loginUserSuccess( response.data, action.payload ) );

        } else {
            yield put( loginUserFailed( 'No existe guid para este usuario' ) );
        }

    } catch ( error ) {
        yield put( loginUserFailed( error ) );
    }
}

export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, login);
}

function* authSaga() {
    yield all( 
        [
            fork( watchLoginUser )
        ]
    );
}

export default authSaga;
