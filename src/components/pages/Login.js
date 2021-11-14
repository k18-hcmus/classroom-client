import React, { useState } from 'react'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import axiosClient from '../../axiosClient'
import { useHistory, Link } from 'react-router-dom'

const theme = createTheme()

export default function SignIn() {
  const history = useHistory()
  const [disabled, setDisabled] = useState(false)

  const isAuthenticated = !!localStorage.getItem('token')
  if (isAuthenticated) {
    history.push('/home')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setDisabled(true)
    const data = new FormData(event.currentTarget)

    const response = await axiosClient.post('/api/auth/login', {
      username: data.get('email'),
      password: data.get('password'),
    })

    if (response.data.success) {
      localStorage.setItem('token', response.data.token)

      axiosClient.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
        'token'
      )}`
      history.push('/home')
    }
    setDisabled(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={disabled}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Register new account"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
