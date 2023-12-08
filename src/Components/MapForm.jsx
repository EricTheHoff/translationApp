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
        <option className="dropdown" value="language">
          Select a Language
        </option>
        <option className="dropdown" value="bulgarian">
          Bulgarian
        </option>
        <option className="dropdown" value="chinese">
          Chinese
        </option>
        <option className="dropdown" value="czech">
          Czech
        </option>
        <option className="dropdown" value="danish">
          Danish
        </option>
        <option className="dropdown" value="german">
          German
        </option>
        <option className="dropdown" value="greek">
          Greek
        </option>
        <option className="dropdown" value="spanish">
          Spanish
        </option>
        <option className="dropdown" value="estonian">
          Estonian
        </option>
        <option className="dropdown" value="finnish">
          Finnish
        </option>
        <option className="dropdown" value="french">
          French
        </option>
        <option className="dropdown" value="hungarian">
          Hungarian
        </option>
        <option className="dropdown" value="indonesian">
          Indonesian
        </option>
        <option className="dropdown" value="italian">
          Italian
        </option>
        <option className="dropdown" value="japanese">
          Japanese
        </option>
        <option className="dropdown" value="korean">
          Korean
        </option>
        <option className="dropdown" value="lithuanian">
          Lithuanian
        </option>
        <option className="dropdown" value="latvian">
          Latvian
        </option>
        <option className="dropdown" value="norwegian">
          Norwegian
        </option>
        <option className="dropdown" value="dutch">
          Dutch
        </option>
        <option className="dropdown" value="polish">
          Polish
        </option>
        <option className="dropdown" value="portuguese">
          Portuguese
        </option>
        <option className="dropdown" value="romanian">
          Romanian
        </option>
        <option className="dropdown" value="russian">
          Russian
        </option>
        <option className="dropdown" value="slovak">
          Slovak
        </option>
        <option className="dropdown" value="slovenian">
          Slovenian
        </option>
        <option className="dropdown" value="swedish">
          Swedish
        </option>
        <option className="dropdown" value="turkish">
          Turkish
        </option>
        <option className="dropdown" value="ukranian">
          Ukranian
        </option>
      </select>
    </div>
  );
};

export default MapForm;
