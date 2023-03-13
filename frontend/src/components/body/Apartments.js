import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "./table/Table";
import Tools from "./Tools";
import { getApartments } from "../state/features/apartmentSlice";

function Apartments() {
  const page = useSelector((state) => state.view.page);
  const apartments = useSelector((state) => state.apartments);

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

export default Apartments;
