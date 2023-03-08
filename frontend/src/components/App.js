// The App.js file is the main component of the app.
// All other components are organized inside this App.js file.

import React from 'react'
import Test from './Test'
import { useEffect } from 'react'
import { getTestMessage } from './state/features/testSlice'
import { useDispatch } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTestMessage())
  }, [])

  return (
    <div className='application container d-flex justify-content-center align-items-center'>
      <Test />
    </div>
  )
}

export default App