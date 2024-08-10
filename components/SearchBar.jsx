import React from "react";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBarComponent = (props) => {
  const { value, setValue } = props;
  return (
    <div
      id="searchBarComponent"
      className="flex items-center border border-gray-300 rounded-lg p-2 mx-auto w-4/5 md:w-3/4 my-4 md:my-8"
    >
      <input
        onChange={(event) => setValue(event.target.value)}
        value={value}
        type="text"
        placeholder="Pesquisar..."
        className="flex-grow p-2 border-none bg-transparent focus:outline-none"
      />
      <button type="submit" className="p-2">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
};

export default SearchBarComponent;
