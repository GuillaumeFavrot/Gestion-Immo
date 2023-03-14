import React from "react";
import EntryElement from "./EntryElement";
import { useSelector, useDispatch } from "react-redux";
import { modifyPage } from "./../../state/features/viewSlice";
import { deleteTenant, getTenant } from "./../../state/features/tenantSlice";
import { assignTenant, deleteApartment, getApartment } from "../../state/features/apartmentSlice";

function TableEntry({ headings, entry, consult, deletion, pay, select }) {
  //Application state
  const theme = useSelector((state) => state.view.theme);
  const page = useSelector((state) => state.view.page);
  const apartment = useSelector((state) => state.apartments.apartment)

  //Dispatch setup
  const dispatch = useDispatch();

  //Page request
  const pageRequest = (e) => {
    e.preventDefault();
    let request = [...page];
    request.pop();
    request.join("");
    if (page === "Apartments") {
      dispatch(getApartment(entry['id']))
    }
    else if (page === "Tenants") {
      dispatch(getTenant(entry['id']))
    }
    dispatch(modifyPage(request.join("")));
  };

  //Delete entry
  const deleteEntry = () => {
    if (page === "Apartments") {
      dispatch(deleteApartment(entry['id']))
    }
    else if (page === "Tenants") {
      dispatch(deleteTenant(entry['id']))
    }
  }

  //Tenant selection
  const tenantSelection = () => {
    let request = {
      apartment_id : apartment['id'],
      tenant_id : entry['id']
    }
    dispatch(assignTenant(request))
  }

  return (
    <tr>
      {Object.entries(headings).map((heading) => (
        <EntryElement key={heading[0]} heading={heading[0]} entry={entry} />
      ))}
      <td className={consult === true ? "" : "d-none"}>
        <button
          className={`btn-table text-${theme.text}`}
          onClick={(e) => pageRequest(e)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-arrow-right-circle btn-icon"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
            />
          </svg>
        </button>
      </td>

      <td className={select === true ? "" : "d-none"}>
        <button
          className={`btn-table text-${theme.text}`}
          onClick={(e) => tenantSelection(e)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-arrow-right-circle btn-icon"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
            />
          </svg>
        </button>
      </td>

      <td className={pay === true ? "" : "d-none"}>
        <button
          className={
            entry.paid === true ? "d-none" : `btn-table text-${theme.text}`
          }
          onClick={(e) => pageRequest(e)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-arrow-right-circle btn-icon"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
            />
          </svg>
        </button>
      </td>

      <td className={deletion === true ? "" : "d-none"}>
        <button className="btn-table text-danger" onClick={() => deleteEntry()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-x-circle ms-2 btn-icon"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>
      </td>
    </tr>
  );
}

export default TableEntry;
