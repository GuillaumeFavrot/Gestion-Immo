import React, { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import ApartmentForm from "./forms/ApartmentForm";
import TenantForm from "./forms/TenantForm";

function Tools() {
  const theme = useSelector((state) => state.view.theme);
  const page = useSelector((state) => state.view.page);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={`tools d-flex bg-${theme.secondaryBackground} mb-2 p-2 border rounded-1`}>
      <div className="input-group me-2">
        <input
          type="text"
          className="form-control"
          placeholder="Que cherchez-vous?"
          aria-label="Que cherchez-vous?"
          aria-describedby="button-addon2"
        ></input>
        <button
          className={`btn btn-outline-secondary text-${theme.text}`}
          type="button"
          id="button-addon2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-arrow-right-circle"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
            />
          </svg>
        </button>
      </div>
      <button
        className={`btn btn-outline-secondary text-${theme.text} `}
        type="button"
        onClick={handleShow}
      >
        Nouveau
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          className={`bg-${theme.secondaryBackground} text-${theme.text} border-secondary`}
          closeButton
        >
          <Modal.Title className="text-center">
            {page === "Apartments"
              ? "Ajout d'un nouvel appartement"
              : "Ajout d'un nouveau locataire"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className={`bg-${theme.secondaryBackground} text-${theme.text} border-secondary`}
        >
          <div className={page === "Apartments" ? "d-block" : "d-none"}>
            <ApartmentForm />
          </div>
          <div className={page === "Tenants" ? "d-block" : "d-none"}>
            <TenantForm />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Tools;
