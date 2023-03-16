import React, {useState} from "react";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Rent_bill_form from "./forms/Rent_bill_form";
import InformationTable from "./informationTable/InformationTable";
import Table from "./table/Table";

function Tenant() {
  //Application state
  const page = useSelector((state) => state.view.page);
  const tenants = useSelector((state) => state.tenants);
  const theme = useSelector((state) => state.view.theme);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let createBill= () => {
    handleShow()
  }

  return (
    <div className={page === "Tenant" ? "page container-xxl" : "d-none"}>
      <div className="Title">
        <InformationTable item={tenants.tenant} displayed_info={tenants.info_table_headings}/>
      </div>
      <h5>Actions</h5>
      <div className={`tools d-flex bg-${theme.secondaryBackground} mb-2 p-2 border rounded-1`}>
        <button 
          className={`btn btn-outline-secondary text-${theme.text} me-2`}
          type="button"
          onClick={() => createBill()}
          >
            Ajouter une facture
        </button>
        <button
          className={`btn btn-outline-secondary text-${theme.text} me-2`}
        >
          Générer une quittance de loyer
        </button>
      </div>

      <div>
        <h5>Liste des appartements</h5>
        <Table
          headings={tenants.apartment_headings}
          data={tenants.tenant.apartments}
          consult={true}
        />
      </div>

      <div>
        <h5>Liste des cautions</h5>
        <Table
          headings={tenants.deposit_headings}
          data={tenants.tenant.deposit_bills}
          pay={true}
        />
      </div>
      <div>
        <h5>Liste des loyers</h5>
        <Table
          headings={tenants.rent_headings}
          data={tenants.tenant.rent_bills}
          pay={true}
        />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          className={`bg-${theme.secondaryBackground} text-${theme.text} border-secondary`}
          closeButton
        >
          <Modal.Title className="text-center">
            Ajouter une nouvelle facture
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={`bg-${theme.secondaryBackground} text-${theme.text} border-secondary`}>
          <Rent_bill_form validation={handleClose}/>
        </Modal.Body>
      </Modal>

    </div>
  );
}

export default Tenant;
