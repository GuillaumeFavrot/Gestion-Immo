import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

//URL and axios setup

let url = ''

  // If no base URL (or an empty string) is given the main app address will be used. In production this is fine because the main Heroku app address serves the Django app.
  // Since React is also served by Django the correct URL is used.
  // However in development React runs on its own server so we have to specify the address (the Django server address) where requests have to be sent.
  // This section is generic and does not have to be modified. 
if(process.env.NODE_ENV === 'development') {
  url = 'http://127.0.0.1:5000'
}

const api = axios.create({
  baseURL: url,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Action creators
// All action creators are rigged to handle basic CRUD operations and throw query errors.
// Just modify the function and variable names to suit your needs.

export const getApartments = createAsyncThunk(
  'apartments/getApartments',
  async () => {
    try {
      const response = await api.get(`/api/apartments`)
      return JSON.stringify(response)
    }
    catch (e) {
      throw(e)
    }
  }
)

export const createApartment = createAsyncThunk(
  'apartments/createApartment',
  async (data) => {
    console.log(data)
    try {
      const response = await api.post(`/api/apartments`, data)
      return JSON.stringify(response)
    }
    catch (e) {
      throw(e)
    }
  }
)

export const deleteApartment = createAsyncThunk(
  'test/deleteApartment',
  async (id) => {
    try {
      const response = await api.delete(`/api/apartments`, {data : {id : id}})
      return JSON.stringify(response)
    }
    catch (e) {
      throw(e)
    }
  }
)


const apartmentSlice = createSlice({
  name: "apartments",
  initialState: {
    headings: {
      id: "ID",
      address_1: "Adresse",
      address_2: "Complément d'adresse",
      zipcode: "Code postal",
      city: "Ville",
      in_management: "En gestion",
      management_fees: "Frais de gestion"
    },
    deposit_headings: {
      id: "ID",
      tenant_id: "ID Locataire",
      total_amount: "Montant total",
      paid_amount: "Montant réglé",
      status: "Status",
    },
    rent_headings: {
      id: "ID",
      tenant_id: "ID Locataire",
      total_amount: "Montant total",
      paid_amount: "Montant réglé",
      issue_date: "Date d'émission",
      due_date: "Date d'échéance",
      period: "Période",
    },
    info_table_headings: [
      {
        name: "id",
        display_name: "ID", 
        modifiable: false
      },
      {
        name: "address_1",
        display_name: "Adresse", 
        modifiable: false
      },
      {
        name: "address_2",
        display_name: "Complément d'adresse", 
        modifiable: false
      },
      {
        name: "zipcode",
        display_name: 'Code postal', 
        modifiable: false
      },
      {
        name: "city",
        display_name: 'Ville', 
        modifiable: false
      },
      {
        name: "in_management",
        display_name: 'En gestion ?', 
        modifiable: false
      },      
      {
        name: "monthly_rent",
        display_name: 'Loyer mensuel', 
        modifiable: true
      },
      {
        name: "monthly_charges",
        display_name: 'Charges mensuelles', 
        modifiable: true
      },
      {
        name: "caution",
        display_name: 'Caution', 
        modifiable: true
      },
      {
        name: "current_tenant_id",
        display_name: 'ID du locataire', 
        modifiable: false
      },
      {
        name: "current_tenant_entry_date",
        display_name: "Date d'entrée du locataire", 
        modifiable: false
      },
    ],

    apartment: {
      id: "#12",
      address_1: "22 rue des accacias",
      address_2: "Cedex 36",
      zipcode: "68300",
      city: "Mulhouse",
      in_management: "True",
      monthly_charges: 50.0,
      monthly_rent: 800.0,
      deposit: 850.0,
      in_management: "True",
      management_fees: 64.0,
      tenant: {
        firstname: "Jean",
        lastname: "Valjean",
        email: "jean.valjean@gmail.com",
        caf_payment: "True",
        id: "#856",
      },
      deposit_bill: [
        {
          id: "#12333",
          apartment_id: "#12",
          tenant_id: "#856",
          total_amount: 850.0,
          paid_amount: 850.0,
          paid: true,
          issue_date: Date.now().toLocaleString("fr"),
          due_date: Date.now().toLocaleString("fr"),
          deposit_amount: 850.0,
          status: "active",
          refunded: false,
        },
      ],
      rent_bills: [
        {
          id: "#12333",
          apartment_id: "#12",
          tenant_id: "#856",
          total_amount: 850.0,
          paid_amount: 850.0,
          paid: true,
          issue_date: Date.now().toLocaleString("fr"),
          due_date: Date.now().toLocaleString("fr"),
          rent_amount: 800.0,
          charges: 50.0,
          management_fees: 64,
          period: "january_2023",
        },
        {
          id: "#12333",
          apartment_id: "#12",
          tenant_id: "#856",
          total_amount: 850.0,
          paid_amount: 0.0,
          paid: false,
          issue_date: Date.now().toLocaleString("fr"),
          due_date: Date.now().toLocaleString("fr"),
          rent_amount: 800.0,
          charges: 50.0,
          management_fees: 64,
          period: "february_2023",
        },
      ],
    },

    apartments: [
      // {
      //   id: "#12",
      //   address_1: "22 rue des accacias",
      //   address_2: "Cedex 36",
      //   zipcode: "68300",
      //   city: "Mulhouse",
      //   monthly_charges: 50.0,
      //   monthly_rent: 800.0,
      //   deposit: 850.0,
      //   in_management: "True",
      //   management_fees: 64.0,
      // },
      // {
      //   id: "#36",
      //   address_1: "16 rue des champs",
      //   address_2: "",
      //   zipcode: "67370",
      //   city: "Dingsheim",
      //   in_management: "True",
      //   monthly_charges: 30.0,
      //   monthly_rent: 600.0,
      //   deposit: 630.0,
      //   in_management: "True",
      //   management_fees: 48.0,
      // },
    ],
  },
  reducers: {},
  extraReducers: {

    //POST Apartement reducer 
    [createApartment.pending]: (state) => {
      state.loading = true
    },
    [createApartment.fulfilled]: (state, { payload } ) => {
      let res = JSON.parse(payload)
      console.log(res.data)
      state.loading = false
      state.statusText = `GET Request ${res.statusText} with status code ${res.status}`
      state.apartments = res.data
    },
    [createApartment.rejected]: (state, { error } ) => {
      state.loading = false
      state.statusText = error.message === 'Network Error' ? 'GET request failed with status code 404' : `GET ${error.message}`
    },

    //GET Apartements reducer  
    [getApartments.pending]: (state) => {
      state.loading = true
    },
    [getApartments.fulfilled]: (state, { payload } ) => {
      let res = JSON.parse(payload)
      console.log(res.data)
      state.loading = false
      state.statusText = `GET Request ${res.statusText} with status code ${res.status}`
      state.apartments = res.data
    },
    [getApartments.rejected]: (state, { error } ) => {
      state.loading = false
      state.statusText = error.message === 'Network Error' ? 'GET request failed with status code 404' : `GET ${error.message}`
    },

    //DELETE reducers
    [deleteApartment.pending]: (state) => {
      state.loading = true
    },
    [deleteApartment.fulfilled]: (state, { payload } ) => {
      let res = JSON.parse(payload)
      state.loading = false
      state.statusText = `DELETE Request ${res.statusText} with status code ${res.status}`
      state.apartments = res.data
    },
    [deleteApartment.rejected]: (state, { error }) => {
      state.loading = false
      state.statusText = `DELETE ${error.message}`
    }
  },
});

export default apartmentSlice.reducer;
