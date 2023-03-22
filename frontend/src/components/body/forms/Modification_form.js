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

    //Submit function
    const onSubmit = (e) => {
        e.preventDefault()
        if (page === "Apartment") {
            let request = {
                apartment_id: apartment.id,
                data_type: info[1].name,
                new_data: data
            }
            dispatch(updateApartment(request))
        } else if (page === "Tenant") {
            let request = {
                tenant_id: tenant.id,
                data_type: info[1].name,
                new_data: data
            }
            dispatch(updateTenant(request))
        }
        setError("")
        validation()
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