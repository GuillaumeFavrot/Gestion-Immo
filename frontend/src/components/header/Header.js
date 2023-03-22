import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { modifyPage } from "./../state/features/view_slice"

function Header() {

    //Application state
    const theme = useSelector((state) => state.view.theme);

    //Page request function
    const pageRequest = (e, request) => {
        e.preventDefault()
        dispatch(modifyPage(request))
    }

    //Usedispatch setup
    const dispatch = useDispatch()

    return (
        <nav className={`header navbar fixed-top bg-${theme.secondaryBackground} border-bottom border-${theme.border}`}>
            <div className={`container-fluid text-${theme.text}`}>

                <button className={`btn btn-${theme.background} text-${theme.text} mb-1`} onClick={(e) => pageRequest(e, "Apartments")}>
                    <h1 className="mb-0 bold">GestImmo</h1>
                </button>

                <div>
                    <button className={`btn btn-${theme.background} text-${theme.text} fw-bold mt-1 me-3 ms-3`} onClick={(e) => pageRequest(e, "Apartments")}>
                        Appartements
                    </button>

                    <button className={`btn btn-${theme.background} text-${theme.text} fw-bold mt-1 me-3 ms-3`} onClick={(e) => pageRequest(e, "Tenants")}>
                        Locataires
                    </button>
                </div>
                
            </div>
        </nav>
    );
}

export default Header;
