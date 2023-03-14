import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createApartment } from "../../state/features/apartmentSlice";

function ApartmentForm({validation}) {
  //Application state
  const theme = useSelector((state) => state.view.theme);

  //Component state
  const [address_1, setAddress_1] = useState("");
  const [address_2, setAddress_2] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");
  const [monthly_charges, setMonthly_charges] = useState(0);
  const [monthly_rent, setMonthly_rent] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [in_management, setIn_management] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  //Dispatcher setup
  const dispatch = useDispatch();

  //Modification function

  let setters = {
    address_1: setAddress_1,
    address_2: setAddress_2,
    zipcode: setZipcode,
    city: setCity,
    monthly_charges: setMonthly_charges,
    monthly_rent: setMonthly_rent,
    deposit: setDeposit,
    in_management: setIn_management,
  };

  const onChange = (e) => {
    if (
      e.target.id === "monthly_charges" ||
      e.target.id === "monthly_rent" ||
      e.target.id === "deposit"
    ) {
      setters[e.target.id](parseFloat(e.target.value));
    } else if (e.target.id != "in_management") {
      setters[e.target.id](e.target.value);
    } else {
      setters[e.target.id](e.target.checked);
    }
    setSuccess("");
  };

  //Submit function
  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    let data = {
      address_1: address_1,
      address_2: address_2,
      zipcode: zipcode,
      city: city,
      monthly_charges: monthly_charges,
      monthly_rent: monthly_rent,
      deposit: deposit,
      in_management: in_management,
    };
    dispatch(createApartment(data))
    validation()
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <div className="mb-3">
          <label for="address_1" className="form-label">
            Addresse
          </label>
          <input
            type="text"
            className={`form-control bg-${theme.mainBackground}`}
            id="address_1"
            aria-describedby="adressHelp"
            onChange={(e) => onChange(e)}
            required
          ></input>
        </div>

        <div className="mb-3">
          <label for="address_2" className="form-label">
            Complément d'adresse
          </label>
          <input
            type="text"
            className={`form-control bg-${theme.mainBackground}`}
            id="address_2"
            aria-describedby="adressHelp"
            onChange={(e) => onChange(e)}
          ></input>
        </div>

        <div className="mb-3">
          <label for="zipcode" className="form-label">
            Code postal
          </label>
          <input
            type="text"
            className={`form-control bg-${theme.mainBackground}`}
            id="zipcode"
            aria-describedby="zipcodeHelp"
            onChange={(e) => onChange(e)}
            required
          ></input>
        </div>

        <div className="mb-3">
          <label for="city" className="form-label">
            Ville
          </label>
          <input
            type="text"
            className={`form-control bg-${theme.mainBackground}`}
            id="city"
            onChange={(e) => onChange(e)}
            required
          ></input>
        </div>

        <div className="mb-3">
          <label for="monthly_charges" className="form-label">
            Charges mensuelles
          </label>
          <input
            type="number"
            step="0.01"
            className={`form-control bg-${theme.mainBackground}`}
            id="monthly_charges"
            onChange={(e) => onChange(e)}
            required
          ></input>
        </div>

        <div className="mb-3">
          <label for="monthly_rent" className="form-label">
            Loyer mensuel
          </label>
          <input
            type="number"
            step="0.01"
            className={`form-control bg-${theme.mainBackground}`}
            id="monthly_rent"
            onChange={(e) => onChange(e)}
            required
          ></input>
        </div>

        <div className="mb-3">
          <label for="deposit" className="form-label">
            Caution
          </label>
          <input
            type="number"
            step="0.01"
            className={`form-control bg-${theme.mainBackground}`}
            id="deposit"
            onChange={(e) => onChange(e)}
            required
          ></input>
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className={`form-check-input bg-${theme.mainBackground}`}
            id="in_management"
            onChange={(e) => onChange(e)}
          ></input>
          <label className="form-check-label" for="in_management">
            En gestion ?
          </label>
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-success">
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
}

export default ApartmentForm;
