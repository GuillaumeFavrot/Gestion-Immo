// Test component only

import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTestMessage } from './state/features/testSlice'
import TestMessage from './TestMessage'

export default function Test() {

  const test = useSelector(state => state.test)

  const [newMessage, setNewMessage] = useState('')

  const dispatch = useDispatch()

  console.log(test)

  const onMessageChange = (e) => {
    setNewMessage(e.target.value)
    console.log(newMessage)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(addTestMessage({message : newMessage}))
    setNewMessage('')
  }


  return (
    <div>
      <h1 className='text-center'>API Tester</h1>
      <form onSubmit={(e)=>{onSubmit(e)}} className='d-flex flex-column justify-content-center'>
        <div className="mb-3">
          <label className="form-label text-center">Enter your test message</label>
          <input onChange ={(e)=>onMessageChange(e)} type="testMessage" className="form-control" id="testMessage" value={newMessage}></input>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <hr />
      <div>
        <h4 className='text-center w-100'>Server response</h4>
        <p className='text-center w-100'>{test.statusText}</p>
      </div>
      <hr />
      {test.messages.map((message)=>(
        <TestMessage key={message._id} message={message}/>
      ))}
    </div>
  )
}
