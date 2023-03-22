import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { modifyPage } from "./../state/features/view_slice"

function Footer() {

  //State application
  const theme = useSelector((state) => state.view.theme)

  //Page request function
  const pageRequest = (e, request) => {
    e.preventDefault()
    dispatch(modifyPage(request))
  };

  //Usedispatch setup
  const dispatch = useDispatch()

  return (
    <div>
      <nav className={`footer navbar d-flex bg-${theme.secondaryBackground} border-top border-${theme.border}`}>
        <div className={`container-fluid text-${theme.text}`}>
          <button className={`btn btn-footer btn-${theme.background} text-${theme.text} mb-1`} onClick={(e) => pageRequest(e, "Home")}>
            <h5 className="mb-0 bold">GestImmo</h5>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Footer;
