import React from 'react'
import Flashcard from './Flashcard.jsx'

const StudyList = ({ flashcards, configuration }) => {
    
    return (
        <>
            <div className='card-grid'>
                {flashcards.map(el => {
                    return <Flashcard
                    flashcard={el}
                    key={el.id}
                    />
                })}
            </div>
        </>
)
}

export default StudyList