import React from "react";
import { useSelector } from "react-redux";
import Table from "./table/Table";
import Tools from "./Tools";

function Tenants() {
  const page = useSelector((state) => state.view.page);
  const tenants = useSelector((state) => state.tenants);

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