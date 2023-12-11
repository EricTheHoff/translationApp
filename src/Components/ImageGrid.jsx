import React from 'react';
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

const ImageGrid = () => {

    const bearFunction = async () => {
        await axios.get('/bear')
    }

    const catFunction = async () => {
        await axios.get('/cat')
    }

    const chickenFunction = async () => {
        await axios.get('/chicken')
    }

    const dogFunction = async () => {
        await axios.get('/dog')
    }

    const koalaFunction = async () => {
        await axios.get('/koala')
    }

    const meerkatFunction = async () => {
        await axios.get('/meerkat')
    }

    const pandaFunction = async () => {
        await axios.get('/panda')
    }

    const rabbitFunction = async () => {
        await axios.get('/rabbit')
    }

    const sealionFunction = async () => {
        await axios.get('/sealion')
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
