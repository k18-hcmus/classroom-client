import React, { useEffect, useState } from 'react'
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from '@mui/material'
import FolderIcon from '@mui/icons-material/Folder'
import styled from '@emotion/styled'
import axiosClient from 'src/axiosClient'
import { useParams } from 'react-router-dom'
import Layout from 'src/components/Layout.js'

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  )
}

const ListUsers = () => {
  const { id: classroomId } = useParams()

  const [users, setUsers] = useState([])
  useEffect(() => {
    async function fetchClassroomUsers() {
      const response = await axiosClient.get(`/api/classrooms/${classroomId}/users`)
      setUsers(response.data)
    }

    fetchClassroomUsers()
  }, [])

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            User List
          </Typography>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar src="https://toppng.com/uploads/preview/app-icon-set-login-icon-comments-avatar-icon-11553436380yill0nchdm.png" />
              </ListItemAvatar>
              <ListItemText primary="temp user" />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default ListUsers
