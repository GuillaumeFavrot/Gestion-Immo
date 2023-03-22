import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Table from "./table/Table"
import Tools from "./Tools"
import { getApartments } from "../state/features/apartment_slice"

function Apartments() {

  //Application state
  const page = useSelector((state) => state.view.page)
  const apartments = useSelector((state) => state.apartments)

  //Usedispatch setups
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getApartments())
    }, [])

  return (
    <div className={page === "Apartments" ? "page container-xxl" : "d-none"}>
      <Tools />
      <Table
        headings={apartments.headings}
        data={apartments.apartments}
        consult={true}
        deletion={true}
        pay={false}
      />
    </div>
  );
}

export default Apartments
