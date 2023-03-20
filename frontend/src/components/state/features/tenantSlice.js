import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
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

export const getTenants = createAsyncThunk(
  'tenants/getTenants',
  async (data) => {
    try {
      const response = await api.get(`/api/tenants`, {params: {data: data}})
      return JSON.stringify(response)
    }
    catch (e) {
      throw(e)
    }
  }
)

export const createTenant = createAsyncThunk(
  'tenants/createTenant',
  async (data) => {
    try {
      const response = await api.post(`/api/tenants`, data)
      return JSON.stringify(response)
    }
    catch (e) {
      throw(e)
    }
  }
)

export const getTenant = createAsyncThunk(
  'tenant/getTenant',
  async (id) => {
    try {
      const response = await api.post(`/api/tenant`, id)
      return JSON.stringify(response)
    }
    catch (e) {
      throw(e)
    }
  }
)

export const deleteTenant = createAsyncThunk(
  'tenant/deleteTenant',
  async (id) => {
    try {
      const response = await api.delete(`/api/tenant`, {data : {id : id}})
      return JSON.stringify(response)
    }
    catch (e) {
      throw(e)
    }
  }
)

export const updateTenant = createAsyncThunk(
  'tenant/updateTenant',
  async (data) => {
    try {
      const response = await api.put(`/api/tenant`, data)
      return JSON.stringify(response)
    }
    catch (e) {
      throw(e)
    }
  }
)

export const createRentBill = createAsyncThunk(
  'tenant/createRentBill',
  async (request) => {
    try {
      const response = await api.post(`/api/tenant/bill`, request)
      return JSON.stringify(response)
    }
    catch (e) {
      throw(e)
    }
  }
)

export const payBill = createAsyncThunk(
  'tenant/payBill',
  async (request) => {
    try {
      const response = await api.put(`/api/tenant/bill`, request)
      return JSON.stringify(response)
    }
    catch (e) {
      throw(e)
    }
  }
)

export const receiptRequest = createAsyncThunk(
  'tenant/receiptRequest',
  async (request) => {
    try {
      const response = await api.post(`/api/tenant/receipt`, request)
      return JSON.stringify(response)
    }
    catch (e) {
      throw(e)
    }
  }
)

