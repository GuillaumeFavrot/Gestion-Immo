import React from "react";
import { useSelector } from "react-redux";

function Home() {
  const page = useSelector((state) => state.view.page);

  return (
    <div className={page === "Home" ? "page container-xxl" : "d-none"}>
      <div>Home</div>
    </div>
  );
}

export default Home;
