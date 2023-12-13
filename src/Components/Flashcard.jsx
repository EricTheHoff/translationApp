import React from 'react'
import { useState } from 'react'
import '../Styles/flashcard.css'

const Flashcard = ({ flashcard, configuration }) => {
    const [flip, setFlip] = useState(false)

    if (configuration === false || configuration === 'false') {
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
    } else {
        return (
            <>
                <div
                className={`card ${flip ? 'flip' : ''}`}
                onClick={() => setFlip(!flip)}
                >
                    <div className='front'>
                        {flashcard.original}
                    </div>
                    <div className='back'>
                        {flashcard.word}
                    </div>
                </div>
            </>
        )
    }
}

export default Flashcard