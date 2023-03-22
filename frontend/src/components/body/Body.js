import React from "react"
import { useSelector } from "react-redux"
import Apartment from "./Apartment"
import Tenant from "./Tenant"
import Apartments from "./Apartments"
import Tenants from "./Tenants"

function Body() {
  
  //Application state
  const theme = useSelector((state) => state.view.theme)

  return (
    <div className={`body d-flex flex-column text-${theme.text} bg-${theme.mainBackground}`}>
      <Apartments />
      <Tenants />
      <Apartment />
      <Tenant />
    </div>
  );
}

export default Body;
