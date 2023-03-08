// This file houses all reducers and action creators functions.
// All action creators and reducers can now be written in the same file known as a slice. 
// Its is possible to write all redux logic in one single slice file however splitting this logic in multiple slices is also possible.
// There is multiple ways to write this file.
// In this template this file has been setup to use :
//  => createAsyncThunk : this function is the new recommended way to handle asynchronous call within redux 
//  => Axios : this packages handles http request. It has been chosen in this template because it has better error handling than regular fetch requests
//  => Async/await : to handle asynchronous db calls. 
// This template features the four main types of DB requests.

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
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

export const getTestMessage = createAsyncThunk(
  'test/getTestMessage',
  async () => {
    try {
      const response = await api.get(`/api/test`)
      return JSON.stringify(response)
    }
    catch (e) {
      console.log(e)
      throw(e)
    }
  }
)

export const addTestMessage = createAsyncThunk(
  'test/addTestMessage',
  async (testMessage) => {
    try{
      const response = await api.post(`/api/test`, testMessage)
      return JSON.stringify(response)
    }
    catch (e) {
      return JSON.stringify({
        data: [],
        status: "Null",
        statusText: e.message
      })
    }
  }
)

export const modifyTestMessage = createAsyncThunk(
  'test/modifyTestMessage',
  async (data) => {
    try {
      const response = await api.put(`/api/test`, data)
      return JSON.stringify(response)
    }
    catch (e) {
      throw(e)
    }
  }
)

export const deleteTestMessage = createAsyncThunk(
  'test/deleteTestMessage',
  async (id) => {
    try {
      console.log(id)
      const response = await api.delete(`/api/test`, {data : {id : id}})
      console.log(JSON.stringify(response))
      return JSON.stringify(response)
    }
    catch (e) {
      throw(e)
    }
  }
)

// Initial state and reducers
// Each CRUD action have is own set of functions in order to modify the state whether the action is pending, fulfilled or rejected.
// All request errors are handled. 
// However the "pending" spinner has not been implemented because the nature of test requests does not require it (they are almost instanteneous).
// All reducers are standard and do not need many modifications except the name of the action creators.

const initialState = {
  messages: [],
  loading: false,
  statusText: '',
}

export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {},
  extraReducers: {

    //GET reducers  
    [getTestMessage.pending]: (state) => {
      state.loading = true
    },
    [getTestMessage.fulfilled]: (state, { payload } ) => {
      let res = JSON.parse(payload)
      state.loading = false
      state.statusText = `GET Request ${res.statusText} with status code ${res.status}`
      state.messages = res.data
    },
    [getTestMessage.rejected]: (state, { error } ) => {
      console.log(error)
      state.loading = false
      state.statusText = error.message === 'Network Error' ? 'GET request failed with status code 404' : `GET ${error.message}`
    },

    //POST reducers
    [addTestMessage.pending]: (state) => {
      state.loading = true
    },
    [addTestMessage.fulfilled]: (state, { payload } ) => {
      let res = JSON.parse(payload)
      state.loading = false
      state.statusText = res.status !== 'Null' ? `POST Request ${res.statusText} with status code ${res.status}` : 'POST request failed with status code 404'  
      state.messages = res.data
    },
    [addTestMessage.rejected]: (state, { error }) => {
      state.loading = false
      state.statusText = `POST ${error.message}`
    },

    //PUT reducers
    [modifyTestMessage.pending]: (state) => {
      console.log('pending')
      state.loading = true
    },
    [modifyTestMessage.fulfilled]: (state, { payload } ) => {
      console.log('fulfilled')
      let res = JSON.parse(payload)
      state.loading = false
      state.statusText = `PUT Request ${res.statusText} with status code ${res.status}`
      state.messages = res.data
    },
    [modifyTestMessage.rejected]: (state, { error }) => {
      console.log('rejected')
      state.loading = false
      state.statusText = `PUT ${error.message}`
    },
  
    //DELETE reducers
    [deleteTestMessage.pending]: (state) => {
      state.loading = true
    },
    [deleteTestMessage.fulfilled]: (state, { payload } ) => {
      let res = JSON.parse(payload)
      state.loading = false
      state.statusText = `DELETE Request ${res.statusText} with status code ${res.status}`
      state.messages = res.data
    },
    [deleteTestMessage.rejected]: (state, { error }) => {
      state.loading = false
      state.statusText = `DELETE ${error.message}`
    }
  },
})

export const testReducer = testSlice.reducer




