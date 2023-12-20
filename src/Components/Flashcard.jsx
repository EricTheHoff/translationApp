import React from 'react'
import { useState, useEffect, useRef } from 'react'
import '../Styles/flashcard.css'

const Flashcard = ({ flashcard, configuration }) => {
    const [flip, setFlip] = useState(false)
    const [height, setHeight] = useState('Initial')

    const frontEl = useRef()
    const backEl = useRef()

    // Using ref hook to track height of the card element and ensure that the front side and back side are the same.
    const setMaxHeight = () => {
        const frontHeight = frontEl.current.getBoundingClientRect().height
        const backHeight = backEl.current.getBoundingClientRect().height
        setHeight(Math.max(frontHeight, backHeight, 100))
    }

    useEffect(setMaxHeight, [flashcard.word, flashcard.original])
    useEffect(() => {
        window.addEventListener('resize', setMaxHeight)
        return () => window.removeEventListener('resize', setMaxHeight)
    },[])

    // 'configuration' refers to whether or not they want the English text on the front or the back of the flashcard.
    if (configuration === false || configuration === 'false') {
        return (
            <>
                {/* Dynamically assigning className based on if the card is flipped or not. */}
                <div
                    className={`cards ${flip ? 'flip' : ''}`}
                    style={{ height: height, backgroundColor: '#F2D492' }}
                    onClick={() => setFlip(!flip)}
                >
                    <div className='front text-center' ref={frontEl}>
                        {flashcard.word ? flashcard.word : flashcard.phrase}
                    </div>
                    <div className='back text-center' ref={backEl}>
                        {flashcard.original ? flashcard.original : ''}
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div
                className={`cards ${flip ? 'flip' : ''}`}
                style={{ height: height, backgroundColor: '#F2D492' }}
                onClick={() => setFlip(!flip)}
                >
                    <div className='front text-center' ref={frontEl}>
                        {flashcard.original}
                    </div>
                    <div className='back text-center' ref={backEl}>
                        {flashcard.word}
                    </div>
                </div>
            </>
        )
    }
}

export default Flashcard