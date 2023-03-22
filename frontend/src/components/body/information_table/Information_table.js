import React from 'react'
import { useSelector } from "react-redux"
import InformationTableEntry from './Information_table_entry'


function Information_table({item, displayed_info}) {

    //Application state
    const page = useSelector((state) => state.view.page)
    const theme = useSelector((state) => state.view.theme)

    return (
        <div className='d-flex justify-content-center'>
            <div className={`card info-card mb-3 bg-${theme.secondaryBackground} border`}>
                <div className="card-body pb-1">
                    <h3 className={`card-title bg-${theme.secondaryBackground} text-${theme.text}`}>{page === "Tenant" ? "Locataire" : "Appartement"} - Informations générales</h3>
                    <ul className="list-group list-group-flush">
                        {Object.entries(displayed_info).map((info) => (
                            <InformationTableEntry key={info[1].name} item={item} info={info}/>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Information_table