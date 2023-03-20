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
    try {
      const response = await api.post(`/api/apartments`, data)
      return JSON.stringify(response)
    }
    catch (e) {
      throw(e)
    }
  }
)

export const getApartment = createAsyncThunk(
  'apartments/getApartment',
  async (id) => {
    try {
      const response = await api.post(`/api/apartment`, id)
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
      const response = await api.delete(`/api/apartment`, {data : {id : id}})
      return JSON.stringify(response)
    }
    catch (e) {
      throw(e)
    }
  }
)

export const updateApartment = createAsyncThunk(
  'test/updateApartment',
  async (data) => {
    try {
      const response = await api.put(`/api/apartment`, data)
      return JSON.stringify(response)
    }
    catch (e) {
      throw(e)
    }
  }
)

export const assignTenant = createAsyncThunk(
  'apartment/assignTenant',
  async (data) => {
    try {
      const response = await api.put(`/api/apartment/assignment`, data)
      return JSON.stringify(response)
    }
    catch (e) {
      throw(e)
    }
  }
)

export const unassignTenant = createAsyncThunk(
  'apartment/unassignTenant',
  async (data) => {
    try {
      const response = await api.put(`/api/apartment/unassignment`, data)
      return JSON.stringify(response)
    }
    catch (e) {
      throw(e)
    }
  }
)

export const createInventory = createAsyncThunk(
  'apartment/createInventory',
  async (data) => {
    try {
      const response = await api.post(`/api/apartment/inventory`, data)
      return JSON.stringify(response)
    }
    catch (e) {
      throw(e)
    }
  }
)

export const modifyInventory = createAsyncThunk(
  'apartment/modifyInventory',
  async (data) => {
    try {
      const response = await api.put(`/api/apartment/inventory`, data)
      return JSON.stringify(response)
    }
    catch (e) {
      throw(e)
    }
  }
)

