import { useState } from 'react'
import axios from 'axios'
import bear from "../Images/Avatars/bear.png"
import cat from "../Images/Avatars/cat.png"
import chicken from "../Images/Avatars/chicken.png"
import dog from "../Images/Avatars/dog.png"
import koala from "../Images/Avatars/koala.png"
import meerkat from "../Images/Avatars/meerkat.png"
import panda from "../Images/Avatars/panda.png"
import rabbit from "../Images/Avatars/rabbit.png"
import sealion from "../Images/Avatars/sealion.png"
import '../Styles/imageGrid.css'

const ImageGrid = ({ setProfile }) => {

    const bearFunction = async () => {
        await axios.get('/bear').then((response) => {
            setProfile(bear)
        })
    }

    const catFunction = async () => {
        setProfile(cat)
    }

    const chickenFunction = async () => {
        await axios.get('/chicken')
        setProfile(chicken)
    }

    const dogFunction = async () => {
        await axios.get('/dog')
        setProfile(dog)
    }

    const koalaFunction = async () => {
        await axios.get('/koala')
        setProfile(koala)
    }

    const meerkatFunction = async () => {
        await axios.get('/meerkat')
        setProfile(meerkat)
    }

    const pandaFunction = async () => {
        await axios.get('/panda')
        setProfile(panda)
    }

    const rabbitFunction = async () => {
        await axios.get('/rabbit')
        setProfile(rabbit)
    }

    const sealionFunction = async () => {
        await axios.get('/sealion')
        setProfile(sealion)
    }

    return (

        <div className="grid-container">

            <div className="grid-item">
                <button onClick={bearFunction}>
                    <img src={bear} />
                </button>
            </div>

            <div className="grid-item">
                <button onClick={catFunction}>
                    <img src={cat} />
                </button>
            </div>

            <div className="grid-item">
                <button onClick={chickenFunction}>
                    <img src={chicken} />
                </button>
            </div>

            <div className="grid-item">
                <button onClick={dogFunction}>
                    <img src={dog} />
                </button>
            </div>

            <div className="grid-item">
                <button onClick={koalaFunction}>
                    <img src={koala} />
                </button>
            </div>

            <div className="grid-item">
                <button onClick={meerkatFunction}>
                    <img src={meerkat} />
                </button>
            </div>

            <div className="grid-item">
                <button onClick={pandaFunction}>
                    <img src={panda} />
                </button>
            </div>

            <div className="grid-item">
                <button onClick={rabbitFunction}>
                    <img src={rabbit} />
                </button>
            </div>

            <div className="grid-item">
                <button onClick={sealionFunction}>
                    <img src={sealion} />
                </button>
            </div>

        </div>
    );
}

export default ImageGrid;
