// The App.js file is the main component of the app.
// All other components are organized inside this App.js file.

import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "./header/Header"
import Footer from "./footer/Footer"
import Body from "./body/Body"

function App() {
  return (
    <div className="application d-flex flex-column">
      <Header />
      <Body />
      <Footer />
    </div>
  )
}

export default App