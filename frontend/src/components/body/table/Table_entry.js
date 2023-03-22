import React, {useState} from "react"
import EntryElement from "./Entry_element"
import Modal from "react-bootstrap/Modal"
import { useSelector, useDispatch } from "react-redux"
import { modifyPage } from "../../state/features/view_slice"
import { deleteTenant, getTenant } from "../../state/features/tenant_slice"
import { assignTenant, deleteApartment, getApartment,deleteInventory } from "../../state/features/apartment_slice"
import Bill_payment_form from "../forms/Bill_payment_form"
import Inventory_form from "../forms/Inventory_form"

function TableEntry({ headings, entry, consult, deletion, pay, select, validation, modification }) {
    
    //Application state
    const theme = useSelector((state) => state.view.theme)
    const page = useSelector((state) => state.view.page)
    const apartment = useSelector((state) => state.apartments.apartment)

    //local state
    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)

    //Dispatch setup
    const dispatch = useDispatch()

    //Page request
    const pageRequest = (e) => {
        e.preventDefault()
        if (entry["address_1"])  {
            dispatch(getApartment(entry['id']))
            dispatch(modifyPage('Apartment'))
        } else {
            dispatch(getTenant(entry['id']))
            dispatch(modifyPage('Tenant'))
        }
    }

    //Delete entry
    const deleteEntry = () => {
        if (page === "Apartments") {
        dispatch(deleteApartment(entry['id']))
        }
        else if (page === "Tenants") {
        dispatch(deleteTenant(entry['id']))
        }
        else if (page === "Apartment") {
        dispatch(deleteInventory({id : entry['id'], apartment_id: entry['apartment_id']}))
        }
    }

    //Tenant selection
    const tenantSelection = () => {
        if(apartment.current_tenant_id === "") {
        let request = {
            apartment_id : apartment['id'],
            tenant_id : entry['id']
        }
        dispatch(assignTenant(request))
        validation()      
        } else {
        alert("Un locataire occupe déjà cet appartement!")
        }
    }

    //Payment handlers
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const paymentRequest = () => {
        dispatch(getTenant(entry['id']))
        handleShow()
    }

    //Inventory modification handlers
    const handleClose2 = () => setShow2(false)
    const handleShow2 = () => setShow2(true)

    const inventoryModifcationRequest = () => {
        handleShow2()
    }

    return (
        <tr>
        {Object.entries(headings).map((heading) => (
            <EntryElement key={heading[0]} heading={heading[0]} entry={entry} />
        ))}
        <td className={consult === true ? "" : "d-none"}>
            <button className={`btn-table text-${theme.text}`} onClick={(e) => pageRequest(e)}>
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
            <button className={`btn-table text-${theme.text}`} onClick={(e) => tenantSelection(e)}>
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
            <button className={entry.paid === true ? "d-none" : `btn-table text-${theme.text}`} onClick={() => paymentRequest()}>
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

        <td className={modification === true ? "" : "d-none"}>
            <button className={`btn-table text-${theme.text}`} onClick={() => inventoryModifcationRequest()}>
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                fill="currentColor" 
                className="bi bi-pen" 
                viewBox="0 0 16 16">
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
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

        <Modal show={show} onHide={handleClose}>
            <Modal.Header className={`bg-${theme.secondaryBackground} text-${theme.text} border-secondary`} closeButton>
                <Modal.Title className="text-center">
                    Payer une facture
                </Modal.Title>
            </Modal.Header>
            
            <Modal.Body className={`bg-${theme.secondaryBackground} text-${theme.text} border-secondary`}>
                <Bill_payment_form validation={handleClose} bill={entry}/>
            </Modal.Body>

        </Modal>

        <Modal show={show2} onHide={handleClose2}>
            <Modal.Header className={`bg-${theme.secondaryBackground} text-${theme.text} border-secondary`} closeButton>
                <Modal.Title className="text-center">
                    Modifier un état des lieux
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className={`bg-${theme.secondaryBackground} text-${theme.text} border-secondary`}>
                <Inventory_form validation={handleClose2} modification={modification} inventory={entry}/>
            </Modal.Body>
        </Modal>

        </tr>
    )
}

export default TableEntry
