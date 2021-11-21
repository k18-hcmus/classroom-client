import React from 'react'
import { List, ListItem, ListItemAvatar, Avatar, Box } from '@mui/material'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import styled from '@emotion/styled'

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
  if (users && !isEmpty(users))
    return (
      <CustomList>
        {users.map((u) => (
          <ListItem key={u.id}>
            <Box sx={{ display: 'flex' }}>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <p>{get(u, 'User.username')}</p>
            </Box>
            {u.status === 'PENDING' && <StatusText>({u.status})</StatusText>}
          </ListItem>
        ))}
      </CustomList>
    )
  else {
    return <p>Empty</p>
  }
}

export default ListUsers
