import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import InformationTable from "./information_table/Information_table"
import Modal from "react-bootstrap/Modal"
import Table from "./table/Table"
import { getTenants } from "../state/features/tenant_slice"
import { unassignTenant } from "../state/features/apartment_slice"
import Inventory_form from "./forms/Inventory_form"

function Apartment() {
    
    //Application state
    const page = useSelector((state) => state.view.page)
    const apartments = useSelector((state) => state.apartments)
    const tenants = useSelector((state) => state.tenants)
    const theme = useSelector((state) => state.view.theme)

    //Usedispatch setup
    const dispatch = useDispatch()

    //Assign tenant modal
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    //Create inventory modal
    const [show2, setShow2] = useState(false)
    const handleClose2 = () => setShow2(false)
    const handleShow2 = () => setShow2(true)

    let assignTenant = () => {
        dispatch(getTenants())
        handleShow()
    }

    let createInventory = () => {
        if (apartments.apartment.current_tenant_id === "") {
        alert("Il n'est pas possible de saisir un état des lieux sans un locataire!")
        } else {
        handleShow2()
        }
    }

    let tenantDepature = () => {
        let email = tenants.tenant.email
        let response = prompt("Saisissez l'ID du locataire pour confirmer la demande de départ")
        if (response === apartments.apartment.current_tenant_id) {
        let exit_inventory_done = false
        let inventories = apartments.apartment.inventories
        if (inventories.length > 0) {
            for (let i = 0 ; i < inventories.length ; i++) {
                if (inventories[i].apartment_id === apartments.apartment.id && inventories[i].tenant_id === apartments.apartment.current_tenant_id && inventories[i].type === 'exit') {
                    exit_inventory_done = true
                }
            }
        }
        if (exit_inventory_done === true) {
            dispatch(unassignTenant({apartment_id: apartments.apartment.id, tenant_id: apartments.apartment.current_tenant_id}))
            alert(`Le départ du locataire a bien été entregistré, un e-mail de confirmation ainsi que la balance locataire ont été envoyés à l\'adresse email du locataire.`)
        } else {
            alert("Il convient de réaliser un état des lieux de sortie avant d'acter la sortie d'un locataire")
        }
        }
    }


    return (
        <div className={page === "Apartment" ? "page container-xxl" : "d-none"}>

            <div className="Title">
                <InformationTable item={apartments.apartment} displayed_info={apartments.info_table_headings}/>
            </div>

            <h5>Actions</h5>
            <div className={`tools d-flex bg-${theme.secondaryBackground} mb-2 p-2 border rounded-1`}>
                <button className={`btn btn-outline-secondary text-${theme.text} me-2`} type="button" onClick={() => assignTenant()}>Assigner un locataire à cet appartement</button>

                <button className={`btn btn-outline-secondary text-${theme.text} me-2`} onClick={() => tenantDepature()}>Départ du locataire</button>

                <button className={`btn btn-outline-secondary text-${theme.text}`} onClick={() => createInventory()}>Ajouter un état des lieux</button>
            </div>

            <div>
                <h5>Locataire actuel</h5>
                <Table
                headings={apartments.tenant_headings}
                data={[apartments.apartment.tenant]}
                consult={true}
                />
            </div>

            <div>
                <h5>Liste des états des lieux</h5>
                <Table
                headings={apartments.inventory_headings}
                data={apartments.apartment.inventories}
                deletion={true}
                modification={true}
                />
            </div>

            <div>
                <h5>Liste des dépots</h5>
                <Table
                headings={apartments.deposit_headings}
                data={apartments.apartment.deposit_bills}
                />
            </div>

            <div>
                <h5>Liste des loyers</h5>
                <Table
                headings={apartments.rent_headings}
                data={apartments.apartment.rent_bills}
                />
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header className={`bg-${theme.secondaryBackground} text-${theme.text} border-secondary`} closeButton>
                    <Modal.Title className="text-center">Sélectionnez un locataire</Modal.Title>
                </Modal.Header>
                
                <Modal.Body className={`bg-${theme.secondaryBackground} text-${theme.text} border-secondary`}>
                <Table         
                    headings={tenants.short_headings}
                    data={tenants.tenants}
                    select={true}
                    consult={false}
                    deletion={false}
                    pay={false}
                    validation={handleClose}
                    noborder={true}
                    />
                </Modal.Body>
            </Modal>

            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header className={`bg-${theme.secondaryBackground} text-${theme.text} border-secondary`} closeButton>
                    <Modal.Title className="text-center">Créez un état des lieux</Modal.Title>
                </Modal.Header>
                <Modal.Body className={`bg-${theme.secondaryBackground} text-${theme.text} border-secondary`}>
                    <Inventory_form validation={handleClose2}/>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Apartment