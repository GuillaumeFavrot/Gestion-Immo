import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import InformationTable from "./informationTable/InformationTable";
import Modal from "react-bootstrap/Modal";
import Table from "./table/Table";
import { getTenants } from "../state/features/tenantSlice";

function Apartment() {
  //Application state
  const page = useSelector((state) => state.view.page);
  const apartments = useSelector((state) => state.apartments);
  const tenants = useSelector((state) => state.tenants);
  const theme = useSelector((state) => state.view.theme)

  const dispatch = useDispatch()

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let assignTenant = () => {
    dispatch(getTenants())
    handleShow()
  }

  return (
    <div className={page === "Apartment" ? "page container-xxl" : "d-none"}>
      <div className="Title">
        <InformationTable item={apartments.apartment} displayed_info={apartments.info_table_headings}/>
      </div>
      <h5>Actions</h5>
      <div className={`tools d-flex bg-${theme.secondaryBackground} mb-2 p-2 border rounded-1`}>
        <button 
          className={`btn btn-outline-secondary text-${theme.text} me-2`}
          type="button"onClick={() => assignTenant()}
          >
            Assigner un locataire à cet appartement
        </button>
        <button
          className={`btn btn-outline-secondary text-${theme.text} me-2`}
        >
          Départ du locataire
        </button>
        <button
          className={`btn btn-outline-secondary text-${theme.text}`}
        >
          Ajouter un état des lieux</button>
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
        <h5>Liste des dépots</h5>
        <Table
          headings={apartments.deposit_headings}
          data={apartments.apartment.deposit_bills}
          pay={true}
        />
      </div>
      <div>
        <h5>Liste des loyers</h5>
        <Table
          headings={apartments.rent_headings}
          data={apartments.apartment.rent_bills}
          pay={true}
        />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          className={`bg-${theme.secondaryBackground} text-${theme.text} border-secondary`}
          closeButton
        >
          <Modal.Title className="text-center">
            Sélectionnez un locataire
          </Modal.Title>
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
    </div>
  );
}

export default Apartment;