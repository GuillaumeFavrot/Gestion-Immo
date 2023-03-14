import React from "react";
import { useSelector, useDispatch } from "react-redux";
import InformationTable from "./informationTable/InformationTable";
import Table from "./table/Table";

function Apartment() {
  //Application state
  const page = useSelector((state) => state.view.page);
  const apartments = useSelector((state) => state.apartments);

  return (
    <div className={page === "Apartment" ? "page container-xxl" : "d-none"}>
      <div className="Title">
        <InformationTable item={apartments.apartment} displayed_info={apartments.info_table_headings}/>
      </div>
      <div>
        <h5>Liste des dépots</h5>
        <Table
          headings={apartments.deposit_headings}
          data={apartments.apartment.deposit_bill}
          pay={true}
        />
      </div>
      <div>
        <h5>Liste des loyers</h5>
        <Table
          headings={apartments.rent_headings}
          data={apartments.apartment.rent_bills}
          pay={true}
        />
      </div>
      <div>
        Outils
        <button>Assigner un locataire à cet appartement</button>
        <button>Départ du locataire</button>
        <button>Ajouter un état des lieux</button>
      </div>
    </div>
  );
}

export default Apartment;