import React from "react"
import TableHeading from "./Table_heading"
import TableEntry from "./Table_entry"
import { useSelector } from "react-redux"

function Table({ headings, data, consult, deletion, pay, select, validation, noborder, modification }) {

  //Application state
  const theme = useSelector((state) => state.view.theme)
  
  return (
    <div className={noborder === true ? "" : "border mb-3"}>
      <table className={`table table-${theme.secondaryBackground} mb-0`}>
        <thead>
          <tr>
            {Object.entries(headings).map((heading) => (
              <TableHeading key={heading[0]} heading={heading[1]} />
            ))}
            <th className={consult === true ? "heading" : "d-none"}>
              Consulter
            </th>
            <th className={select === true ? "heading" : "d-none"}>
              Sélectionner
            </th>
            <th className={modification === true ? "heading" : "d-none"}>
              Modifier
            </th>
            <th className={pay === true ? "heading" : "d-none"}>Paiement</th>
            <th className={deletion === true ? "heading" : "d-none"}>
              Supprimer
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <TableEntry
              key={entry.id}
              headings={headings}
              entry={entry}
              consult={consult}
              deletion={deletion}
              pay={pay}
              select={select}
              validation={validation}
              modification={modification}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
