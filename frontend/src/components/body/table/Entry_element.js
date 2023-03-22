import React from "react"

function Entry_element({ heading, entry }) {
  let info = entry[heading]

  if (info === true) {
    info = "oui"
  }
  if (info === false) {
    info = "non"
  }

  return <td>{info}</td>;
}

export default Entry_element;
