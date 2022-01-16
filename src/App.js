import React from 'react'
import Router from './Routes'
import { CssBaseline } from '@mui/material'
import './app.css'
import { fetchUser } from './redux/userSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import socket, { establishNewConnection } from 'src/socket'

function App() {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.user)
  const user = useSelector((state) => state.user.user)

  useEffect(() => {
    async function fetchAPI() {
      dispatch(fetchUser())
    }
    fetchAPI()
  }, [auth.isLogged, dispatch])

  useEffect(() => {
    if (!isEmpty(user)) {
      socket.connect()
      console.log(user)
      establishNewConnection(user.id)
    }
  }, [user])

  return (
    <div className="App">
      <CssBaseline />
      <Router />
    </div>
  )
}

export default App
