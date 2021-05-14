import React from "react";

function SearchForm(props) {
  return (
    <form className="row">
      <div className="text-center align-middle form-group mb-4">
        <input
          onChange={props.handleInputChange}
          value={props.search}
          name="search"
          type="text"
          className="form-control col mx-auto w-50 text-center"
          placeholder="Search for an Employee"
          id="search"
        />
      </div>
    </form>
  );
}

export default SearchForm;