const tenantSlice = createSlice({
  name: "tenants",
  initialState: {
    headings: {
      id: "ID",
      lastname: "Nom de famille",
      firstname: "Prénom",
      email: "Email",
      caf_payment: "APL",
      apl_amount: "Montant des APL"
    },
    short_headings: {
      id: "ID",
      lastname: "Nom de famille",
      firstname: "Prénom",
    },
    deposit_headings: {
      id: "ID",
      apartment_id: "ID Logement",
      total_amount: "Montant total",
      paid_amount: "Montant réglé",
      status: "Status",
    },
    rent_headings: {
      id: "ID",
      apartment_id: "ID Logement",
      total_amount: "Montant total",
      paid_amount: "Montant réglé",
      issue_date: "Date d'émission",
      due_date: "Date d'échéance",
      period: "Période",
    },
    apartment_headings: {
      id: "ID",
      address_1: "Adresse",
      address_2: "Complément d'adresse",
      zipcode: "Code postal",
      city: "Ville",
      in_management: "En gestion",
      management_fees: "Frais de gestion"
    },
    info_table_headings: [
      {
        name: "id",
        display_name: "ID", 
        modifiable: false
      },
      {
        name: "lastname",
        display_name: "Nom de famille", 
        modifiable: true
      },
      {
        name: "firstname",
        display_name: "Prénom", 
        modifiable: true
      },
      {
        name: "email",
        display_name: 'E-mail', 
        modifiable: true
      },
      {
        name: "caf_payment",
        display_name: 'Prélèvement CAF ?', 
        modifiable: true
      },
      {
        name: "apl_amount",
        display_name: 'montant des APL', 
        modifiable: true
      }
    ],

    tenant: {
      firstname: "",
      lastname: "",
      email: "",
      caf_payment: "",
      id: "",
      apartments: [],
      deposit_bills: [],
      rent_bills: [],
    },

    tenants: [],

    loading: false,

    statusText: '',
  },
  reducers: {},
  extraReducers: {

    //POST Tenant reducer 
    [createTenant.pending]: (state) => {
      state.loading = true
    },
    [createTenant.fulfilled]: (state, { payload } ) => {
      let res = JSON.parse(payload)
      state.loading = false
      state.statusText = `POST Request ${res.statusText} with status code ${res.status}`
      state.tenants = res.data
    },
    [createTenant.rejected]: (state, { error } ) => {
      state.loading = false
      state.statusText = error.message === 'Network Error' ? 'POST request failed with status code 404' : `POST ${error.message}`
    },

    //GET Tenants reducer  
    [getTenants.pending]: (state) => {
      state.loading = true
    },
    [getTenants.fulfilled]: (state, { payload } ) => {
      let res = JSON.parse(payload)
      console.log(res.data)
      state.loading = false
      state.statusText = `GET Request ${res.statusText} with status code ${res.status}`
      state.tenants = res.data
    },
    [getTenants.rejected]: (state, { error } ) => {
      state.loading = false
      state.statusText = error.message === 'Network Error' ? 'GET request failed with status code 404' : `GET ${error.message}`
    },

    //GET Tenant reducer  
    [getTenant.pending]: (state) => {
      state.loading = true
    },
    [getTenant.fulfilled]: (state, { payload } ) => {
      let res = JSON.parse(payload)
      state.loading = false
      state.statusText = `GET Request ${res.statusText} with status code ${res.status}`
      state.tenant = res.data
    },
    [getTenant.rejected]: (state, { error } ) => {
      state.loading = false
      state.statusText = error.message === 'Network Error' ? 'GET request failed with status code 404' : `GET ${error.message}`
    },

    //DELETE tenant reducers
    [deleteTenant.pending]: (state) => {
      state.loading = true
    },
    [deleteTenant.fulfilled]: (state, { payload } ) => {
      let res = JSON.parse(payload)
      state.loading = false
      state.statusText = `DELETE Request ${res.statusText} with status code ${res.status}`
      state.tenants = res.data
    },
    [deleteTenant.rejected]: (state, { error }) => {
      state.loading = false
      state.statusText = `DELETE ${error.message}`
    },

    //PUT Update tenant reducers
    [updateTenant.pending]: (state) => {
      state.loading = true
    },
    [updateTenant.fulfilled]: (state, { payload } ) => {
      let res = JSON.parse(payload)
      state.loading = false
      state.statusText = `PUT Request ${res.statusText} with status code ${res.status}`
      state.tenant = res.data
    },
    [updateTenant.rejected]: (state, { error }) => {
      state.loading = false
      state.statusText = `PUT ${error.message}`
    },

    //POST new rent bill
    [createRentBill.pending]: (state) => {
      state.loading = true
    },
    [createRentBill.fulfilled]: (state, { payload } ) => {
      let res = JSON.parse(payload)
      state.loading = false
      state.statusText = `POST Request ${res.statusText} with status code ${res.status}`
      state.tenant = res.data
    },
    [createRentBill.rejected]: (state, { error } ) => {
      state.loading = false
      state.statusText = error.message === 'Network Error' ? 'POST request failed with status code 404' : `POST ${error.message}`
    },

    //PUT pay bill
    [payBill.pending]: (state) => {
      state.loading = true
    },
    [payBill.fulfilled]: (state, { payload } ) => {
      let res = JSON.parse(payload)
      state.loading = false
      state.statusText = `PUT Request ${res.statusText} with status code ${res.status}`
      state.tenant = res.data
    },
    [payBill.rejected]: (state, { error } ) => {
      state.loading = false
      state.statusText = error.message === 'Network Error' ? 'PUT request failed with status code 404' : `PUT ${error.message}`
    },
  },
});

export default tenantSlice.reducer;
