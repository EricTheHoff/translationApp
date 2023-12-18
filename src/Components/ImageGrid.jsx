import bear from "../Images/Avatars/bear.png";
import cat from "../Images/Avatars/cat.png";
import chicken from "../Images/Avatars/chicken.png";
import dog from "../Images/Avatars/dog.png";
import koala from "../Images/Avatars/koala.png";
import meerkat from "../Images/Avatars/meerkat.png";
import panda from "../Images/Avatars/panda.png";
import rabbit from "../Images/Avatars/rabbit.png";
import sealion from "../Images/Avatars/sealion.png";
import "../Styles/imageGrid.css";
import '../Styles/images.css'

const ImageGrid = ({ setProfile }) => {
  const bearFunction = (event) => {
    event.preventDefault();
    setProfile("bear");
  };

  const catFunction = async (event) => {
    event.preventDefault();
    setProfile("cat");
  };

  const chickenFunction = async (event) => {
    event.preventDefault();
    setProfile("chicken");
  };

  const dogFunction = async (event) => {
    event.preventDefault();
    setProfile("dog");
  };

  const koalaFunction = async (event) => {
    event.preventDefault();
    setProfile("koala");
  };

  const meerkatFunction = async (event) => {
    event.preventDefault();
    setProfile("meerkat");
  };

  const pandaFunction = async (event) => {
    event.preventDefault();
    setProfile("panda");
  };

  const rabbitFunction = async (event) => {
    event.preventDefault();
    setProfile("rabbit");
  };

  const sealionFunction = async (event) => {
    event.preventDefault();
    setProfile("sealion");
  };

  return (
    <div className="grid-container">

      <div className="grid-item1">
        <button className="gridButton" onClick={bearFunction}>
          <img src={bear} />
        </button>
      </div>

      <div className="grid-item2">
        <button className="gridButton" onClick={catFunction}>
          <img src={cat} />
        </button>
      </div>

      <div className="grid-item3">
        <button className="gridButton" onClick={chickenFunction}>
          <img src={chicken} />
        </button>
      </div>

      <div className="grid-item4">
        <button className="gridButton" onClick={dogFunction}>
          <img src={dog} />
        </button>
      </div>

      <div className="grid-item5">
        <button className="gridButton" onClick={koalaFunction}>
          <img src={koala} />
        </button>
      </div>

      <div className="grid-item6">
        <button className="gridButton" onClick={meerkatFunction}>
          <img src={meerkat} />
        </button>
      </div>

      <div className="grid-item7">
        <button className="gridButton" onClick={pandaFunction}>
          <img src={panda} />
        </button>
      </div>

      <div className="grid-item8">
        <button className="gridButton" onClick={rabbitFunction}>
          <img src={rabbit} />
        </button>
      </div>

      <div className="grid-item9">
        <button className="gridButton9" onClick={sealionFunction}>
          <img src={sealion} />
        </button>
      </div>

    </div>
  );
};

export default ImageGrid;
