import React from 'react'
import Flashcard from './Flashcard.jsx'
import { useState } from 'react'

const StudyList = ({ flashcards }) => {
    return (
        <>
            <div>
                <p>Test</p>
            </div>
            {/* <div className='card-grid'>
                {flashcards.map(el => {
                    return <Flashcard
                    flashcard={el}
                    key={el.id}
                    />
                })}
            </div> */}
        </>
)
}

export default StudyList