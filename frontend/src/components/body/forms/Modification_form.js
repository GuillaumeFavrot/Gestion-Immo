import React, {useState} from 'react'
import { useSelector, useDispatch } from "react-redux"
import { updateApartment } from '../../state/features/apartment_slice'
import { updateTenant } from '../../state/features/tenant_slice'

function Modification_form({item, info, validation}) {

    //Application state
    const theme = useSelector((state) => state.view.theme)
    const page = useSelector((state) => state.view.page)
    const tenant = useSelector((state) => state.tenants.tenant)
    const apartment = useSelector((state) => state.apartments.apartment)

    //Component state
    const [data, setData] = useState(item[info[1].name])
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    //Dispatcher setup
    const dispatch = useDispatch()
    
    //Modification function
    const onChange = (e) => {
        setData(e.target.value)
        setSuccess("")
    }

    //tenant modification function
    const tenantModification = () => {
        if (info[1].name === "caf_payment") {
            if (data === "false") {
                let request = {
                    tenant_id: tenant.id,
                    data_type: info[1].name,
                    new_data: false
                }
                dispatch(updateTenant(request))
                setError("")
                validation()                
            } else if (data === 'true') {
                let request = {
                    tenant_id: tenant.id,
                    data_type: info[1].name,
                    new_data: true
                }
                dispatch(updateTenant(request))
                setError("")
                validation()              
            }
        }

        else {
            let request = {
                tenant_id: tenant.id,
                data_type: info[1].name,
                new_data: data
            }
            dispatch(updateTenant(request))
            setError("")
            validation()             
        }

    }

    //Submit function
    const onSubmit = (e) => {
        e.preventDefault()
        let letters = /^[A-Za-z]/
        if (page === "Apartment") {
            console.log("apartment")
            if (parseInt(data) < 0 || parseInt(data) === 0 || letters.test(data)) {
                setError("Le montant saisi doit être un nombre décimal positif non nul")
            }
            else {
                let request = {
                    apartment_id: apartment.id,
                    data_type: info[1].name,
                    new_data: data
                }
                dispatch(updateApartment(request))
                setError("")
                validation()                
            }

        } else if (page === "Tenant") {

            if (info[1].name === 'firstname' || info[1].name === 'lastname' ) {
                if (/\d/.test(data)) {
                    setError('Le nom ou le prénom ne peuvent contenir de nombres')
                }
                else {
                    tenantModification()
                }
            }

            else if (info[1].name === 'email') {
                let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')
                if (regex.test(data)) {
                    tenantModification()
                }
                else {
                    setError("L'e-mail saisi est invalide")
                }
            }

            else if (info[1].name === 'caf_payment') {
                if (data === 'true' || data === 'false') {
                    tenantModification()
                }
                else {
                    setError("La valeur saisie doit être un booléen")
                }
            }

            else if (info[1].name === 'apl_amount') {
                if (data < 0 || data === 0 || letters.test(data)) {
                    setError("Le montant saisi doit être un nombre décimal positif non nul")
                }
                else {
                    tenantModification()
                }
            }
        }
    }

    return (
        <div>
            <form onSubmit={(e) => onSubmit(e)}>

                <div className="mb-3">
                    <label for="inventory_type" className="form-label">{info[1].display_name}</label>
                    <input
                        type="text"
                        className={`form-control bg-${theme.mainBackground}`}
                        id="data"
                        onChange={(e) => onChange(e)}
                        required
                        value={data}
                    ></input>
                </div>

                <div className={error !== '' ? "d-block text-danger bold text-center mb-3" : 'd-none'}>
                    {error}
                </div>
                <div className={success !== '' ? "d-block text-success bold text-center mb-3" : 'd-none'}>
                    {success}
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

export default Modification_form