import React from "react";
import { codes, codeMappingForMap } from "../CountryCodes/countryCodes.js";
import "../styles/map.css";

const MapForm = ({
  changeRadius,
  onZipcodeChange,
  onZipcodeSubmit,
  zipcode,
  changeLanguage,
}) => {
  return (
    <div className="map-form-container">
      {/* Distance selection */}
      <div className="select-container">
        <select onChange={changeRadius}>
          <option className="dropdown" value="16093.4">
            10 miles
          </option>
          <option className="dropdown" value="24140.2">
            15 miles
          </option>
          <option className="dropdown" value="40233.6">
            25 miles
          </option>
        </select>
        {/* language selection */}
        <select onChange={changeLanguage}>
          <option className="dropdown" value="language">
            Language
          </option>
          {codes.map((el, idx) => (
            <option
              key={idx}
              className="dropdown"
              value={codeMappingForMap[el]}
            >
              {codeMappingForMap[el]}
            </option>
          ))}
        </select>
      </div>
      {/* zipcode input */}
      <div className="zipcode-container">
        <input
          type="text"
          value={zipcode}
          onChange={onZipcodeChange}
          placeholder="Enter zipcode"
        />
        {/* submit */}
        <button onClick={onZipcodeSubmit} className="btn btn-primary">
          Submit
        </button>
      </div>
    </div>
  );
};

export default MapForm;
