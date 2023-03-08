// Test component only

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { CheckIcon, TrashIcon } from '@primer/octicons-react'
import { modifyTestMessage, deleteTestMessage } from './state/features/testSlice'


export default function TestMessage({message}) {

  const dispatch = useDispatch()

  const [messageState, setMessageState] = useState('display')

  const [newMessage, setNewMessage] = useState('')

  const onMessageChange = (e) => {
    setNewMessage(e.target.value)
  }

  const messageModification = (e) => {
    dispatch(modifyTestMessage({
      message : newMessage,
      id :  message._id
    }))
    setToDisplay()
    setNewMessage('')    
  }

  const messageDeleteRequest = () => {
    dispatch(deleteTestMessage(message._id))
  }

  const setToModification = () => {
    setMessageState('modification')
  }

  const setToDisplay = () => {
    setMessageState('display')
  }

  return (
    <div className='mb-2'>
      <h6>Message : </h6> 
      <form className='d-flex justify-content-between align-items-center'>
        <div className='d-flex justify-content-start'>
          <a onClick={() => messageDeleteRequest()}className="text-danger me-1" type="submit" href="/">
            <TrashIcon size={16} />
          </a>
          <p onClick={() => setToModification()} className={messageState === 'display' ? 'mb-0 d-block' : 'd-none'}>
            {message.message}
          </p>
          <div className={messageState === 'display' ? 'd-none' : 'd-flex'}>
            <input onChange={(e) => onMessageChange(e)} className='form-control-sm'/>
            <a onClick={(e) => messageModification(e)} className="text-danger ps-1" type="submit" href="/">
              <CheckIcon size={16} />
            </a>
          </div>
        </div>
      </form>
      <hr />
    </div>
  )
}