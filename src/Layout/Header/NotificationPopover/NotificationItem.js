import React from 'react'
import { useDispatch } from 'react-redux'
import { Box, Grid, IconButton, MenuItem, Typography } from '@mui/material'
import {
  MarkChatRead as MarkChatReadIcon,
  MarkChatUnread as MarkChatUnreadIcon,
} from '@mui/icons-material'
import { formatDistanceToNow } from 'date-fns'
import { NOTIFICATION_STATUS } from 'src/utils/constants'
import { updateNotifications } from 'src/redux/notificationSlice'
import { useHistory } from 'react-router-dom'

const NotificationItem = ({ notification }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleRead = (e) => {
    e.stopPropagation()
    if (notification.status === NOTIFICATION_STATUS.UNREAD) {
      dispatch(
        updateNotifications({
          id: notification.id,
          status: NOTIFICATION_STATUS.READ,
        })
      )
    } else {
      dispatch(
        updateNotifications({
          id: notification.id,
          status: NOTIFICATION_STATUS.UNREAD,
        })
      )
    }
  }

  const handleClickNotification = () => {
    if (notification.classroomId) {
      history.push(`/classrooms/${notification.classroomId}`)
    }
  }

  return (
    <MenuItem
      sx={{
        display: 'flex',
        px: '16px',
        py: '6px',
        justifyContent: 'space-between',
        backgroundColor:
          notification.status === NOTIFICATION_STATUS.UNREAD
            ? '#D6E5FA'
            : '#fff',
      }}
      onClick={handleClickNotification}
    >
      <Box sx={{ width: '250px', textOverflow: 'ellipsis' }}>
        <Typography
          variant="body1"
          style={{
            wordWrap: 'break-word',
            width: '250px',
            whiteSpace: 'normal',
          }}
        >
          {notification.content}
        </Typography>

        <Typography variant="caption">
          {formatDistanceToNow(new Date(notification.createdAt))}
        </Typography>
      </Box>
      <Box>
        <IconButton style={{ marginLeft: 'auto' }} onClick={handleRead}>
          {notification.status === NOTIFICATION_STATUS.UNREAD ? (
            <MarkChatReadIcon />
          ) : (
            <MarkChatUnreadIcon />
          )}
        </IconButton>
      </Box>
    </MenuItem>
  )
}

export default NotificationItem
