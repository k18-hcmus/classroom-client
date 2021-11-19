import React, { useEffect, useState } from 'react'
import Header from 'src/components/Header/Header'
import axiosClient from 'src/axiosClient'
import { useParams } from 'react-router-dom'
import { Grid, Typography, Container } from '@mui/material'
import partition from 'lodash/partition'
import ListUsers from './List/ListUsers'
import { Redirect } from 'react-router-dom'

const UserList = () => {
  const [users, setUsers] = useState([])
  const [errorMsg, setErrorMsg] = useState('')
  const { id } = useParams()

  useEffect(() => {
    const fetchUserClassrooms = async () => {
      try {
        const response = await axiosClient.get(`/api/classrooms/${id}/users`)
        setUsers(response.data)
      } catch (error) {
        setErrorMsg(error.response.data.message)
      }
    }

    fetchUserClassrooms()
  }, [])
  const [students, teachers] = partition(users, (u) => u.role === 'STUDENT')

  const renderTeachersList = () => {
    return (
      <Grid>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Teacher
        </Typography>
        <ListUsers users={teachers} />
      </Grid>
    )
  }

  const renderStudentsList = () => {
    return (
      <Grid sx={{ flexGrow: 1, maxWidth: '100%' }}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Student
        </Typography>
        <ListUsers users={students} />
      </Grid>
    )
  }
  return (
    <>
      <Header />
      {errorMsg ? (
        <Redirect to="/" />
      ) : (
        <Container maxWidth="lg" spacing={2}>
          {renderTeachersList()}
          {renderStudentsList()}
        </Container>
      )}
    </>
  )
}

export default UserList
