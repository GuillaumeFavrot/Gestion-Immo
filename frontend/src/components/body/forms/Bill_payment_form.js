import React, {useState} from 'react'
import { useSelector, useDispatch } from "react-redux"
import { payBill } from '../../state/features/tenant_slice'


function Bill_payment_form({validation, bill}) {

    //Application state
    const page = useSelector((state) => state.view.page)
    const theme = useSelector((state) => state.view.theme)
    const apartment = useSelector((state) => state.apartments.apartment)
    const tenant = useSelector((state) => state.tenants.tenant)

    //local state
    const [paid_amount, setPaidAmount] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    //Distatch setup
    const dispatch = useDispatch()

    //Bill type detection
    let bill_type = "rent"
    let bill_details = {}
    
    if (bill['deposit_amount']) {
        bill_type = "deposit"
        bill_details = [
            ["Montant de la caution", bill['deposit_amount']]
        ]
    } else {
        if (apartment['in_management'] === true)
            bill_details = [
                ["Montant du loyer:", apartment['monthly_rent']],
                ["Montant de la caution:", apartment['monthly_charges']],
                ["Frais de gestion:", apartment['management_fees']],
            ]
        else {
            bill_details = [
                ["Montant du loyer:", bill['monthly_rent']],
                ["Montant de la caution:", bill['monthly_charges']]
            ]
        }        
    }

    //APL detection
    let apl = false
    let apl_amount = 0
    if (tenant.caf_payment === true && !bill['deposit_amount']) {
        apl = true
        apl_amount = tenant.apl_amount
    }

    //input detection function
    const onChange = (e) => {
        setPaidAmount(e.target.value)
        setSuccess("")
    }

    //Form submit function
    const onSubmit = (e) => {
        e.preventDefault()
        if (parseInt(paid_amount) < 0 || parseInt(paid_amount) === 0 ) {
            setError("Le montant de règlement saisi doit être un nombre décimal positif non nul")
        }

        else if (parseInt(paid_amount) > bill['total_amount'] - bill['paid_amount'] - apl_amount) {
            setError("Le montant de règlement saisi est supérieur au montant dû")
        }

        else {
            setError("")
            setSuccess("Règlement enregistré")
            validation()
            e.preventDefault()
            let request = {
                type: bill_type,
                tenant: tenant.id,
                bill: bill.id,
                paid_amount: paid_amount
            }
            dispatch(payBill(request))
        }

    }

    return (
        <div>
            <div className={`card mb-3 bg-${theme.secondaryBackground} border`}>
                <div className="card-body pb-1">
                    <h6 className={`card-title bg-${theme.secondaryBackground} text-${theme.text}`}>Détail de la facture</h6>
                    <ul className="list-group list-group-flush">
                        
                        {bill_details.map(([title, data]) => (
                            <li className={`list-group-item bg-${theme.secondaryBackground} grid d-flex flex-row`}>
                                <div className={`text-${theme.text} payment-card-title`}>
                                    {title}
                                </div>
                                <div className={`text-${theme.text} payment-table-content bold`}>
                                    {data}      
                                </div>
                            </li>
                        ))}

                        <li className={ `list-group-item bg-${theme.secondaryBackground} grid d-flex flex-row`}>
                            <div className={`text-${theme.text} payment-card-title bold big`}>
                                Total
                            </div>
                            <div className={`text-${theme.text} payment-table-content bold big`}>
                                {bill['total_amount']}
                            </div>
                        </li>

                        <li className={apl == true ? `list-group-item bg-${theme.secondaryBackground} grid d-flex flex-row` : "d-none"}>
                            <div className={`text-${theme.text} payment-card-title`}>
                                Montant des APL
                            </div>
                            <div className={`text-${theme.text} payment-table-content bold`}>
                                {apl_amount}
                            </div>
                        </li>

                        <li className={ `list-group-item bg-${theme.secondaryBackground} grid d-flex flex-row`}>
                            <div className={`text-${theme.text} payment-card-title`}>
                                Montant payé
                            </div>
                            <div className={`text-${theme.text} payment-table-content bold`}>
                                {bill['paid_amount']}
                            </div>
                        </li>

                        <li className={ `list-group-item bg-${theme.secondaryBackground} grid d-flex flex-row`}>
                            <div className={`text-${theme.text} payment-card-title bold big`}>
                                Reste à payer
                            </div>
                            <div className={`text-${theme.text} payment-table-content bold big`}>
                                {bill['total_amount'] - bill['paid_amount'] - apl_amount}
                            </div>
                        </li>
                    </ul>
                </div>

                <form className='p-3' onSubmit={(e) => onSubmit(e)} cl>  
                    <div className="mb-3">
                        <label for="paid_amount" className="form-label">Montant que vous souhaitez règler</label>
                        <input type="number" step="0.01" className={`form-control bg-${theme.mainBackground}`} id="paid_amount" aria-describedby="adressHelp" onChange={(e) => onChange(e)}></input>
                    </div>
                    
                    <div className={error !== '' ? "d-block text-danger bold text-center mb-3" : 'd-none'}>
                        {error}
                    </div>
                    <div className={success !== '' ? "d-block text-success bold text-center mb-3" : 'd-none'}>
                        {success}
                    </div>

                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-success">Envoyer</button>
                    </div>
                </form>
                
            </div>
        </div>
    )
}

export default Bill_payment_form