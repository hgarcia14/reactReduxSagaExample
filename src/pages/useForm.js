import React, { useState } from 'react';

const useForm = ( { initialValues, onSubmit, validate } ) => {

    const [values, setVaules] = useState( initialValues || {} );
    const [focusedValues, setFocusedValues] = useState( {} );
    const [errors, setErrors] = useState( {} );

    const handleChange = e => {
        const target = e.target;
        console.log(e);
        const value =  target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setVaules( {
            ...values,
            [name]: value
        } );

        console.log({target, value, name});
    }

    const handleSelect = e => {
        console.log(e);
    }

    const handleBlur = e => {
        const target = e.target;
        const name = target.name;

        setFocusedValues( {
            ...focusedValues,
            [name]: true
        } );

        const err = validate( values );

        setErrors( {
            ...errors,
            ...err
        } );
    }

    const handleSubmit = e => {
        e.preventDefault();

        const err = validate( values );

        setErrors( {
            ...errors,
            ...err
        } );

        onSubmit( {values, err} );
    }

    return {
        values,
        focusedValues,
        errors,
        handleChange,
        handleSelect,
        handleBlur,
        handleSubmit
    };
}
 
export default useForm;