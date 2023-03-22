import React, {useState} from 'react'
import { useSelector, useDispatch } from "react-redux"
import { receiptRequest } from '../../state/features/tenant_slice'

function ReceiptForm({validation}) {
    
    //Application state
    const theme = useSelector((state) => state.view.theme)
    const tenant = useSelector((state) => state.tenants.tenant)
    
    //Component state
    const [apartment, setApartment] = useState("")
    const [filteredBillList, setFilteredBillList] = useState([])
    const [checkedState, setCheckedState] = useState([])
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    //Dispatcher setup
    const dispatch = useDispatch()

    //Bill list setup
    let billList = tenant.rent_bills
    const createBillList = (apartment) => {
        let newlist = []
        let newStatelist = []
        for (let i=0; i < billList.length ; i++) {
            if (billList[i].apartment_id === apartment) {
                newlist.push(billList[i])
                newStatelist.push([billList[i], false])
            }
        }
        setFilteredBillList(newlist)
        setCheckedState(newStatelist)
    }
  
    //Modification function
    const onChange = (e) => {
        createBillList(e.target.value)
        setApartment(e.target.value)
        setSuccess("")
    };

    const onCheck = (e) => {
        let checked = checkedState
        for (let i=0; i<checkedState.length; i++) {
            if (checkedState[i][0].period === e.target.id){
                checked[i][1] = e.target.checked
                console.log(checked)
            }
        }
        setCheckedState(checked)
    }

    //Submit function
    const onSubmit = (e) => {
        e.preventDefault()
        setError("")
        let checked =[]
        for (let i=0; i<checkedState.length; i++) {
            if (checkedState[i][1] === true){
                checked.push(checkedState[i][0].period)
            }
        }
        let request = {
            tenant_id: tenant.id,
            apartment_id: apartment,
            period: checked
        }
        dispatch(receiptRequest(request))
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
                
                <div className={filteredBillList.length === 0 ? "d-none" : `input-group mb-3 d-flex flex-column`}onChange={(e) => onCheck(e)}>
                    {filteredBillList.map((bill) => (
                        <div className={`input-group-text border-dark bg-${theme.secondaryBackground} text-${theme.text}`}>
                            <input type="checkbox" className="form-check-input me-3" id={`${bill.period}`}  value={`${bill.period}`} ></input>
                            <label className="form-check-label" for={`check-${bill.period}`}>{bill.period}</label>
                        </div>
                    ))}
                </div>

                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-success">Envoyer</button>
                </div>

            </form>
        </div>
    )
}

export default ReceiptForm