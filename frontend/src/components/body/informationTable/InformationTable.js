import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import InformationTableEntry from './InformationTableEntry';


function InformationTable({item, displayed_info}) {
  //Application state
  const page = useSelector((state) => state.view.page);
  const theme = useSelector((state) => state.view.theme);

  return (
    <div className='d-flex justify-content-center'>
        <div className={`card info-card mb-3 bg-${theme.secondaryBackground} border`}>
          <div className="card-body pb-1">
            <h3 className={`card-title bg-${theme.secondaryBackground} text-${theme.text}`}>{page === "Tenant" ? "Locataire" : "Appartement"} - Informations générales</h3>
            <ul className="list-group list-group-flush">
              {Object.entries(displayed_info).map((info) => (
                <InformationTableEntry item={item} info={info}/>
              ))}
            </ul>
          </div>
        </div>
    </div>
  )
}

export default InformationTable