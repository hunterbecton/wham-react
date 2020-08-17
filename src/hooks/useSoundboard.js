import React, { useContext, useReducer, createContext } from 'react'

export const soundboardContext = createContext()

export function ProvideSoundboard({ children }) {
    const soundboard = useProvideSoundboard()
    return <soundboardContext.Provider value={soundboard}>{children}</soundboardContext.Provider>
}

export const useSoundboard = () => {
    return useContext(soundboardContext)
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_EMOJI':
            return {
                ...state,
                emojis: {
                    emojiQueue: [...state.emojis.emojiQueue, action.payload],
                },
            };
        case 'REMOVE_EMOJI':
            return {
                ...state,
                emojis: {
                    emojiQueue: state.emojis.emojiQueue.filter(
                        (emoji) => emoji.id !== action.payload.id
                    ),
                },
            };
        case 'RESET_EMOJI':
            return {
                ...state,
                emojis: {
                    emojiQueue: []
                }
            }
        default: {
            return state;
        }
    }
};

const useProvideSoundboard = () => {

    const [soundboard, setSoundboard] = useReducer(reducer, {
        emojis: {
            emojiQueue: [],
        },
    });

    return {
        soundboard,
        setSoundboard
    }
}
