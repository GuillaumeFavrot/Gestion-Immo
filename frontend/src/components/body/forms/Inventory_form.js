import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createInventory } from "../../state/features/apartmentSlice";

function Inventory_form({validation}) {
    //Application state
    const theme = useSelector((state) => state.view.theme);
    const apartment = useSelector((state) => state.apartments.apartment)

    //Component state
    const [inventory_type, setInventory_type] = useState("");
    const [date, setDate] = useState("");
    const [remarks, setRemarks] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    //Dispatcher setup
    const dispatch = useDispatch();

    //Modification function
    let setters = {
        inventory_type: setInventory_type,
        date: setDate,
        remarks: setRemarks,
    };
    
    const onChange = (e) => {
        setters[e.target.id](e.target.value);
        setSuccess("");
    };

    //Submit function
    const onSubmit = (e) => {
        e.preventDefault();
        setError("");
        let data = {
        apartment_id: apartment.id,
        tenant_id: apartment.current_tenant_id,
        inventory_type: inventory_type,
        date: date,
        remarks: remarks,
        };
        console.log(data)
        dispatch(createInventory(data))
        validation()
  }
    return (
        <div>
            <form onSubmit={(e) => {onSubmit(e)}}>
                <div className="mb-3">
                <label for="inventory_type" className="form-label">Type d'état des lieux</label>
                <select id="inventory_type" className={`form-select bg-${theme.mainBackground}`} onChange={(e) => onChange(e)}>
                        <option disabled selected>Type d'état des lieux</option>
                        <option value="entry">Entrée</option>
                        <option value="exit">Sortie</option>
                    </select>
                </div>

                <div className="mb-3">
                <label for="date" className="form-label">
                    Date de l'état des lieux
                </label>
                <input
                    type="Date"
                    className={`form-control bg-${theme.mainBackground}`}
                    id="date"
                    onChange={(e) => onChange(e)}
                    required
                ></input>
                </div>

                <div className="mb-3">
                <label for="remarks" className="form-label">
                    Remarques
                </label>
                <textarea
                    type="text"
                    className={`form-control bg-${theme.mainBackground}`}
                    id="remarks"
                    onChange={(e) => onChange(e)}
                    required
                ></textarea>
                </div>

                <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-success">
                    Envoyer
                </button>
                </div>
            </form>
        </div>
    )
}

export default Inventory_form