import React from 'react'
import { useSelector } from "react-redux";

function InformationTableEntry({item, info}) {
    const theme = useSelector((state) => state.view.theme);

    let data = item[info[1].name]
    if (data === true) {
      data = "oui"
    }
    if (data === false) {
      data = "non"
    }

    return (
        <li className={`list-group-item bg-${theme.secondaryBackground} grid d-flex flex-row`}>
            <div className={`text-${theme.text} info-card-title`}>
                {info[1].display_name}
            </div>
            <div className={`text-${theme.text} info-table-content bold`}>
                {data}
            </div>
            <button
            className={info[1].modifiable === true ? "btn-table info-card-btn d-flex justify-content-end align-items-center" : "d-none"}
            >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className={`bi bi-arrow-right-circle btn-icon mt-2 text-${theme.text}`}
                viewBox="0 0 16 16"
            >
                <path
                fillRule="evenodd"
                d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                />
            </svg>
            </button>
        </li>
    )
}

export default InformationTableEntry