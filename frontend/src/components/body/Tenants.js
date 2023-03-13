import React, { useEffect } from "react";
import { useSelector ,useDispatch } from "react-redux";
import Table from "./table/Table";
import Tools from "./Tools";
import { getTenants } from "../state/features/tenantSlice";

function Tenants() {
  const page = useSelector((state) => state.view.page);
  const tenants = useSelector((state) => state.tenants);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTenants())
  }, [])

  return (
    <div className={page === "Tenants" ? "page container-xxl" : "d-none"}>
      <Tools />
      <Table
        headings={tenants.headings}
        data={tenants.tenants}
        consult={true}
        deletion={true}
        pay={false}
      />
    </div>
  );
}

export default Tenants;