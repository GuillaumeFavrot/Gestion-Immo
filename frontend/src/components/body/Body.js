import React from "react";
import { useSelector } from "react-redux";
import Apartment from "./Apartment";
import Tenant from "./Tenant";

import Apartments from "./Apartments";
import Home from "./Home";
import Tenants from "./Tenants";

function Body() {
  const theme = useSelector((state) => state.view.theme);
  return (
    <div
      className={`body d-flex flex-column text-${theme.text} bg-${theme.mainBackground}`}
    >
      <Home />
      <Apartments />
      <Tenants />
      <Apartment />
      <Tenant />
    </div>
  );
}

export default Body;
