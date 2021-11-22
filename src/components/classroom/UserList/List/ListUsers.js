import React from 'react'
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from '@mui/material'
import { Delete as DeleteIcon } from '@mui/icons-material'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import styled from '@emotion/styled'
import axiosClient from 'src/axiosClient'

const CustomList = styled(List)`
  max-height: 400px;
  overflow: auto;
`

const StatusText = styled('p')`
  text-transform: lowercase;
  margin-left: 20px;
  color: #c8c6c6;
`

const ListUsers = ({ users }) => {
  console.log(users)
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const deleteUser = async (user) => {
    try {
      await axiosClient.post(
        `/api/classrooms/${user.classroomId}/remove-user`,
        {
          userId: user.userId,
        }
      )
      handleClose()
    } catch (error) {}
  }

  if (users && !isEmpty(users))
    return (
      <CustomList>
        {users.map((u) => (
          <>
            <ListItem
              key={u.id}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Box sx={{ display: 'flex' }}>
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <p>{get(u, 'User.username')}</p>
                {u.status === 'PENDING' && (
                  <StatusText>({u.status})</StatusText>
                )}
              </Box>
              <IconButton onClick={handleClickOpen}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {'Remove user from classroom'}
              </DialogTitle>
              <DialogActions>
                <Button color="error" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => deleteUser(u)}
                  autoFocus
                >
                  Remove
                </Button>
              </DialogActions>
            </Dialog>
          </>
        ))}
      </CustomList>
    )
  else {
    return <p>Empty</p>
  }
}

export default ListUsers
