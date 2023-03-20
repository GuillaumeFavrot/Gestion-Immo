import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import ApartmentForm from "./forms/Apartment_form";
import TenantForm from "./forms/Tenant_form";
import { getApartments } from "../state/features/apartmentSlice";
import { getTenants } from "../state/features/tenantSlice";
import { useSelector, useDispatch } from "react-redux"

function Tools() {
    const theme = useSelector((state) => state.view.theme);
    const page = useSelector((state) => state.view.page);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Component state
    const [data, setData] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    //Dispatcher setup
    const dispatch = useDispatch()

    //Modification function
    const onChange = (e) => {
        setData(e.target.value)
        setSuccess("")
    }

    useEffect(() => {
        if (page == "Apartments" && data.length > 0) {
            dispatch(getApartments(data))
        } else if (page == "Tenants" && data.length > 0) {
            dispatch(getTenants(data))
        }
    }, [data])

    return (
      <div className={`tools d-flex bg-${theme.secondaryBackground} mb-2 p-2 border rounded-1`}>
        <div className="input-group me-2">
          <input
            type="text"
            className="form-control"
            placeholder="Que cherchez-vous?"
            aria-label="Que cherchez-vous?"
            aria-describedby="button-addon2"
            onChange={(e) => onChange(e)}
          ></input>
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
              <ApartmentForm validation={handleClose}/>
            </div>
            <div className={page === "Tenants" ? "d-block" : "d-none"}>
              <TenantForm validation={handleClose}/>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
}

export default Tools;
