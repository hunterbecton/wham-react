import React, { Fragment, useEffect } from "react";
import { useSoundboard } from '../../hooks/useSoundboard'

const AutoExpire = ({ children, id }) => {

    const { setSoundboard } = useSoundboard()

    useEffect(() => {
        setTimeout(() => {
            setSoundboard({ type: 'REMOVE_EMOJI', payload: { id } })
        }, 6000);
    }, []);


    return <Fragment>{children}</Fragment>;
};

export default AutoExpire;