export const deleteInventory = createAsyncThunk(
  'apartment/deleteInventory',
  async (data) => {
    try {
      const response = await api.delete(`/api/apartment/inventory`, {data : {id : data.id, apartment_id: data.apartment_id}})
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
    tenant_headings: {
      id: "ID",
      lastname: "Nom de famille",
      firstname: "Prénom",
      email: "Email",
      caf_payment: "APL",
      apl_amount: "Montant des APL"
    },
    inventory_headings: {
      id: "ID",
      type: "Type d'état des lieux",
      tenant_id: "Locataire",
      date: "Date",
      remarks: "Remarques"
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
        name: "management_fees",
        display_name: 'Frais de gestion', 
        modifiable: false
      },
      {
        name: "deposit",
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
      id: "",
      address_1: "",
      address_2: "",
      zipcode: "",
      city: "",
      in_management: "",
      monthly_charges: 0,
      monthly_rent: 0,
      deposit: 0,
      in_management: "",
      management_fees: 0,
      tenant: {},
      deposit_bills: [],
      rent_bills: [],
      inventories: []
    },

    apartments: [],
  },
  reducers: {},
  extraReducers: {

    //POST Apartement reducer 
    [createApartment.pending]: (state) => {
      state.loading = true
    },
    [createApartment.fulfilled]: (state, { payload } ) => {
      let res = JSON.parse(payload)
      state.loading = false
      state.statusText = `POST Request ${res.statusText} with status code ${res.status}`
      state.apartments = res.data
    },
    [createApartment.rejected]: (state, { error } ) => {
      state.loading = false
      state.statusText = error.message === 'Network Error' ? 'POST request failed with status code 404' : `POST ${error.message}`
    },

    //GET Apartements reducer  
    [getApartments.pending]: (state) => {
      state.loading = true
    },
    [getApartments.fulfilled]: (state, { payload } ) => {
      let res = JSON.parse(payload)
      state.loading = false
      state.statusText = `GET Request ${res.statusText} with status code ${res.status}`
      state.apartments = res.data
    },
    [getApartments.rejected]: (state, { error } ) => {
      state.loading = false
      state.statusText = error.message === 'Network Error' ? 'GET request failed with status code 404' : `GET ${error.message}`
    },

    //GET Apartement reducer  
    [getApartment.pending]: (state) => {
      state.loading = true
    },
    [getApartment.fulfilled]: (state, { payload } ) => {
      let res = JSON.parse(payload)
      state.loading = false
      state.statusText = `GET Request ${res.statusText} with status code ${res.status}`
      state.apartment = res.data
    },
    [getApartment.rejected]: (state, { error } ) => {
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
    },

    //PUT update apartment reducers
    [updateApartment.pending]: (state) => {
      state.loading = true
    },
    [updateApartment.fulfilled]: (state, { payload } ) => {
      let res = JSON.parse(payload)
      state.loading = false
      state.statusText = `PUT Request ${res.statusText} with status code ${res.status}`
      state.apartment = res.data
    },
    [updateApartment.rejected]: (state, { error }) => {
      state.loading = false
      state.statusText = `PUT ${error.message}`
    },


    //PUT Assign tenant reducer reducer 
    [assignTenant.pending]: (state) => {
      state.loading = true
    },
    [assignTenant.fulfilled]: (state, { payload } ) => {
      let res = JSON.parse(payload)
      state.loading = false
      state.statusText = `PUT Request ${res.statusText} with status code ${res.status}`
      state.apartment = res.data
    },
    [assignTenant.rejected]: (state, { error } ) => {
      state.loading = false
      state.statusText = error.message === 'Network Error' ? 'PUT request failed with status code 404' : `PUT ${error.message}`
    },

    //PUT unassign tenant reducer reducer 
    [unassignTenant.pending]: (state) => {
      state.loading = true
    },
    [unassignTenant.fulfilled]: (state, { payload } ) => {
      let res = JSON.parse(payload)
      state.loading = false
      state.statusText = `PUT Request ${res.statusText} with status code ${res.status}`
      state.apartment = res.data
    },
    [unassignTenant.rejected]: (state, { error } ) => {
      state.loading = false
      state.statusText = error.message === 'Network Error' ? 'PUT request failed with status code 404' : `PUT ${error.message}`
    },

    //POST Create new inventory 
    [createInventory.pending]: (state) => {
      state.loading = true
    },
    [createInventory.fulfilled]: (state, { payload } ) => {
      let res = JSON.parse(payload)
      state.loading = false
      state.statusText = `POST Request ${res.statusText} with status code ${res.status}`
      state.apartment = res.data
    },
    [createInventory.rejected]: (state, { error } ) => {
      state.loading = false
      state.statusText = error.message === 'Network Error' ? 'POST request failed with status code 404' : `POST ${error.message}`
    },

    //PUT Modify an inventory 
    [modifyInventory.pending]: (state) => {
      state.loading = true
    },
    [modifyInventory.fulfilled]: (state, { payload } ) => {
      let res = JSON.parse(payload)
      state.loading = false
      state.statusText = `PUT Request ${res.statusText} with status code ${res.status}`
      state.apartment = res.data
    },
    [modifyInventory.rejected]: (state, { error } ) => {
      state.loading = false
      state.statusText = error.message === 'Network Error' ? 'PUT request failed with status code 404' : `PUT ${error.message}`
    },

    //DELETE modify an inventory 
    [deleteInventory.pending]: (state) => {
      state.loading = true
    },
    [deleteInventory.fulfilled]: (state, { payload } ) => {
      let res = JSON.parse(payload)
      state.loading = false
      state.statusText = `DELETE Request ${res.statusText} with status code ${res.status}`
      state.apartment = res.data
    },
    [deleteInventory.rejected]: (state, { error } ) => {
      state.loading = false
      state.statusText = error.message === 'Network Error' ? 'DELETE request failed with status code 404' : `DELETE ${error.message}`
    },
  },
});

export default apartmentSlice.reducer;
