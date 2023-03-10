import React from "react";

function EntryElement({ heading, entry }) {
  return <td>{entry[heading]}</td>;
}

export default EntryElement;
