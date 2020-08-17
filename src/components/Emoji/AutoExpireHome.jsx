import React, { Fragment, useEffect, useContext } from "react";
import { useSoundboard } from '../../hooks/useSoundboard'

const AutoExpireHome = ({ children, id }) => {

    const { setSoundboard } = useSoundboard()

    useEffect(() => {
        setTimeout(() => {
            setSoundboard({ type: 'REMOVE_EMOJI', payload: { id } })
        }, 9000);
    }, []);


    return <Fragment>{children}</Fragment>;
};

export default AutoExpireHome;
