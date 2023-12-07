import React from "react";

const MapForm = ({
  changeRadius,
  onZipcodeChange,
  onZipcodeSubmit,
  zipcode,
  changeLanguage,
}) => {
  return (
    <div>
      {/* user zipcode input */}
      <div className="zipcode-container">
        <input
          type="text"
          value={zipcode}
          onChange={onZipcodeChange}
          placeholder="Enter zipcode"
        />
        <button onClick={onZipcodeSubmit}>Submit</button>
      </div>
      <div className="places-container"></div>

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
      <select onChange={changeLanguage}>
        <option className="dropdown">Select a Language</option>
        <option className="dropdown" value="spanish">
          Spanish
        </option>
        <option className="dropdown" value="mandarin">
          Mandarin
        </option>
      </select>
    </div>
  );
};

export default MapForm;
