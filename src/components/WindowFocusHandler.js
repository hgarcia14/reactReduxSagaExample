import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../redux/windowFocus/actions';
import { isUserAuthenticated } from '../helpers/authUtils';

const WindowFocusHandler = () => {

    const dispatch = useDispatch();

    const onFocus = () => {

        if( isUserAuthenticated() ) {
            dispatch( actions.windowFocusRequest() );
        }
        
    }

    useEffect( () => {

        window.addEventListener( 'focus', onFocus );

        return () => {
            window.removeEventListener( 'focus', onFocus );
        }

    // eslint-disable-next-line
    },[] );

    return ( 
        <></>
     );
}
 
export default WindowFocusHandler;