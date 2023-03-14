import React from "react";
import { useSelector, useDispatch } from "react-redux";
import InformationTable from "./informationTable/InformationTable";
import Table from "./table/Table";

function Tenant() {
  //Application state
  const page = useSelector((state) => state.view.page);
  const tenants = useSelector((state) => state.tenants);

  return (
    <div className={page === "Tenant" ? "page container-xxl" : "d-none"}>
      <div className="Title">
        <InformationTable item={tenants.tenant} displayed_info={tenants.info_table_headings}/>
      </div>
      <div>
        <h5>Liste des dépots</h5>
        <Table
          headings={tenants.deposit_headings}
          data={tenants.tenant.deposit_bills}
          pay={true}
        />
      </div>
      <div>
        <h5>Liste des loyers</h5>
        <Table
          headings={tenants.rent_headings}
          data={tenants.tenant.rent_bills}
          pay={true}
        />
      </div>
      <div>
        Outils
        <button>Ajouter une facture</button>
        <button>Payer une facture</button>
        <button>Générer une quittance de loyer</button>
      </div>
    </div>
  );
}

export default Tenant;
