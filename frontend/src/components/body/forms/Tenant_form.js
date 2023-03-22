import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { createTenant } from "../../state/features/tenant_slice"

function TenantForm({validation}) {
    
    //Application state
    const theme = useSelector((state) => state.view.theme)

    //Component state
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [caf_payment, setCaf_payment] = useState(false)
    const [apl_amount, setApl_amount] = useState(0)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    //Dispatcher setup
    const dispatch = useDispatch()

    //Modification function
    let setters = {
        firstname: setFirstname,
        lastname: setLastname,
        email: setEmail,
        caf_payment: setCaf_payment,
        apl_amount: setApl_amount,
    }
    
    const onChange = (e) => {
        if (e.target.id === "apl_amount") {
            setters[e.target.id](parseFloat(e.target.value))
        } else if (e.target.id != "caf_payment") {
            setters[e.target.id](e.target.value)
        } else {
            setters[e.target.id](e.target.checked)
        }
        setSuccess("")
    }

    //Submit function
    const onSubmit = (e) => {
        e.preventDefault()
        setError("")
        let data = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            caf_payment: caf_payment,
            apl_amount: apl_amount,
        }
        dispatch(createTenant(data))
        validation()
    }

    return (
        <div>
            <form onSubmit={(e) => onSubmit(e)}>

                <div className="mb-3">
                    <label for="firstname" className="form-label">Prénom</label>
                    <input
                        type="text"
                        className={`form-control bg-${theme.mainBackground}`}
                        id="firstname"
                        aria-describedby="nameHelp"
                        onChange={(e) => onChange(e)}
                        required
                    ></input>
                </div>

                <div className="mb-3">
                    <label for="lastname" className="form-label">Nom</label>
                    <input
                        type="text"
                        className={`form-control bg-${theme.mainBackground}`}
                        id="lastname"
                        aria-describedby="nameHelp"
                        onChange={(e) => onChange(e)}
                        required
                    ></input>
                </div>

                <div className="mb-3">
                    <label for="email" className="form-label">E-mail</label>
                    <input
                        type="email"
                        className={`form-control bg-${theme.mainBackground}`}
                        id="email"
                        aria-describedby="emailHelp"
                        onChange={(e) => onChange(e)}
                        required
                    ></input>
                </div>

                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className={`form-check-input bg-${theme.mainBackground}`}
                        id="caf_payment"
                        onChange={(e) => onChange(e)}
                    ></input>
                    <label className="form-check-label" for="caf_payment">APL ?</label>
                </div>

                <div className={caf_payment == true ? "mb-3" : "d-none"}>
                    <label for="apl_amount" className="form-label">Montant des APL</label>
                    <input
                        type="number"
                        step="0.01"
                        className={`form-control bg-${theme.mainBackground}`}
                        id="apl_amount"
                        onChange={(e) => onChange(e)}
                    ></input>
                </div>

                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-success">
                        Envoyer
                    </button>
                </div>

            </form>
        </div>
    );
}

export default TenantForm;
