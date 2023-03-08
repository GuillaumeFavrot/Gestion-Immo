// The store.js file is the centerpiece of the redux state manager. 
// The store act as a local DB accessible by all components of the app. However it is reinitialized each time the page is reloaded.
// The data of the store are altered by reducers, those reducers are combined in the present file in the configureStore function.
// The present template has only one reducers but a more complex app will have multiple.
// For more information on Redux setup refer to the official documentation : https://redux.js.org/ 

import { configureStore } from '@reduxjs/toolkit'
import { testReducer } from './features/testSlice'

export default configureStore({
  reducer: {
    test: testReducer
  }
})