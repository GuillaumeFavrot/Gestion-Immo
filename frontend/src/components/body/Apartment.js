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
      <div>
        Outils
        <button onClick={() => assignTenant()}>Assigner un locataire à cet appartement</button>
        <button>Départ du locataire</button>
        <button>Ajouter un état des lieux</button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          className={`bg-${theme.secondaryBackground} text-${theme.text} border-secondary`}
          closeButton
        >
          <Modal.Title className="text-center">
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table         
            headings={tenants.short_headings}
            data={tenants.tenants}
            select={true}
            consult={false}
            deletion={false}
            pay={false}
            />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Apartment;