import {
  AppBar,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  IconButton,
} from '@mui/material'
import React, { useState } from 'react'
import { useStyles } from './style'
import { Add, Apps, AccountCircle } from '@mui/icons-material'
import CreateClass from '../classroom/components/CreateClass/CreateClass'
import JoinClass from '../classroom/components/JoinClass/JoinClass'
import { useHistory } from 'react-router'

const Header = ({ children }) => {
  const classes = useStyles()
  const history = useHistory()
  const [anchorElClassroom, setAnchorElClassroom] = useState(null)
  const [anchorElProfile, setAnchorElProfile] = useState(null)

  const handleClick = (event) => {
    setAnchorElClassroom(event.currentTarget)
  }
  const handleCloseClassroomMenu = () => {
    setAnchorElClassroom(null)
  }
  const handleCloseProfileMenu = () => {
    setAnchorElProfile(null)
  }
  const handleMenuProfile = (event) => {
    setAnchorElProfile(event.currentTarget)
  }
  const [createClassDialog, setCreateClassDialog] = useState(false)
  const [joinClassDialog, setJoinClassDialog] = useState(false)
  const handleCreate = () => {
    handleCloseClassroomMenu()
    setCreateClassDialog(true)
  }
  const handleJoin = () => {
    handleCloseClassroomMenu()
    setJoinClassDialog(true)
  }
  const handleLogout = () => {
    localStorage.clear()
    history.push('/login')
  }
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.toolbar}>
          <div className={classes.headerWrapper}>
            {children}
            <Typography variant="h6" className={classes.title}>
              Classroom
            </Typography>
          </div>
          <div className={classes.header_wrapper_right}>
            <Add className={classes.icon} onClick={handleClick} />
            <Menu
              id="simple-menu"
              anchorEl={anchorElClassroom}
              keepMounted
              open={Boolean(anchorElClassroom)}
              onClose={handleCloseClassroomMenu}
            >
              <MenuItem onClick={handleJoin}>Join class</MenuItem>
              <MenuItem onClick={handleCreate}>Create class</MenuItem>
            </Menu>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuProfile}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElProfile}
                keepMounted
                open={Boolean(anchorElProfile)}
                onClose={handleCloseProfileMenu}
              >
                <MenuItem onClick={handleCloseProfileMenu}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Log out</MenuItem>
              </Menu>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <CreateClass
        createClassDialog={createClassDialog}
        setCreateClassDialog={setCreateClassDialog}
      />
      <JoinClass
        joinClassDialog={joinClassDialog}
        setJoinClassDialog={setJoinClassDialog}
      />
    </div>
  )
}

export default Header
