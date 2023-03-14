import React from "react";

function EntryElement({ heading, entry }) {
  let info = entry[heading]

  if (info === true) {
    info = "oui"
  }
  if (info === false) {
    info = "non"
  }

  return <td>{info}</td>;
}

export default EntryElement;
