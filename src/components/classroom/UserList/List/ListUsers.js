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
import styled from '@emotion/styled'

const CustomList = styled(List)`
  max-height: 400px;
  overflow: auto;
`

const ListUsers = ({ users }) => {
  if (users && !isEmpty(users))
    return (
      <CustomList>
        {users.map((u) => (
          <ListItem>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText primary={get(u, 'User.username')} />
          </ListItem>
        ))}
      </CustomList>
    )
  else {
    return <p>Empty</p>
  }
}

export default ListUsers
