import React from "react";
import { useSelector } from "react-redux";
import Table from "./table/Table";
import Tools from "./Tools";

function Apartments() {
  const page = useSelector((state) => state.view.page);
  const apartments = useSelector((state) => state.apartments);

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
