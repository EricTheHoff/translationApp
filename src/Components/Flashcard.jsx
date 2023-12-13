import React from 'react'
import { useState, useEffect, useRef } from 'react'
import '../Styles/flashcard.css'

const Flashcard = ({ flashcard, configuration }) => {
    const [flip, setFlip] = useState(false)
    const [height, setHeight] = useState('Initial')

    const frontEl = useRef()
    const backEl = useRef()

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

    if (configuration === false || configuration === 'false') {
        return (
            <>
                <div
                className={`card ${flip ? 'flip' : ''}`}
                style={{ height: height }}
                onClick={() => setFlip(!flip)}
                >
                    <div className='front' ref={frontEl}>
                        {flashcard.word ? flashcard.word : flashcard.phrase}
                    </div>
                    <div className='back' ref={backEl}>
                        {flashcard.original ? flashcard.original : ''}
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div
                className={`card ${flip ? 'flip' : ''}`}
                style={{ height: height }}
                onClick={() => setFlip(!flip)}
                >
                    <div className='front' ref={frontEl}>
                        {flashcard.original}
                    </div>
                    <div className='back' ref={backEl}>
                        {flashcard.word}
                    </div>
                </div>
            </>
        )
    }
}

export default Flashcard