import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'reactstrap';
import * as actions from '../../redux/alertas/actions';

const Alertas = () => {

    const dispatch = useDispatch();

    const alerta = useSelector( state => state.Alertas );

    useEffect( () => {

        if( alerta ){
            if( alerta.visible ){

                setTimeout( () => {

                    dispatch( actions.hideAlert() );

                }, 3000 );

            }
        }

        // eslint-disable-next-line
    },[alerta] );

    return ( 
        <Alert color={ alerta ? alerta.color : 'primary' }
            isOpen={ alerta ? alerta.visible : false }
            style={{zIndex:'9999', position: 'fixed', top: '10px', right: '5px' }}
            fade={true}>
                <h4 className="alert-heading">{ alerta.title }</h4>
                <p>{ alerta.message }</p>
        </Alert>
     );
}
 
export default Alertas;