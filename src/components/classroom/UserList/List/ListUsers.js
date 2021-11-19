import React from 'react'
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@mui/material'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

const ListUsers = ({ users }) => {
  if (users && !isEmpty(users))
    return (
      <List>
        {users.map((u) => (
          <ListItem>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText primary={get(u, 'User.username')} />
          </ListItem>
        ))}
      </List>
    )
  else {
    return <p>Empty</p>
  }
}

export default ListUsers
