import React from "react";

const NumResults = ({ movies }) => {
  console.log("MOVIES NUM RESULTS: ", movies);

  return (
    <p className="num-results">
      Found <strong>{movies?.length}</strong> results
    </p>
  );
};

export default NumResults;
