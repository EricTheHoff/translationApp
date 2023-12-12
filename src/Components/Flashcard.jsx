import React from 'react'
import { useState } from 'react'
import '../Styles/flashcard.css'

const Flashcard = ( {flashcard} ) => {
    const [flip, setFlip] = useState(false)

    return (
        <>
            <div
            className={`card ${flip ? 'flip' : ''}`}
            onClick={() => setFlip(!flip)}
            >
                <div className='front'>
                    {flashcard.word}
                </div>
                <div className='back'>
                    {flashcard.original}
                </div>
            </div>
        </>
    )
}

export default Flashcard