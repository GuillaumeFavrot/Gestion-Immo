import React, {useState} from 'react'
import { useSelector, useDispatch } from "react-redux"
import { createRentBill } from "../../state/features/tenant_slice"

function Rent_bill_form({validation}) {

    //Application state
    const theme = useSelector((state) => state.view.theme)
    const tenant = useSelector((state) => state.tenants.tenant)

    //Component state
    const [apartment, setApartment] = useState("")
    const [month, setMonth] = useState("")
    const [year, setYear] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    //Dispatcher setup
    const dispatch = useDispatch()

    //Modification function

    let setters = {
        month: setMonth,
        year: setYear,
        apartment: setApartment
    }
    
    const onChange = (e) => {
        setters[e.target.id](e.target.options[e.target.options.selectedIndex].value)
        setSuccess("")
    }

    //Submit function
    const onSubmit = (e) => {
        e.preventDefault();
        let period = `${month}_${year}`
        setError("");
        let request = {
            tenant_id: tenant.id,
            apartment_id: apartment,
            period: period
        }
        dispatch(createRentBill(request))
        validation()
    }

    return (
        <div>
            <form onSubmit={(e) => onSubmit(e)} cl>
                
                <div className="mb-3">
                    <label for="apartment" className="form-label">Apartement</label>
                    <select id="apartment" className={`form-select bg-${theme.mainBackground}`} onChange={(e) => onChange(e)}>
                        <option disabled selected>Appartement</option>
                        {tenant.apartments.map((apartment) => (
                          <option value={apartment.id}>{apartment.id}</option>  
                        ))}
                    </select>
                </div>
                
                <div className="mb-3">
                    <label for="month" className="form-label">Mois</label>
                    <select id="month" className={`form-select bg-${theme.mainBackground}`} onChange={(e) => onChange(e)}>
                        <option disabled selected>Mois</option>
                        <option value="january">Janvier</option>
                        <option value="february">Février</option>
                        <option value="march">Mars</option>
                        <option value="april">Avril</option>
                        <option value="may">Mai</option>
                        <option value="june">Juin</option>
                        <option value="july">Juillet</option>
                        <option value="august">Août</option>
                        <option value="september">Septembre</option>
                        <option value="october">Octobre</option>
                        <option value="november">Novembre</option>
                        <option value="december">Décembre</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label for="year" className="form-label">Année</label>
                    <select id="year" className={`form-select bg-${theme.mainBackground}`} onChange={(e) => onChange(e)}>
                        <option disabled selected>Année</option>
                        <option value='2023'>2023</option>
                        <option value='2024'>2024</option>
                        <option value='2025'>2025</option>
                        <option value='2026'>2026</option>
                        <option value='2027'>2027</option>
                    </select>
                </div>

                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-success">Envoyer</button>
                </div>

            </form>
        </div>
    )
}

export default Rent_bill_form