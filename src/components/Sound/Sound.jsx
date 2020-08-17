import React from 'react'
import useSound from 'use-sound';

const Sound = (url) => {
    const [play] = useSound(url);

    return (
        <div>
            <button onClick={play}>Play</button>
        </div>
    );
}

export default Sound
