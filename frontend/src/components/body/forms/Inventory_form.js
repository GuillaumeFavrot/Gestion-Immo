import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createInventory, modifyInventory } from "../../state/features/apartmentSlice";

function Inventory_form({validation, modification, inventory}) {
    //Application state
    const theme = useSelector((state) => state.view.theme);
    const apartment = useSelector((state) => state.apartments.apartment)

    //Component state
    const [inventory_type, setInventory_type] = useState("entry");
    const [date, setDate] = useState("");
    const [remarks, setRemarks] = useState("");
    const [initialized, setInitialized] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    //Dispatcher setup
    const dispatch = useDispatch();

    //Local state setup
    if (modification === true && initialized === false) {
        setInventory_type(inventory.type)
        setDate(inventory.date)
        setRemarks(inventory.remarks)
        setInitialized(true)
    }

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
        if (modification === true) {
            let data = {
                id: inventory.id,
                apartment_id: inventory.apartment_id,
                tenant_id: inventory.tenant_id,
                inventory_type: inventory_type,
                date: date,
                remarks: remarks,
            }
            dispatch(modifyInventory(data))
            validation()
            setInitialized(false)
        } else {
            let data = {
                apartment_id: apartment.id,
                tenant_id: apartment.current_tenant_id,
                inventory_type: inventory_type,
                date: date,
                remarks: remarks,
            }
            dispatch(createInventory(data))
            validation()
            setInitialized(false)           
        }
  }
    return (
        <div>
            <form onSubmit={(e) => {onSubmit(e)}}>
                <div className="mb-3">
                <label for="inventory_type" className="form-label">Type d'état des lieux</label>
                <select id="inventory_type" className={`form-select bg-${theme.mainBackground}`} onChange={(e) => onChange(e)} value={modification === true ? inventory.type : inventory_type} disabled={modification === true ? true : false}>
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
                    value={modification === true ? inventory.date : date}
                    disabled={modification === true ? true : false}
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
                    value={remarks}
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