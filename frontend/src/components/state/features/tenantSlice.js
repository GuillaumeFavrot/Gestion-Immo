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
  async () => {
    try {
      const response = await api.get(`/api/tenants`)
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
    console.log(data)
    try {
      const response = await api.post(`/api/tenants`, data)
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
  },
  reducers: {},
});

export default tenantSlice.reducer;
