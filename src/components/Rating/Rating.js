import React from 'react';
import Spinner from '../../hoc/Spinner';

export default function (props) {

    if (!props.loading) {
        return (
            <div onClick={props.click} 
                className={props.isActive ? "active pointer star badge" : 'star pointer badge'}>
                {
                    props.children ? props.children :  ''
                }
            </div>
        )
    } 

    return (
        <div className={props.isActive ? "active star badge" : 'star badge'}>
            <Spinner type={props.spinnerType?props.spinnerType:2} />
        </div>
    )
}

