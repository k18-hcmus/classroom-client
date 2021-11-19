import React, { useEffect, useState } from 'react'
import Header from 'src/components/Header/Header'
import axiosClient from 'src/axiosClient'
import { useParams } from 'react-router-dom'
import { Grid, Typography } from '@mui/material'
import partition from 'lodash/partition'
import ListUsers from './List/ListUsers'
import styled from '@emotion/styled'

const UserListContainer = styled(Grid)`
  flex-direction: column;
`

const UserList = () => {
  const [users, setUsers] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const fetchUserClassrooms = async () => {
      const response = await axiosClient.get(`/api/classrooms/${id}/users`)
      setUsers(response.data)
    }

    fetchUserClassrooms()
  }, [])
  const [students, teachers] = partition(users, (u) => u.role === 'STUDENT')

  const renderTeachersList = () => {
    return (
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Teacher
        </Typography>
        <ListUsers users={teachers} />
      </Grid>
    )
  }

  const renderStudentsList = () => {
    return (
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Student
        </Typography>
        <ListUsers users={students} />
      </Grid>
    )
  }
  return (
    <>
      <Header></Header>
      <UserListContainer container spacing={2}>
        {renderTeachersList()}
        {renderStudentsList()}
      </UserListContainer>
    </>
  )
}

export default UserList
